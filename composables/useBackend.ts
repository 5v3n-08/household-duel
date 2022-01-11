import _ from "lodash";
import { UseFetchOptions } from "nuxt3/dist/app/composables/fetch";

export const useBackend = (url: string, data?: { [key: string]: any }, method?: EHttpMethods, options?: UseFetchOptions<unknown>) => {
  const config = useRuntimeConfig();

  if (!config.baseUrl || (_.isString(config.baseUrl) && config.baseUrl.length <= 0)) {
    throw Error("Please define a baseUrl in your .env file!");
  }

  let _method = method ?? EHttpMethods.GET;
  if (!method && !_.isEmpty(data)) _method = EHttpMethods.POST;

  return useFetch(`${config.baseUrl}${url}`, {
    body: data,
    method: _method,
    ...{ options },
  });
};

enum EHttpMethods {
  GET = "get",
  POST = "post",
  PATCH = "patch",
  DELETE = "delete",
  PUT = "put",
}
