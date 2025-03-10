import fetchDataWP, {RequestPostGuest} from '@/fetch/fetchDataWP'

const request: RequestPostGuest = {
  api: '/pages/235?_&acf_format=standard',
  method: 'GET',
}

export async function fetchHomeData() {
  try {
    const data = await fetchDataWP(request)
    console.log('Fetched data:', data)
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
