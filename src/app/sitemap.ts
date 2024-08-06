import { getAllDestinationsMeta, getAllToursMeta } from "@/database/func";
import { MetadataRoute } from "next";

const URL = "https://muzuretravel.com";
async function generateDestinationSitemap(): Promise<MetadataRoute.Sitemap> {
  const destinations = await getAllDestinationsMeta();
  if (!destinations) {
    return [];
  }
  const sitemapEntries: MetadataRoute.Sitemap = destinations.items.map(
    (destination) => ({
      url: `${URL}/destinations/${destination.id}`,
      lastModified: new Date(destination.updated || destination.created),
      changeFrequency: "monthly",
      priority: 0.8,
    })
  );

  return sitemapEntries;
}

async function generateTourSitemap(): Promise<MetadataRoute.Sitemap> {
  const tours = await getAllToursMeta();

  const sitemapEntries: MetadataRoute.Sitemap = tours.items.map((tour) => ({
    url: `${URL}/tours/${tour.id}`,
    lastModified: new Date(tour.updated || tour.created),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return sitemapEntries;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    "about/terms",
    "about/help",
    "about/terms/privacy",
    "contact",
    "tours",
    "services/car-rental",
    "planner",
    "services/flight-booking",
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [
    {
      url: URL,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${URL}/tours`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ];

  routes.forEach((route) => {
    sitemapEntries.push({
      url: `${URL}/${route}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  });

  // Include destinations in the sitemap
  const destinationSitemapEntries = await generateDestinationSitemap();
  sitemapEntries.push(...destinationSitemapEntries);

  // Include tours in the sitemap
  const tourSitemapEntries = await generateTourSitemap();
  sitemapEntries.push(...tourSitemapEntries);

  return sitemapEntries;
}
