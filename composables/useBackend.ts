import _ from 'lodash'
import { UseFetchOptions } from 'nuxt/dist/app/composables/fetch'
import { useGlobalStore } from '~~/stores/global'

enum EHttpMethods {
  GET = 'get',
  POST = 'post',
  PATCH = 'patch',
  DELETE = 'delete',
  PUT = 'put'
}

// export const useBackend = <T>(url: string, data?: { [key: string]: any }, method?: EHttpMethods, options?: UseFetchOptions<unknown>) => {
//   const config = useRuntimeConfig();

//   if (!config.public.baseUrl || (_.isString(config.public.baseUrl) && config.public.baseUrl.length <= 0)) {
//     throw new Error("Please define NUXT_PUBLIC_BASE_URL in your .env file");
//   }
//   if (!config.public.apiBase || (_.isString(config.public.apiBase) && config.public.apiBase.length <= 0)) {
//     throw new Error("Please define NUXT_PUBLIC_API_BASE in your .env file");
//   }

//   let _method = method ?? EHttpMethods.GET;
//   if (!method && !_.isEmpty(data)) _method = EHttpMethods.POST;

//   return $fetch<T>(`${config.public.baseUrl}${config.public.apiBase}/${url}`, {
//     body: data,
//     method: _method,
//     ...{ options },
//   });
// };

export interface ILoginError {
  message: string;
}

export const useBackend = async <T>(
  url: string,
  data?: { [key: string]: any },
  method?: EHttpMethods,
  options?: UseFetchOptions<unknown>
) => {
  const config = useRuntimeConfig()
  const globalStore = useGlobalStore()

  if (!config.baseUrl || (_.isString(config.baseUrl) && config.baseUrl.length <= 0)) {
    throw new Error('Please define a baseUrl in your .env file!')
  }

  let _method = method ?? EHttpMethods.GET
  if (!method && !_.isEmpty(data)) { _method = EHttpMethods.POST }

  return await useFetch<T>(`${config.public.baseUrl}${config.public.apiBase}/${url}`, {
    body: data,
    method: _method,
    // eslint-disable-next-line require-await
    async onRequestError ({ request, options, error }) {
      // Log error
      console.log('[fetch request error]', request, error.message)
    },
    // eslint-disable-next-line require-await
    async onResponse ({ request, response, options }) {
      // Log response
      console.log('[fetch response]', request, response.status, JSON.stringify(response.body))
    },
    // eslint-disable-next-line require-await
    async onResponseError ({ request, response, options }) {
      // Log error
      console.log('[fetch response error]', request, response.status, JSON.stringify(response.body))
    },
    ...{ options }
  }).catch((error) => {
    // console.log('test error');
    console.log('catch error => ' + error)
    globalStore.setError(error.message, error.statusCode)
  })
}
