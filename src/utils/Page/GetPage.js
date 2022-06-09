// 独立页面接口
import request from '../request'
export const RequestGetPage = (alias) => {
  return request.get('api/page', {
    params: {
      alias
    }
  })
}
