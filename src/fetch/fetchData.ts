/* eslint-disable @typescript-eslint/no-explicit-any */

export type RequestPostGuest = {
  api: string
  headers?: any
  option?: any
  method?: string
}

export default async function fetchData(request: RequestPostGuest) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}${process.env.NEXT_PUBLIC_API_VERSION}${
        request.api
      }`,
      {
        method: request.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...request.headers,
        },
        ...request.option,
      },
    )

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      // throw new Error('Failed to fetch data')
      return res.json()
    }

    return res.json()
  } catch (error: unknown) {
    // Convert the error to a string or handle based on its type
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(
      `${process.env.NEXT_PUBLIC_API!}${process.env.NEXT_PUBLIC_API_VERSION!}${
        request.api
      }: ${errorMessage}`,
    )
  }
}
