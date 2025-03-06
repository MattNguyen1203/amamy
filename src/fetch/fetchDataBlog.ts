import fetchData, {RequestPostGuest} from './fetchData'

const request: RequestPostGuest = {
  api: 'blogs?paged=1&categories=cau-chuyen-thanh-cong&limit=10',
  method: 'GET',
}

export async function fetchDataBlog() {
  try {
    const data = await fetchData(request)
    console.log('Fetched data:', data)
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
