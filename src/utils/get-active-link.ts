const getActiveLink = (urls: Array<string>, pathname: string | null) => {
  return urls.some((item) => pathname === item);
};

export default getActiveLink;
