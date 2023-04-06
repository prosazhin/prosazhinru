import React from "react";
import Link from "next/link";
import PostInfoBar from "@/components/PostInfoBar";
import style from "./Posts.module.scss";

export default function Posts({ array }) {
  return (
    <ul className={style.posts}>
      {array
        .sort((a, b) => new Date(b.create) - new Date(a.create))
        .map((post) => (
          <li className={style.post} key={post.id}>
            <Link href={`/post/${post.slug}`} className={style.post__link}>
              <span className={style.post__headline}>{post.title}</span>
              <span className={style.post__description}>{post.description}</span>
              <PostInfoBar data={post} />
            </Link>
          </li>
        ))}
    </ul>
  );
}
