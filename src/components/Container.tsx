import clsx from 'clsx';

type Props = {
  small?: boolean;
  children: React.ReactNode;
};

const Container = ({ small = false, children }: Props) => {
  return (
    <div
      className={clsx(
        'relative m-auto block w-full sm:px-[16px]',
        small ? 'desktop:w-[736px]' : 'xl:w-[1152px] lg:w-[80%] md:w-[736px]'
      )}
    >
      {children}
    </div>
  );
};

export default Container;
