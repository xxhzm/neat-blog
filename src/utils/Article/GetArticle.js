import request from '../request'
export const RequestGetArticle = () => {
  return request.get('api/article', {
    params: {

    }
  })
}
