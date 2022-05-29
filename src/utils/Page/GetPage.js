// Header 请求独立页面接口
import request from '../request'

export const RequestGetPage = () => {
  return request.get('api/page', {
    params: {
      limit: 4
    }
  })
}
