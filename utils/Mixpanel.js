import mixpanel from 'mixpanel-browser';
mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN);

let prod = process.env.NEXT_PUBLIC_NODE_ENV === 'production';

const Mixpanel = {
  event: (name, props) => {
    if (prod) mixpanel.track(name, props);
  },
};

export default Mixpanel;
