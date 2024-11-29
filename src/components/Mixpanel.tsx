'use client';

import { useEffect } from 'react';

import SendMixpanel from '@/lib/mixpanel';

const Mixpanel = ({ event }: { event: string }) => {
  useEffect(() => {
    SendMixpanel.event(event);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default Mixpanel;
