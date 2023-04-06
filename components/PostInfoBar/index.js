import React from "react";
import { StaticActiveTagsList } from "@/components/Tags";
import SocialLinks from "@/components/SocialLinks";
import style from "./PostInfoBar.module.scss";

export default function PostInfoBar({ data, customClass }) {
  const parseProjectUrl = (value) => {
    const url = new URL(value);
    return url.hostname;
  };

  return (
    <div className={`${style.post_info_bar}${customClass ? ` ${customClass}` : ""}`}>
      <div className={style.post_info_bar__inline_wrapper}>
        <StaticActiveTagsList array={data.tags} />
        <SocialLinks
          data={[
            data.gitUrl ? { title: "GitHub", url: data.gitUrl } : null,
            data.figmaUrl ? { title: "Figma", url: data.figmaUrl } : null,
            data.figmaCommunityUrl ? { title: "Figma Community", url: data.figmaCommunityUrl } : null,
            data.behanceUrl ? { title: "Behance", url: data.behanceUrl } : null,
            data.projectUrl ? { title: parseProjectUrl(data.projectUrl), url: data.projectUrl } : null,
            data.mediumUrl ? { title: "Medium", url: data.mediumUrl } : null,
          ]}
          customClass={style.post_info_bar__social_link}
        />
      </div>
      <span className={style.post_info_bar__date}>{data.createString}</span>
    </div>
  );
}
