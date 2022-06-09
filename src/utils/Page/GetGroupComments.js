import request from '../request'
export const RequestGetGroupComments = () => {
  return request.get('api/comments', {
    params: {
      mode: 'group',
      limit: 9999
    }
  })
}
