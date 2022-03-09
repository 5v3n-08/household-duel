import _ from "lodash";
import { UseFetchOptions } from "nuxt3/dist/app/composables/fetch";

enum EHttpMethods {
  GET = "get",
  POST = "post",
  PATCH = "patch",
  DELETE = "delete",
  PUT = "put",
}

export const useBackend = (url: string, data?: { [key: string]: any }, method?: EHttpMethods, options?: UseFetchOptions<unknown>) => {
  const config = useRuntimeConfig();

  if (!config.baseUrl || (_.isString(config.baseUrl) && config.baseUrl.length <= 0)) {
    throw new Error("Please define a baseUrl in your .env file!");
  }

  let _method = method ?? EHttpMethods.GET;
  if (!method && !_.isEmpty(data)) _method = EHttpMethods.POST;

  return useFetch(`${config.baseUrl}${url}`, {
    body: data,
    method: _method,
    ...{ options },
  });
};



// export const useBackend = <T>(url: string, data?: { [key: string]: any }, method?: EHttpMethods, options?: UseFetchOptions<unknown>) => {
//   const config = useRuntimeConfig();
//   const globalStore = useGlobalStore();

//   if (!config.baseUrl || (_.isString(config.baseUrl) && config.baseUrl.length <= 0)) {
//     throw new Error("Please define a baseUrl in your .env file!");
//   }

//   let _method = method ?? EHttpMethods.GET;
//   if (!method && !_.isEmpty(data)) _method = EHttpMethods.POST;

//   return $fetch<T>(`${config.baseUrl}${url}`, {
//     body: data,
//     method: _method,
//     ...{ options },
//   }).catch((error) => {
//     // console.log('test error');
//     // console.log(error);
//     globalStore.setError(error.message, error.statusCode);
//   });
// };