import React from "react";

export default function Tabs({ data, keyName, display, selected, setSelected, customClass }) {
  return (
    <div
      className={`relative w-full after:absolute after:bottom-0 after:left-0 after:right-0 after:z-[1] after:h-[2px] after:w-full after:rounded-full after:bg-secondary-lighter ${
        customClass ? `${customClass}` : ""
      }`}
    >
      <ul className="flex w-auto flex-row flex-nowrap items-center justify-start space-x-[16px] overflow-x-auto pb-[2px]">
        {data.map((item) => (
          <li
            key={item[keyName]}
            className={`relative mb-[10px] inline-flex cursor-pointer flex-nowrap whitespace-nowrap rounded-md bg-transparent px-[8px] py-[2px] text-tm3 text-base-main !no-underline transition hover:bg-secondary-lighter hover:!text-base-main ${
              selected === item[keyName]
                ? "!text-primary-main after:absolute after:bottom-[-12px] after:left-0 after:right-0 after:z-[2] after:h-[2px] after:w-full after:rounded-full after:bg-primary-main"
                : ""
            }`}
            onClick={() => setSelected(item)}
          >
            {item[display]}
          </li>
        ))}
      </ul>
    </div>
  );
}
