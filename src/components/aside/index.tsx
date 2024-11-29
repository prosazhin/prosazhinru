import AsideNav from '@/components/aside/Nav';
import AsideProfile from '@/components/aside/Profile';

const LeftAside = ({
  data,
  wrapperId,
}: {
  data: { title: string; type: string }[];
  wrapperId: string;
}) => (
  <div className="sticky flex flex-col pr-16 top-96 gap-y-32 divide-y-1 divide-secondary-lighter">
    <AsideProfile />
    <AsideNav data={data} wrapperId={wrapperId} />
  </div>
);

export default LeftAside;
