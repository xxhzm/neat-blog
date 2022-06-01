import request from '../request'
export const RequestGetAllTag = () => {
  return request.get('api/tag', {
    params: {
      limit: 9999
    }
  })
}
