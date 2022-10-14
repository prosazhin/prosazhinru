import React from 'react';
import Image from 'next/image';
import { Container } from '../';
import style from './Content.module.scss';

export default function Content({ data }) {
  function getType(item, count, index) {
    switch (item.type) {
      case 'image':
        return (
          <Container>
            <div
              className={
                `${style.content__image__wrapper}` +
                `${count - 1 > index && data[index + 1].type === 'image' ? ` ${style.content__image__wrapper_no_padding}` : ''}` +
                `${count - 1 === index ? ` ${style.content__last_type}` : ''}`
              }
            >
              <Image className={style.content__image} src={item.url} alt={item.description} width={item.width} height={item.height} layout="intrinsic" priority="true" unoptimized="true" />
              {item.description && <span className={style.content__image__description}>{item.description}</span>}
            </div>
          </Container>
        );

      case 'heading':
        return (
          <Container small>
            <span className={`${style.content__heading}` + `${count - 1 === index ? ` ${style.content__last_type}` : ''}`}>{item.value}</span>
          </Container>
        );

      case 'paragraph':
        return (
          <Container small>
            <p
              className={
                `${style.content__paragraph}` +
                `${count - 1 > index && data[index + 1].type === 'unordered-list' ? ` ${style.content__paragraph_above}` : ''}` +
                `${count - 1 > index && data[index + 1].type === 'ordered-list' ? ` ${style.content__paragraph_above}` : ''}` +
                `${count - 1 > index && data[index + 1].type === 'paragraph' ? ` ${style.content__paragraph_above}` : ''}` +
                `${count - 1 === index ? ` ${style.content__last_type}` : ''}`
              }
            >
              {item.value}
            </p>
          </Container>
        );

      case 'code':
        return (
          <Container small>
            <p className={`${style.content__code}` + `${count - 1 === index ? ` ${style.content__last_type}` : ''}`}>{item.value}</p>
          </Container>
        );

      case 'blockquote':
        return (
          <Container small>
            <ul className={`${style.content__blockquote}` + `${count - 1 === index ? ` ${style.content__last_type}` : ''}`}>
              {item.value.map((valueItem, valueIndex) => (
                <li key={`${item.type}__${valueIndex}`} className={style.content__blockquote__item}>
                  {valueItem}
                </li>
              ))}
            </ul>
          </Container>
        );

      case 'ordered-list':
        return (
          <Container small>
            <ol
              type="1"
              className={
                `${style.content__list} ` +
                `${style.content__list_ordered}` +
                `${count - 1 > index && data[index + 1].type === 'paragraph' ? ` ${style.content__list_above_paragraph}` : ''}` +
                `${count - 1 === index ? ` ${style.content__last_type}` : ''}`
              }
            >
              {item.value.map((valueItem, valueIndex) => (
                <li key={`${item.type}__${valueIndex}`} className={style.content__list__item}>
                  {valueItem}
                </li>
              ))}
            </ol>
          </Container>
        );

      case 'unordered-list':
        return (
          <Container small>
            <ul
              className={
                `${style.content__list} ` +
                `${style.content__list_unordered}` +
                `${count - 1 > index && data[index + 1].type === 'paragraph' ? ` ${style.content__list_above_paragraph}` : ''}` +
                `${count - 1 === index ? ` ${style.content__last_type}` : ''}`
              }
            >
              {item.value.map((valueItem, valueIndex) => (
                <li key={`${item.type}__${valueIndex}`} className={style.content__list__item}>
                  {valueItem}
                </li>
              ))}
            </ul>
          </Container>
        );
    }
  }

  return (
    <div className={style.content}>
      {data.map((item, index) => (
        <React.Fragment key={`${item.type}__${index}`}>{getType(item, data.length, index)}</React.Fragment>
      ))}
    </div>
  );
}
