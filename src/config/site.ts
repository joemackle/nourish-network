export const siteConfig = {
  name: "NourishNetwork",
  description:
    "Connecting people in need with local food events. We bridge the gap between surplus and scarcity.",
  links: {
    github: "https://github.com/joemackle/nourish-network",
  },
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Search",
      href: "/search",
    },
    {
      title: "Profile",
      href: "/profile",
    },
    {
      title: "Login",
      href: "/login",
    },
  ],
};

export type SiteConfig = typeof siteConfig;
