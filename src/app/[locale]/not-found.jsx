import Mixpanel from '@/components/Mixpanel';
import NotFoundContent from '@/components/NotFoundContent';

const NotFound = () => {
  return (
    <>
      <NotFoundContent />
      <Mixpanel event="LOADING_404_ERROR_PAGE" />
    </>
  );
};

export default NotFound;
