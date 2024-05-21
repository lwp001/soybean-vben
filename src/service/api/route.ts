import { cloneDeep } from 'lodash-es';
import { request } from '../request';

import { routes } from '../test_data/routes';

/** get constant routes */
export function fetchGetConstantRoutes() {
  // return request<Api.Route.MenuRoute[]>({ url: '/route/getConstantRoutes' });
  const myFirstPromise = new Promise((resolve, _reject) => {
    // 当异步操作成功时，我们调用 resolve(...)，当其失败时，调用 reject(...)。
    // 在这个例子中，我们使用 setTimeout(...) 来模拟异步代码。
    // 在实际情况中，你可能会使用类似 XHR 或 HTML API 等。
    setTimeout(() => {
      resolve({
        routes: [],
        home: 'home'
      });
    }, 250);
  });

  return myFirstPromise;
}

/** get user routes */
export function fetchGetUserRoutes() {
  // return request<Api.Route.UserRoute>({ url: '/route/getUserRoutes' });

  const myFirstPromise = new Promise((resolve, _reject) => {
    // 当异步操作成功时，我们调用 resolve(...)，当其失败时，调用 reject(...)。
    // 在这个例子中，我们使用 setTimeout(...) 来模拟异步代码。
    // 在实际情况中，你可能会使用类似 XHR 或 HTML API 等。
    setTimeout(() => {
      resolve({
        code: 200,
        msg: null,
        data: {
          routes: cloneDeep(routes),
          home: 'home'
        }
      });
    }, 250);
  });

  return myFirstPromise;
}

/**
 * whether the route is exist
 *
 * @param routeName route name
 */
export function fetchIsRouteExist(routeName: string) {
  return request<boolean>({ url: '/route/isRouteExist', params: { routeName } });
}
