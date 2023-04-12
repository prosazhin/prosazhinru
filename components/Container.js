import React from "react";

export default function Container({ children, small }) {
  return <div className={`relative m-auto block w-full sm:px-[16px] ${small ? "desktop:w-[736px]" : "xl:w-[1152px] lg:w-[80%] md:w-[736px]"}`}>{children}</div>;
}
