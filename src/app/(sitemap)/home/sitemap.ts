// import fetchData from '@/fetch/fetchData'
// import getData from '@/lib/getData'

// export default async function sitemap() {
//   const [posts, tours] = await Promise.all([
//     fetchData({
//       api: 'all-slug-post',
//     }),
//     getData({
//       api: '/api/v1/tours/get-all-slugs',
//     }),
//   ])
//   const fixedPage = [
//     {
//       url: process.env.NEXT_PUBLIC_DOMAIN,
//       lastModified: new Date(),
//       priority: 1,
//     },
//     {
//       url: `${process.env.NEXT_PUBLIC_DOMAIN}/about`,
//       lastModified: new Date(),
//       priority: 0.9,
//     },
//     {
//       url: `${process.env.NEXT_PUBLIC_DOMAIN}/blogs`,
//       lastModified: new Date(),
//       priority: 0.9,
//     },
//     {
//       url: `${process.env.NEXT_PUBLIC_DOMAIN}/blogs/search`,
//       lastModified: new Date(),
//       priority: 0.9,
//     },
//     {
//       url: `${process.env.NEXT_PUBLIC_DOMAIN}/tour-team-building`,
//       lastModified: new Date(),
//       priority: 0.9,
//     },
//     {
//       url: `${process.env.NEXT_PUBLIC_DOMAIN}/tour-trong-nuoc`,
//       lastModified: new Date(),
//       priority: 0.9,
//     },
//     {
//       url: `${process.env.NEXT_PUBLIC_DOMAIN}/thu-vien-anh`,
//       lastModified: new Date(),
//       priority: 0.9,
//     },
//     {
//       url: `${process.env.NEXT_PUBLIC_DOMAIN}/dich-vu-visa`,
//       lastModified: new Date(),
//       priority: 0.9,
//     },
//     {
//       url: `${process.env.NEXT_PUBLIC_DOMAIN}/tim-kiem`,
//       lastModified: new Date(),
//       priority: 0.9,
//     },
//     {
//       url: `${process.env.NEXT_PUBLIC_DOMAIN}/tour-doc-la`,
//       lastModified: new Date(),
//       priority: 0.9,
//     },
//     {
//       url: `${process.env.NEXT_PUBLIC_DOMAIN}/ve-chung-toi`,
//       lastModified: new Date(),
//       priority: 0.9,
//     },
//     {
//       url: `${process.env.NEXT_PUBLIC_DOMAIN}/payment-result`,
//       lastModified: new Date(),
//       priority: 0.9,
//     },
//     {
//       url: `${process.env.NEXT_PUBLIC_DOMAIN}/lien-he`,
//       lastModified: new Date(),
//       priority: 0.9,
//     },
//   ]
//   if (posts && posts.length > 0) {
//     posts.map((post) => {
//       fixedPage.push({
//         url: `${process.env.NEXT_PUBLIC_DOMAIN}/kinh-nghiem-du-lich/${post}`,
//         lastModified: new Date(),
//         priority: 0.8,
//       })
//     })
//   }
//   if (tours && tours.length > 0) {
//     tours.map((tour) => {
//       fixedPage.push({
//         url: `${process.env.NEXT_PUBLIC_DOMAIN}/${tour}`,
//         lastModified: new Date(),
//         priority: 0.8,
//       })
//     })
//   }
//   return fixedPage
// }
