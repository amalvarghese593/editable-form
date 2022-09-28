import React, { useRef } from "react";
import { Combobox } from "@headlessui/react";
import { useVirtualizer } from "@tanstack/react-virtual";
import isStr from "utils/isString";
// import { CheckIcon } from "@heroicons/react/solid";

const ComboboxVirtualization = ({
  isSingleSelect,
  getLabel,
  items,
  getValue,
  isSelected,
}) => {
  const parentRef = useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
  });

  return (
    <div ref={parentRef} className="virutalized-list">
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}>
        {rowVirtualizer.getVirtualItems().map((virtualRow) => (
          <Combobox.Option
            key={virtualRow.index}
            ref={virtualRow.measureElement}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              // height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`,
            }}
            className={({ active }) =>
              `combobox-option py-2 pl-2 pr-4 ${
                active ||
                isSelected(
                  isStr(items?.[virtualRow.index])
                    ? items?.[virtualRow.index]
                    : getValue(items?.[virtualRow.index])
                )
                  ? "active"
                  : ""
              }`
            }
            value={items?.[virtualRow.index]}>
            {({ selected, active }) => (
              <Option
                virtualRow={virtualRow}
                items={items}
                active={active}
                getValue={getValue}
                getLabel={getLabel}
                isSelected={isSelected}
                selected={selected}
                isSingleSelect={isSingleSelect}
              />
            )}
          </Combobox.Option>
        ))}
      </div>
    </div>
  );
};
export default ComboboxVirtualization;
const Option = ({
  virtualRow,
  items,
  getValue,
  isSelected,
  getLabel,
  isSingleSelect,
  selected,
}) => {
  return (
    <div style={{ height: items?.[virtualRow.index] }}>
      <span className={`block text-start combobox-option-state`}>
        {!isSingleSelect ? (
          isSelected(
            isStr(items?.[virtualRow.index])
              ? items?.[virtualRow.index]
              : getValue(items?.[virtualRow.index]) || selected
          ) ? (
            <i className="fa-regular fa-square-check text-end me-2  "></i>
          ) : (
            <i className="fa-regular fa-square me-2"></i>
          )
        ) : null}
        {isStr(items?.[virtualRow.index])
          ? items?.[virtualRow.index]
          : getLabel(items?.[virtualRow.index])}
      </span>
    </div>
  );
};
