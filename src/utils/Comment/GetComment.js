import request from '../request'
export const RequestGetComment = (id) => {
  return request.get('api/comments', {
    params: {
      article_id: id,
      limit: 999
    }
  })
}
