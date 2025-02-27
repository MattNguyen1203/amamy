/* eslint-disable @typescript-eslint/no-explicit-any */


export default async function sitemap() {
    return  [
        {
            url: '/',
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: '/about',
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: '/contact',
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: '/products',
            changeFrequency: 'daily',
            priority: 0.7,
        },
        ]
    }
