export type SiteConfig = typeof siteConfig;

const d = new Date();
export const siteConfig = {
  name: "Muzure Travel",
  description:
    "Discover the world's most enchanting destinations with Muzure Travel Agency. Our expertly curated travel packages ensure unforgettable adventures.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About us",
      href: "/about",
    },
    {
      label: "Our Tours",
      href: "/tours",
    },
    {
      label: "Services",
      subroutes: [
        { label: "Tour Planning", href: "/services/planning" },
        { label: "Travel Documentation", href: "/services/documentation" },
        { label: "Transport Services", href: "/services/transport" },
        { label: "Car Rental", href: "/services/car-rental" },
        { label: "Hotel Booking", href: "/services/hotels" },
        { label: "Flight Booking", href: "/services/flight-booking" },
      ],
    },
    {
      label: "Destinations",
      href: "/destinations",
    },
    {
      label: `Contacts`,
      href: "/contact",
    },
  ],
  navMenuItems: [
    {
      label: "Terms & conditions",
      href: "/terms",
    },
    {
      label: "Privacy Policy",
      href: "/privacy",
    },
    {
      label: "About us",
      href: "/about",
    },
    {
      label: "Help & Feedback",
      href: "/about/help",
    },
  ],
  links: {
    copy: "©" + d.getFullYear() + ". All rights reserved.",
  },
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61560395636786",
    instagram: "https://www.instagram.com/muzure.travel",
    mail: "mailto:info@muzuretravel.com",
    phonenumber: "tel:+254795805779",
    whatsapp: "https://wa.me/254795805779",
  },
};
