import clsx from 'clsx';

const sizes = {
  xs: 'px-[8px] py-[4px]',
  s: 'px-[12px] py-[8px]',
};

const themes = {
  light:
    'text-base-main hover:text-base-main border border-primary-light bg-primary-light hover:bg-primary-lighter hover:border-primary-lighter',
  border:
    'text-base-main hover:text-base-main border border-secondary-light hover:border-primary-main',
};

const selected_styles =
  '!text-white border !border-primary-main !bg-primary-main hover:!bg-primary-darker hover:!border-primary-darker';

type Props = {
  tag: React.ElementType;
  title: string;
  size: 'xs' | 's';
  theme: 'light' | 'border';
  selected?: boolean;
  place?: 'left' | 'right';
  href?: string;
  target?: string;
  type?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  children?: React.ReactNode;
};

const Tag = ({
  tag: TagName,
  title,
  size,
  theme,
  selected = false,
  place,
  children,
  ...props
}: Props) => {
  return (
    <TagName
      className={clsx(
        'flex flex-row items-center justify-center !no-underline space-x-[6px] rounded-full text-tm4 transition',
        sizes[size],
        themes[theme],
        selected ? selected_styles : ''
      )}
      {...props}
    >
      {children && place === 'left' && <>{children}</>}
      <span>{title}</span>
      {children && place === 'right' && <>{children}</>}
    </TagName>
  );
};

export default Tag;
