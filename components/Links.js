import NextLink from "next/link";
import Badge from "@/components/Badge";

export default function Links({ array, customClass }) {
  return (
    <div className={`grid gap-x-[8px] gap-y-[16px] xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 ${customClass ? ` ${customClass}` : ""}`}>
      {array
        .sort((a, b) => new Date(b.create) - new Date(a.create))
        .map((item) => (
          <NextLink href={item.url} target="_blank" className="group !no-underline transition" key={item.id}>
            <div className="flex w-full flex-col rounded-md border border-secondary-lighter px-[16px] py-[12px] !no-underline transition group-hover:border-primary-main">
              <span className="w-full text-tm2 text-base-main !no-underline transition group-hover:text-primary-main">{item.title}</span>
              <span className="mt-[6px] w-full text-t4 text-base-light !no-underline transition group-hover:text-base-main">{item.description}</span>
              {item.tags.length > 0 && (
                <ul className="mt-[8px] flex w-full flex-row flex-wrap">
                  {item.tags.map((tag) => (
                    <li className="mr-[4px] mt-[4px]" key={tag.url}>
                      <Badge title={tag.title} size="xs" color="secondary" theme="light" />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </NextLink>
        ))}
    </div>
  );
}
