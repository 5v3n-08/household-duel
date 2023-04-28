
export function useBackendService () {
  async function post<T> (url: string, data: any, headers: any): Promise<T> {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    const responseData = await response.json() as T
    return responseData
  }

  async function get<T> (url: string, headers: any): Promise<T> {
    const response = await fetch(url, {
      method: 'GET',
      headers
    })

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    const responseData = await response.json() as T
    return responseData
  }

  async function patch<T> (url: string, data: any, headers: any): Promise<T> {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    const responseData = await response.json() as T
    return responseData
  }

  return {
    post,
    get,
    patch
  }
}
