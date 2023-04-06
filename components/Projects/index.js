/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import PostInfoBar from "@/components/PostInfoBar";
import style from "./Projects.module.scss";

export default function Projects({ array, tag }) {
  const lineTypes = {
    0: ["xs", "xs", "xs"],
    1: ["s", "s"],
    2: ["m", "m"],
    3: ["xs", "l"],
    4: ["l", "xs"],
    5: ["xl"],
  };
  const orderLines = tag !== null ? (tag === "dev" ? [4, 1] : [2, 2]) : [2, 4, 1, 5];
  const filteredArray = array.sort((a, b) => new Date(b.create) - new Date(a.create));
  const sortedArray = [];

  orderLines.forEach((line) => {
    lineTypes[line].forEach((type) => {
      const result = filteredArray.find((item) => {
        if (sortedArray.some((i) => i.id === item.id)) return false;
        if (item.cover !== null && (type === "m" || type === "l" || type === "xl")) return true;
        if (item.cover === null && (type === "xs" || type === "s")) return true;
      });
      if (result === undefined) return;
      sortedArray.push({
        ...result,
        className: `${style.project} ${style[`project__${type}`]}`,
      });
    });
  });

  return (
    <ul className={style.projects}>
      {sortedArray.map((project) => (
        <li key={project.id} className={project.className}>
          <a className={style.project__link} href={project.url} target="_blank" rel="noreferrer">
            {project.cover && (
              <div className={style.project__cover_wrapper}>
                <img className={style.project__cover} src={project.cover} alt={project.title} />
              </div>
            )}
            {!project.cover && <span className={style.project__headline}>{project.title}</span>}
            {project.description && !project.cover && <span className={style.project__description}>{project.description}</span>}
            <PostInfoBar data={project} />
          </a>
        </li>
      ))}
    </ul>
  );
}
