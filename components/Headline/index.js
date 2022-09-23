import style from "./Headline.module.scss";

export default function Headline({ title, size, hideMarginTop }) {
  return (
    <span
      className={
        `${style.headline}` +
        `${size === "1" ? ` ${style.headline__lvl_1}` : ""}` +
        `${size === "2" ? ` ${style.headline__lvl_2}` : ""}` +
        `${size === "3" ? ` ${style.headline__lvl_3}` : ""}` +
        `${size === "4" ? ` ${style.headline__lvl_4}` : ""}` +
        `${hideMarginTop ? ` ${style.headline__no_margin_top}` : ""}`
      }
    >
      {title}
    </span>
  );
}
