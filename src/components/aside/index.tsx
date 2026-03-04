import AsideNav from '@/components/aside/Nav';
import AsideProfile from '@/components/aside/Profile';

type NavItem = { type: string; title: string };

const LeftAside = ({ wrapperId, data }: { wrapperId: string; data: NavItem[] }) => (
  <div className='sticky top-96 flex flex-col gap-y-32 pr-16 print:relative print:top-0 print:-mt-70 print:mb-20'>
    <AsideProfile />
    <AsideNav
      wrapperId={wrapperId}
      items={data}
    />
  </div>
);

export default LeftAside;
