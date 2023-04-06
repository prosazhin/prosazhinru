import { ClickableTag, StaticActiveTag, StaticTag } from "@/components/Tag";
import { useRouter } from "next/router";
import style from "./Tags.module.scss";

export function ClickableTagsList({ array, pageLink, activeTag, customClass }) {
  return (
    <ul className={`${style.tags}${customClass ? ` ${customClass}` : ""}`}>
      {array.map((item) => (
        <li className={style.tags__item} key={item.id}>
          <ClickableTag title={item.title} active={activeTag !== undefined ? activeTag.url === item.url : false} pageLink={pageLink} url={item.url} />
        </li>
      ))}
    </ul>
  );
}

export function StaticActiveTagsList({ array, customClass }) {
  const router = useRouter();
  return (
    <ul className={`${style.tags}${customClass ? ` ${customClass}` : ""}`}>
      {array.map((item) => (
        <li className={style.tags__item} key={item.id}>
          <StaticActiveTag title={item.title} active={router.query.tag === item.url} />
        </li>
      ))}
    </ul>
  );
}

export function StaticTagsList({ array, customClass }) {
  return (
    <ul className={`${style.tags}${customClass ? ` ${customClass}` : ""}`}>
      {array.map((item, index) => (
        <li className={style.tags__item} key={`tag_${index}`}>
          <StaticTag title={item} />
        </li>
      ))}
    </ul>
  );
}
