import { ClickableTag, StaticActiveTag, StaticTag } from '../';
import style from './Tags.module.scss';

export function ClickableTagsList({ array, tagLinkTo, customClass }) {
  return (
    <ul className={`${style.tags}${customClass ? ` ${customClass}` : ''}`}>
      {array.map((item) => (
        <li className={style.tags__item} key={item.id}>
          <ClickableTag title={item.title} url={item.url} tagLinkTo={tagLinkTo} />
        </li>
      ))}
    </ul>
  );
}

export function StaticActiveTagsList({ array, customClass }) {
  return (
    <ul className={`${style.tags}${customClass ? ` ${customClass}` : ''}`}>
      {array.map((item) => (
        <li className={style.tags__item} key={item.id}>
          <StaticActiveTag title={item.title} url={item.url} />
        </li>
      ))}
    </ul>
  );
}

export function StaticTagsList({ array, customClass }) {
  return (
    <ul className={`${style.tags}${customClass ? ` ${customClass}` : ''}`}>
      {array.map((item, index) => (
        <li className={style.tags__item} key={`tag_${index}`}>
          <StaticTag title={item} />
        </li>
      ))}
    </ul>
  );
}
