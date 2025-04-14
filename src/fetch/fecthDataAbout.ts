import fetchData, {RequestPostGuest} from './fetchData'

const request: RequestPostGuest = {
  api: 'pages/235?_fields=banner,amamy_special,amamy_quality,amamy_service,withDHS,list_port',
  method: 'GET',
}
export async function fetchDataAbout() {
  try {
    const data = await fetchData(request)
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
