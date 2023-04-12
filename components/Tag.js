import React from "react";

const sizes = {
  xs: "px-[8px] py-[4px]",
  s: "px-[12px] py-[8px]",
};

const themes = {
  light: "text-base-main border border-primary-light bg-primary-light hover:bg-primary-lighter hover:border-primary-lighter",
  border: "text-base-main border border-secondary-light hover:border-primary-main",
};

const selected_styles = "text-white border !border-primary-main !bg-primary-main hover:!bg-primary-darker hover:!border-primary-darker";

export default function Tag({ title, size, theme, selected, clickHandler, place, children }) {
  return (
    <button
      className={`flex flex-row items-center justify-center space-x-[6px] rounded-full text-tm4 transition ${sizes[size]} ${themes[theme]} ${selected && `${selected_styles}`}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        clickHandler();
      }}
    >
      {children && place === "left" && <>{children}</>}
      <span>{title}</span>
      {children && place === "right" && <>{children}</>}
    </button>
  );
}
