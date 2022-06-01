import request from '../request'
export const RequestGetArticle = (page = 1) => {
  return request.get('api/article', {
    params: {
      page
    }
  })
}
