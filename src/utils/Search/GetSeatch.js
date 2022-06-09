// 搜索
import request from '../request'

export const RequestGetSearch = (value, page = 1) => {
  return request.get('api/search/article', {
    params: {
      value,
      page
    }
  })
}
