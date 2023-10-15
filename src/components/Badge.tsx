import clsx from 'clsx';

const sizes = {
  xs: 'px-[8px] py-[4px]',
  s: 'px-[12px] py-[8px]',
};

const styles = {
  secondary_light: 'text-base-main border border-secondary-lighter bg-secondary-lighter',
  secondary_border: 'text-base-main border border-base-main',
};

type Props = {
  title: string;
  size: 'xs' | 's';
  theme: 'light' | 'border';
  color: 'secondary';
  place?: 'left' | 'right';
  children?: React.ReactNode;
};

const Badge = ({ title, size, color, theme, place, children }: Props) => {
  return (
    <span
      className={clsx(
        'flex flex-row items-center justify-center space-x-[6px] rounded-full text-tm4',
        sizes[size],
        styles[`${color}_${theme}`]
      )}
    >
      {children && place === 'left' && <>{children}</>}
      <span>{title}</span>
      {children && place === 'right' && <>{children}</>}
    </span>
  );
};

export default Badge;
