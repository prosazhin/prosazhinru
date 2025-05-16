'use client';

import SendMixpanel from '@/lib/mixpanel';
import { useEffect } from 'react';

const Mixpanel = ({ event }: { event: string }) => {
  useEffect(() => {
    SendMixpanel.event(event);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default Mixpanel;
