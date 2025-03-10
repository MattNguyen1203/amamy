const baseURL =
  process.env.NEXT_PUBLIC_API! + process.env.NEXT_PUBLIC_API_VERSION!
export const fetcher = async (url: string, baseCustom?: string) => {
  const response = await fetch(`${baseCustom || baseURL}${url}`)
  if (!response.ok) {
    throw new Error('An error occurred while fetching the data.')
  }
  return response.json()
}
