import React, {
  useEffect,
  Fragment,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { Combobox } from "@headlessui/react";
import ComboboxVirtualization from "./VirtualList";
import lower from "utils/lower";
import isStr from "utils/isString";
import separateStringByComma from "utils/separateStringByComma";
import useChangeDropdownPosition from "hooks/useChangeDropdownPosition";
import "./components.css";

const ComboBoxAutocomplete = ({
  isTagsInside = false,
  tagsCountLimit,
  virtualized,
  isSingleSelect,
  getLabel,
  getValue,
  transformResponse,
  apiCallInfo,
  inputPlaceholder,
  creatable,
  options,
  components,
  onSelect,
  getData,
  onApply,
  hideChips,
  placeholder,
  isLoading: loading,
  type,
  onCreateNewOption,
  ...rest
}) => {
  const { value } = rest;
  const [currentIndex, setCurrentIndex] = useState();
  const [isShowTags, setIsShowTags] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [query, setQuery] = useState("");
  const addListItemRef = useRef();
  const [data, setData] = useState(options || []);
  /*eslint-disable  no-unused-vars*/
  const [isLoading] = useState(loading || false);
  const timeout = useRef();
  const inputContainerRef = useRef();
  const { isReverse } = useChangeDropdownPosition(inputContainerRef);
  const dropdownOpenButtonRef = useRef();
  const newOptionRef = useRef();

  useEffect(() => {
    if (newOptionRef.current) onCreateNewOption(newOptionRef.current);
    /*eslint-disable react-hooks/exhaustive-deps */
  }, [newOptionRef.current]);

  useEffect(() => {
    if (value?.length) setSelectedItems(value);
  }, [value]);

  useEffect(() => setData(options), [options]);

  const valueHandler = (e) => {
    clearTimeout(timeout.current);
    const typedValue = e.target.value;
    if (typedValue.length) setCurrentIndex(undefined);
    setQuery(typedValue);
  };
  const transformedLabel = useCallback(
    (ele) => (isStr(ele) ? ele : getLabel(ele)),
    [getLabel]
  );

  const transformedValue = useCallback(
    (option) => {
      return isStr(option)
        ? option?.toLowerCase()
        : getValue(option)?.toLowerCase();
    },
    [getValue]
  );

  const filteredData = useMemo(
    () =>
      apiCallInfo || getData || query === ""
        ? data
        : data.filter((option) =>
            lower(transformedLabel(option)).includes(lower(query))
          ),
    /* eslint-disable  react-hooks/exhaustive-deps*/
    [query, data, apiCallInfo, transformedLabel]
  );

  const isObjectValue = useMemo(() => type === "object", [type]);
  const isSelected = useCallback(
    (currentItem) => {
      return !isSingleSelect
        ? selectedItems.some(
            (item) => transformedValue(item) === transformedValue(currentItem)
          )
        : isObjectValue
        ? getValue(selectedItems) === currentItem
        : selectedItems === currentItem;
    },
    [selectedItems, transformedValue]
  );

  const onSelection = (items) => {
    const isItemsArray = Array.isArray(items);
    if (isItemsArray) {
      const itemsArray = items.map((item) => transformedValue(item));
      const separatedItemsArray = [];

      const trueBlockFn = (value) => {
        value.length && separatedItemsArray.push(value.replace(/\.$/, ""));
      };
      const falseBlockFn = (el) => separatedItemsArray.push(el);

      itemsArray.forEach((el) => {
        separateStringByComma(el, trueBlockFn, falseBlockFn);
      });
      const uniqueItemsArray = [...new Set(separatedItemsArray)];

      const caseSensitiveArray = uniqueItemsArray.filter(
        (el, idx, array) =>
          !array.some(
            (item, index) =>
              item.toLowerCase() === el.toLowerCase() && idx > index
          )
      );
      setSelectedItems(caseSensitiveArray);
    } else {
      setSelectedItems(isObjectValue ? items : transformedValue(items));
    }
  };

  const removeItem = (item) => {
    const index = selectedItems.indexOf(item);
    const removableItems = [...selectedItems];
    removableItems.splice(index, 1);
    setSelectedItems(removableItems);
    onApply(removableItems);
  };

  const captureOnKeyDown = (e, activeOption, open) => {
    if (
      e.key === "Enter" &&
      filteredData.length !== 0 &&
      open &&
      isSelected(activeOption)
    ) {
      setSelectedItems(
        selectedItems.filter(
          (item) => transformedValue(activeOption) !== transformedValue(item)
        )
      );
      e.stopPropagation();
    } else if (e.key === "Enter" && !query && currentIndex !== undefined) {
      setSelectedItems((prev) =>
        prev.filter((el, idx) => idx !== currentIndex)
      );
    } else if (e.key === "Backspace" && selectedItems.length && !query.length) {
      setSelectedItems((prev) => {
        const copy = [...prev];
        copy.pop();
        return copy;
      });
    } else if (e.key === "ArrowLeft" && selectedItems.length) {
      if (open) dropdownOpenButtonRef?.current?.click();
      if (isShowTags) {
        setCurrentIndex((prev) => (prev ? prev - 1 : selectedItems.length - 1));
      } else {
        setCurrentIndex((prev) =>
          prev
            ? prev > selectedItems.length - tagsCountLimit
              ? prev - 1
              : selectedItems.length - 1
            : selectedItems.length - 1
        );
      }
    } else if (e.key === "ArrowRight" && selectedItems.length) {
      if (open) dropdownOpenButtonRef?.current?.click();
      if (isShowTags) {
        setCurrentIndex((prev) =>
          prev !== undefined && prev < selectedItems.length - 1 ? prev + 1 : 0
        );
      } else {
        setCurrentIndex((prev) =>
          prev !== undefined && prev < selectedItems.length - 1
            ? prev + 1
            : selectedItems.length - tagsCountLimit > 0
            ? selectedItems.length - tagsCountLimit
            : 0
        );
      }
    } else if (e.key === "Escape") {
      setIsShowTags(false);
    }
  };
  const createOptionUtility = useCallback(
    (prevState) => {
      let arr = [...prevState];
      query.replace(/\s+|\?|\$/, "");
      const trueBlockFn = (value) => {
        if (!arr.includes(value) && value.length) {
          arr.push(creatable(value));
          // onCreateNewOption(creatable(value));
          newOptionRef.current = creatable(value);
        }
      };
      const falseBlockFn = (str) => {
        if (!arr.includes(query)) {
          arr.push(creatable(query));
          newOptionRef.current = creatable(query.trim());
        }
      };
      separateStringByComma(query, trueBlockFn, falseBlockFn);
      return arr;
    },
    [query]
  );

  const handleCreateNewOption = () => {
    setQuery("");
    if (isSingleSelect) {
      onCreateNewOption(query);
      setSelectedItems(query);
    } else {
      setSelectedItems((prev) => createOptionUtility(prev));
    }
  };
  const hasInputControl = useMemo(
    () => (components?.hasOwnProperty("InputControl") ? true : false),
    [components]
  );
  const additionalProps = {};
  if (!hasInputControl) {
    additionalProps.className =
      "rounded py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0";
  }
  const isMountedRef = useRef(false);
  useEffect(() => {
    if (isMountedRef.current) {
      if (onApply && isSingleSelect) {
        onApply(selectedItems);
      }
    } else {
      isMountedRef.current = true;
    }
  }, [selectedItems]);

  const addNewItemHandler = (e) => {
    if (filteredData.length === 0 && query.length >= 2 && e.key === "Enter") {
      //eslint-disable no-unused-expressions
      addListItemRef?.current?.click();
    }
  };

  const onApplyClick = () => {
    onApply(selectedItems);
    dropdownOpenButtonRef?.current?.click();
  };
  const onClear = () => {
    if (onApply) onApply([]);
    else onSelect([]);
    setSelectedItems([]);
    dropdownOpenButtonRef?.current?.click();
  };
  const comboboxBtnHandler = () => {
    addListItemRef?.current?.click();
    setQuery("");
  };
  const onClickControl = (open) => {
    if (!open) dropdownOpenButtonRef?.current?.click();
    setCurrentIndex(undefined);
  };
  const AddNewOption = useMemo(
    () =>
      !isLoading &&
      filteredData?.length === 0 &&
      query.length >= 2 && (
        <div
          className="relative cursor-default select-none py-2 px-4 text-gray-700"
          ref={addListItemRef}
          onClick={handleCreateNewOption}
        >
          Add {query}
        </div>
      ),
    [isLoading, filteredData, query, handleCreateNewOption]
  );
  const EnterMinTwoCharacters = useMemo(
    () =>
      filteredData?.length === 0 &&
      query.length < 2 &&
      !isLoading &&
      apiCallInfo && <span>Please enter at least 2 characters</span>,
    [filteredData, query, isLoading, apiCallInfo]
  );
  return (
    <div className="combo-wrapper" style={{ width: "100%" }}>
      <div>
        <Combobox
          value={selectedItems}
          onChange={onSelection}
          multiple={!isSingleSelect}
        >
          {({ open, activeIndex, activeOption }) => {
            return (
              <>
                <div
                  className="relative d-flex justify-content-start"
                  style={{ marginBottom: "8px" }}
                >
                  <div
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      padding: "8px",
                      display: "flex",
                      flexWrap: "wrap",
                      // gap: "6px",
                    }}
                    ref={inputContainerRef}
                    className="w-100 relative cursor-default  bg-white text-left sm:text-sm"
                  >
                    {isTagsInside &&
                      !hideChips &&
                      !!selectedItems.length &&
                      !isSingleSelect && (
                        <SelectedChips
                          {...{
                            selectedItems,
                            transformedLabel,
                            removeItem,
                            currentIndex,
                            tagsCountLimit,
                            setIsShowTags,
                            isShowTags,
                          }}
                        />
                      )}
                    <ComboboxInput
                      data-testid="comboinput"
                      additionalProps={additionalProps}
                      valueHandler={valueHandler}
                      addNewItemHandler={addNewItemHandler}
                      onClick={() => onClickControl(open)}
                      onKeyDownCapture={(e) =>
                        captureOnKeyDown(e, activeOption, open)
                      }
                      placeholder={placeholder}
                      hasInputControl={hasInputControl}
                      components={components}
                      {...rest}
                    />
                    <ComboboxBtn
                      ref={dropdownOpenButtonRef}
                      isLoading={isLoading}
                      filteredData={filteredData}
                      query={query}
                      onClick={comboboxBtnHandler}
                    />
                  </div>
                  {
                    <Combobox.Options
                      style={{
                        maxHeight: "320px",
                        width: "320px",
                        maxWidth: "100%",
                        top: "106%",
                      }}
                      className={`combobox-list absolute ${
                        isReverse ? "reverse-position" : ""
                      } px-0 radius:8 flex  flex-column max-h-60 w-100 overflow-auto bg-white py-1 text-base shadow-lg focus:outline-none sm:text-sm`}
                    >
                      {EnterMinTwoCharacters}
                      {isLoading && <Loader />}
                      {AddNewOption}
                      {!isLoading &&
                        (virtualized ? (
                          <ComboboxVirtualization
                            items={filteredData}
                            getValue={getValue}
                            getLabel={getLabel}
                            isSelected={isSelected}
                            isSingleSelect={isSingleSelect}
                          />
                        ) : (
                          filteredData?.map((item, idx) => (
                            <Combobox.Option
                              key={idx}
                              className={({ active }) =>
                                `relative cursor-pointer select-none py-2 pl-5 pr-4 ${
                                  active
                                    ? "bg-light text-dark"
                                    : "text-gray-900"
                                }`
                              }
                              value={transformedValue(item)}
                            >
                              {transformedLabel(item)}
                            </Combobox.Option>
                          ))
                        ))}
                      {!isSingleSelect && (
                        <ApplyClearBtn
                          onApplyClick={onApplyClick}
                          onClear={onClear}
                        />
                      )}
                    </Combobox.Options>
                  }
                </div>
                {!isTagsInside &&
                  !hideChips &&
                  !!selectedItems.length &&
                  !isSingleSelect && (
                    <SelectedChips
                      {...{
                        selectedItems,
                        transformedLabel,
                        removeItem,
                        currentIndex,
                        tagsCountLimit,
                        setIsShowTags,
                        isShowTags,
                      }}
                    />
                  )}
              </>
            );
          }}
        </Combobox>
      </div>
    </div>
  );
};
export default ComboBoxAutocomplete;

