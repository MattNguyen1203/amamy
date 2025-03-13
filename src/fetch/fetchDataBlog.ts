import fetchData, {RequestPostGuest} from './fetchData'

const request: RequestPostGuest = {
  api: 'blogs?paged=1&categories=&limit=10',
  method: 'GET',
}

export async function fetchDataBlog() {
  try {
    const data = await fetchData(request)
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
