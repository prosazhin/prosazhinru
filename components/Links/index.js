import NextLink from "next/link";
import style from "./Links.module.scss";

export default function Links({ array, customClass }) {
  return (
    <div className={`${style.links}${customClass ? ` ${customClass}` : ""}`}>
      {array
        .sort((a, b) => new Date(b.create) - new Date(a.create))
        .map((item) => (
          <NextLink href={item.url} target="_blank" className={style.link} key={item.id}>
            <span className={style.link__title}>{item.title}</span>
            <span className={style.link__description}>{item.description}</span>
          </NextLink>
        ))}
    </div>
  );
}