const SelectedChips = ({
  selectedItems,
  transformedLabel,
  removeItem,
  currentIndex,
  tagsCountLimit,
  setIsShowTags,
  isShowTags,
}) => (
  <>
    {/* <ul
      aria-labelledby="selected-list"
      className="flex flex-wrap ml-0 pl-0 mt-2"
    > */}
    {selectedItems.map((el, idx) => (
      <Fragment key={idx}>
        <li
          className={`chip ${
            idx === currentIndex ? "highlight" : ""
          } mr-1 mb-1`}
          data-hidden={
            !isShowTags && selectedItems.length - idx > tagsCountLimit
              ? "hide"
              : ""
          }
        >
          {transformedLabel(el)}
          <span className="ml-1 hover:light" onClick={() => removeItem(el)}>
            &times;
          </span>
        </li>
      </Fragment>
    ))}
    {selectedItems.length > tagsCountLimit && (
      <button
        style={{
          border: "1px solid #555",
          padding: "6px 10px",
          borderRadius: "6px",
          backgroundColor: "#e5e5e5",
        }}
        onClick={() => setIsShowTags((prev) => !prev)}
      >
        Show {!isShowTags ? "more" : "less"}...
      </button>
    )}
    {/* </ul> */}
  </>
);

const ComboboxInput = ({
  valueHandler,
  addNewItemHandler,
  additionalProps,
  inputPlaceholder,
  onKeyDownCapture,
  hasInputControl,
  placeholder,
  components,
  ...rest
}) => (
  <Combobox.Input
    as={Fragment}
    autoComplete="off"
    onChange={valueHandler}
    onKeyDownCapture={onKeyDownCapture}
    onKeyDown={addNewItemHandler}
    placeholder={inputPlaceholder}
    {...additionalProps}
    {...rest}
  >
    {hasInputControl ? (
      <components.InputControl
        filled={true}
        label={placeholder || `Select ${placeholder} `}
        placeholder={placeholder || `Select ${placeholder} `}
      />
    ) : (
      <input
        style={{
          border: "none",
          outline: "none",
          flexGrow: "1",
        }}
        placeholder={placeholder}
      />
    )}
  </Combobox.Input>
);

const ComboboxBtn = React.forwardRef(
  ({ isLoading, filteredData, query, onClick }, ref) => (
    <Combobox.Button
      ref={ref}
      className="absolute combobox-arrow inset-y-0 right-0 flex items-center pr-2 bg-transparent"
    >
      {!isLoading && filteredData?.length === 0 && query.length >= 2 ? (
        <span style={{ fontSize: "25px" }} onClick={onClick}>
          &#43;
        </span>
      ) : (
        <i
          className="fa-solid fa-caret-down fs-17 ml-2"
          style={{ color: "#71b783" }}
        ></i>
      )}
    </Combobox.Button>
  )
);

const ApplyClearBtn = ({ onClear, onApplyClick }) => (
  <div className="d-flex align-items-center actions">
    <div className="ms-auto">
      <button className="btn btn-light me-2 border-0" onClick={onClear}>
        Clear
      </button>
      <button className="btn btn-primary border-0" onClick={onApplyClick}>
        Apply
      </button>
    </div>
  </div>
);

const Loader = () => (
  <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
    <span>Loading...</span>
  </div>
);
