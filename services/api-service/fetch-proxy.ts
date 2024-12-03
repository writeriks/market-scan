/**
 * Utility function to fetch data from a given URL.
 * @param url - The endpoint to fetch data from.
 * @param headers - Optional headers for the request.
 * @param payload - Optional payload for POST/PUT requests.
 * @returns A Promise resolving to the response object.
 */
export const fetchUrl = async (
  url: string,
  headers: Record<string, string> = {},
  payload?: Record<string, any>
): Promise<Response> => {
  try {
    const options: RequestInit = {
      method: payload ? 'POST' : 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: payload ? JSON.stringify(payload) : undefined,
      next: { revalidate: 60 },
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to fetch metrics');
  }
};
