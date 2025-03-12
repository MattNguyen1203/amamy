import fetchDataWP from './fetchDataWP'
import {RequestPostGuest} from './fetchData'

const request: RequestPostGuest = {
  api: 'pages/235?_&acf_format=standard',
  method: 'GET',
}
export async function fetchDataAbout() {
  try {
    const data = await fetchDataWP(request)
    console.log('Fetched data wp:', data)
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
