import _ from 'lodash'
import { UseFetchOptions } from 'nuxt/dist/app/composables/fetch'
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'
import { useGlobalStore } from '~~/stores/global'
import { useAuthentication } from '~~/stores/authentication'

export enum EHttpMethods {
  GET = 'get',
  POST = 'post',
  PATCH = 'patch',
  DELETE = 'delete',
  PUT = 'put'
}

export interface INestError {
  message: string;
  path: string;
  stack: string;
  statusCode: number;
}

export const useBackend = async <ReturnData>(
  url: string,
  data?: any,
  method?: EHttpMethods | 'post',
  options?: UseFetchOptions<unknown>
) => {
  const config = useRuntimeConfig()
  const globalStore = useGlobalStore()
  const authentication = useAuthentication()

  if (!config.public.apiBaseUrl || (_.isString(config.public.apiBaseUrl) && config.public.apiBaseUrl.length <= 0)) {
    throw new Error('Please define a NUXT_PUBLIC_API_BASE_URL in your .env file!')
  }
  if (!config.public.apiBasePath || (_.isString(config.public.apiBasePath) && config.public.apiBasePath.length <= 0)) {
    throw new Error('Please define a NUXT_PUBLIC_API_BASE_PATH in your .env file!')
  }

  let _method = method ?? EHttpMethods.GET
  if (!method && !_.isEmpty(data)) { _method = EHttpMethods.POST }

  // Check if accessToken is expired and try to get a new one with refreshToken otherwise, redirect to login page
  if (authentication.isAuthenticated && authentication.getAccessToken) {
    let decoded = jwt_decode(authentication.getAccessToken)

    console.log(decoded)
  }

  return await useFetch<ReturnData, INestError>(url, {
    body: data,
    method: _method,
    baseURL: `${config.public.apiBaseUrl}${config.public.apiBasePath}`,
    headers: {
      PROJECT: 'OURPROJECTS-CLOUD',
      Authorization: authentication.getAccessToken ? 'Bearer ' + authentication.getAccessToken : undefined,
      Refresh: authentication.getRefreshToken
    },
    ...{ options },
    async onRequestError ({ request, options, error }) {
      // Handle the request errors
      console.log('[fetch request error]', request, error.message)
    },
    onResponse ({ request, response, options }) {
      // Process the response data
      console.log('[fetch response]', request, response._data)
      return response._data
    },
    async onResponseError ({ request, response, options }) {
      // Handle the response errors
      // Validation error
      const data: INestError = response._data
      if (data.statusCode === 400 || data.statusCode === 401) {
        Toast.fire({
          html: data.message.replace(';', '<br />'),
          icon: 'error'
        })
      }
      // globalStore.setError(response._data.message, response._data.statusCode)
      console.log('[fetch response error]', request, response._data.message)
      // globalStore.setError(error.message, error.statusCode)
      return response._data
    }
  })
}
