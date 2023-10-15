'use client';

type Props = {
  value: string;
  type?: string;
  id?: string;
  name?: string;
  place?: 'left' | 'right';
  placeholder?: string;
  onChange: (value: string) => void;
  children?: React.ReactNode;
};

const Input = ({ place, onChange, children, ...rest }: Props) => {
  return (
    <label className="relative flex max-h-[48px] min-h-[48px] w-full items-center space-x-[8px] rounded-md border border-secondary-light bg-white px-[24px] transition focus-within:border-primary-main focus-within:ring-[3px] focus-within:ring-outline-primary focus-within:ring-offset-0 hover:border-primary-main">
      {children && place === 'left' && <>{children}</>}
      <input
        className="w-full !appearance-none py-[11px] px-0 text-t3 text-base-main !border-0 !outline-none !ring-0 transition placeholder:text-base-light"
        {...rest}
        onChange={({ target }) => onChange(target.value)}
      />
      {children && place === 'right' && <>{children}</>}
    </label>
  );
};

export default Input;
