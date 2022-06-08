import request from '../request'
export const RequestGetTag = (id, page) => {
  return request.get('api/tag', {
    params: {
      id,
      page
    }
  })
}
