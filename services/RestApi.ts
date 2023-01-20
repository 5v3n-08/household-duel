import _ from 'lodash'
import { UseFetchOptions } from 'nuxt/dist/app/composables/fetch'
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'
import { useRepo } from 'pinia-orm'
import { useGlobalStore } from '~~/stores/global'
import { useAuthentication } from '~~/stores/authentication'
import User from '~~/models/User'
import Adapter from '~~/models/Adapter'

enum EHttpMethods {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  PUT = 'PUT'
}

interface INestError {
  message: string;
  path: string;
  stack: string;
  statusCode: number;
}

export default class RestApi {
  static async get <ReturnData> (url: string, options?: UseFetchOptions<unknown>) {
    return await callApi <ReturnData>(url, undefined, EHttpMethods.GET, options)
  }

  static async post <ReturnData> (url: string, data: unknown, options?: UseFetchOptions<unknown>) {
    return await callApi <ReturnData>(url, data, EHttpMethods.POST, options)
  }

  static async patch <ReturnData> (url: string, data: unknown, options?: UseFetchOptions<unknown>) {
    const callData = await callApi <ReturnData>(url, data, EHttpMethods.PATCH, options)

    if (callData.data) {
      Toast.fire({
        html: 'Successfully saved',
        icon: 'success'
      })
    }
    return callData
  }

  static async put <ReturnData> (url: string, data: unknown, options?: UseFetchOptions<unknown>) {
    return await callApi <ReturnData>(url, data, EHttpMethods.PUT, options)
  }

  static async delete <ReturnData> (url: string, id: string, options?: UseFetchOptions<unknown>) {
    return await callApi <ReturnData>(url, id, EHttpMethods.DELETE, options)
  }
}

async function callApi <ReturnData> (url: string,
  data?: unknown,
  method?: EHttpMethods | 'post',
  options?: UseFetchOptions<unknown>) {
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

  return await useLazyFetch<ReturnData, INestError>(url, <ReturnData>{
    key: _.uniqueId(), // stop nuxt from caching the request. Otherwise its not calling url when url changed
    body: data,
    method: _method,
    baseURL: `${config.public.apiBaseUrl}${config.public.apiBasePath}`,
    headers: {
      PROJECT: 'OURPROJECTS-CLOUD',
      Authorization: authentication.getAccessToken ? 'Bearer ' + authentication.getAccessToken : undefined,
      Refresh: authentication.getRefreshToken
    },
    ...{ options },
    onRequestError ({ request, options, error }) {
      // Handle the request errors
      console.log('[fetch request error]', request, error.message)
    },
    onResponse ({ request, response, options }) {
      // Process the response data
      console.log('[fetch response]', request, response._data)

      _.each(response._data, (data, key, items) => {
        console.log(items[key])
        switch (key) {
          case 'User':
            _.each(items[key], (item) => {
              useRepo(User).save(item)
            })
            break
          case 'Adapter':
            _.each(items[key], (item) => {
              useRepo(Adapter).save(item)
            })
            break

          default:
            break
        }
      })
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
