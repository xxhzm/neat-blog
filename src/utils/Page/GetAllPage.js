// Header 请求独立页面接口
import request from '../request'

export const RequestGetAllPage = () => {
  return request.get('api/page', {
    params: {
      limit: 4
    }
  })
}
