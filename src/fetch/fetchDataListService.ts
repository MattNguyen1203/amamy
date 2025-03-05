import fetchData, {RequestPostGuest} from './fetchData'

const request: RequestPostGuest = {
  api: 'options?fields=list_services_data',
  method: 'GET',
}

export async function fetchDataListService() {
  try {
    const data = await fetchData(request)
    console.log('Fetched data:', data)
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
