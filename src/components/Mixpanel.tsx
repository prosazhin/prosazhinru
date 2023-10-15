'use client';

import { useEffect } from 'react';

import SendMixpanel from '@/lib/mixpanel';

type Props = {
  event: string;
};

const Mixpanel = ({ event }: Props) => {
  useEffect(() => {
    SendMixpanel.event(event);
  }, []);

  return null;
};

export default Mixpanel;
