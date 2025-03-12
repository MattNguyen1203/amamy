import fetchData, {RequestPostGuest} from './fetchData'

const request: RequestPostGuest = {
  api: 'pages/11?_fields=banner,services,section3,section_country,withDHS,faq,faqs',
  method: 'GET',
}

export async function fetchDataAbout() {
  try {
    const data = await fetchData(request)
    console.log('Fetched data:', data)
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
