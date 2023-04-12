import React from "react";

export default function Input({ place, children, ...rest }) {
  return (
    <label className="relative flex max-h-[48px] min-h-[48px] w-full items-center space-x-[8px] rounded-md border border-secondary-light bg-white px-[24px] transition focus-within:border-primary-main focus-within:ring-1 focus-within:ring-outline-primary focus-within:ring-offset-0 hover:border-primary-main">
      {children && place === "left" && <>{children}</>}
      <input className="w-full !appearance-none py-[11px] text-t3 text-base-main transition placeholder:text-base-light" {...rest} />
      {children && place === "right" && <>{children}</>}
    </label>
  );
}
