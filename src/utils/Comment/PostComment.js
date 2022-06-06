import request from '../request'
export const RequestPostComment = (data) => {
  return request.post('api/comments', data, {
    params: {}
  })
}
