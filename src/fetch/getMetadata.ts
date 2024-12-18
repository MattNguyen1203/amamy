export default async function getMetadata(request: string) {
  try {
    const res = await fetch(
      `${process.env.ACF}${request}?_fields=yoast_head_json&acf_format=standard`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: {
          revalidate: 600,
        },
      },
    )

    // Check if the response is not okay
    if (!res.ok) {
      return null
    }

    // Parse and return the JSON response
    return await res.json()
  } catch (error: unknown) {
    console.log('🚀 ~ getMetadata ~ error:', error)
    // Convert the error to a string or handle based on its type
    // const errorMessage = error instanceof Error ? error.message : String(error)
    // throw new Error(`${env.API}${request.api}: ${errorMessage}`)
    return null
  }
}
