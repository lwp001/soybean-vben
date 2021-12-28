/**
 * 请求服务的错误类型：
 * - axios: axios错误：网络错误, 请求超时, 默认的兜底错误
 * - http: 请求成功，响应的状态码非200的错误
 * - backend: 请求成功，响应的状态码为200，由后端定义的业务错误
 */
export type RequestServiceErrorType = 'axios' | 'http' | 'backend';

/** 请求服务的错误 */
export interface RequestServiceError {
  /** 请求服务的错误类型 */
  type: RequestServiceErrorType;
  /** 错误码 */
  code: string | number;
  /** 错误信息 */
  msg: string;
}

/** 后端接口返回的类型结构 */
export interface BackendServiceResult {
  /** 状态码 */
  code: number;
  /** 接口数据 */
  data: any;
  /** 接口消息 */
  message: string;
}

/** 自定义的请求成功结果 */
export interface CustomSuccessRequestResult<ResponseData> {
  /** 请求错误 */
  error: null;
  /** 请求数据 */
  data: ResponseData;
}

/** 自定义的请求失败结果 */
export interface CustomFailRequestResult {
  /** 请求错误 */
  error: RequestServiceError;
  /** 请求数据 */
  data: null;
}

/** 自定义的请求结果 */
export type CustomRequestResult<ResponseData> = CustomSuccessRequestResult<ResponseData> | CustomFailRequestResult;

export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined;

export interface RequestOptions {
  // Splicing request parameters to url
  joinParamsToUrl?: boolean;
  // Format request parameter time
  formatDate?: boolean;
  // Whether to process the request result
  isTransformResponse?: boolean;
  // Whether to return native response headers
  // For example: use this attribute when you need to get the response headers
  isReturnNativeResponse?: boolean;
  // Whether to join url
  joinPrefix?: boolean;
  // Interface address, use the default apiUrl if you leave it blank
  apiUrl?: string;
  // 请求拼接路径
  urlPrefix?: string;
  // Error message prompt type
  errorMessageMode?: ErrorMessageMode;
  // Whether to add a timestamp
  joinTime?: boolean;
  ignoreCancelToken?: boolean;
  // Whether to send token in header
  withToken?: boolean;
}

export interface Result<T = any> {
  code: number;
  type: 'success' | 'error' | 'warning';
  message: string;
  result: T;
}

// multipart/form-data: upload file
export interface UploadFileParams {
  // Other parameters
  data?: Recordable;
  // File parameter interface field name
  name?: string;
  // file name
  file: File | Blob;
  // file name
  filename?: string;
  [key: string]: any;
}
