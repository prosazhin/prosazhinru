import AsideNav from '@/components/aside/Nav';
import AsideProfile from '@/components/aside/Profile';

const LeftAside = ({
  data,
  wrapperId,
}: {
  data: { title: string; type: string }[];
  wrapperId: string;
}) => (
  <div className='sticky top-96 flex flex-col gap-y-32 pr-16 print:relative print:top-0 print:-mt-70 print:mb-20'>
    <AsideProfile />
    <AsideNav
      data={data}
      wrapperId={wrapperId}
    />
  </div>
);

export default LeftAside;
