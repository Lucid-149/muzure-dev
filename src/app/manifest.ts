import { siteConfig } from '@/config/site'
import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: 'MUZURE',
    description: siteConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#0B1320',
    theme_color: '#0B1320',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}