import fetchData, {RequestPostGuest} from './fetchData'

const request: RequestPostGuest = {
  api: 'chieu-van-chuyen/gui-hang-viet-duc?_fields=banner,talk_to_ai,list_services,feedback_customer',
  method: 'GET',
}

export async function fetchDataService() {
  try {
    const data = await fetchData(request)
    console.log('Fetched data:', data)
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
