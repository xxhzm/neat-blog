import request from '../request'
export const RequestGetLinks = () => {
  return request.get('api/links', {
    params: {
      limit: 9999
    }
  })
}
