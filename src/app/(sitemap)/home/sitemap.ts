/* eslint-disable @typescript-eslint/no-explicit-any */


export default async function sitemap() {
  
    return {
        pages: [
        {
            url: '/',
            changefreq: 'daily',
            priority: 1,
        },
        {
            url: '/about',
            changefreq: 'daily',
            priority: 0.9,
        },
        {
            url: '/contact',
            changefreq: 'daily',
            priority: 0.8,
        },
        {
            url: '/products',
            changefreq: 'daily',
            priority: 0.7,
        },
        ],
    }
}
