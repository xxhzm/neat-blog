import request from '../request'
export const RequestGetArticle = (page, id) => {
  return request.get('api/article', {
    params: {
      page,
      id
    }
  })
}
