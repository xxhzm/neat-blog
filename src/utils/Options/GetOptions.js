import request from '../request'

export const RequestGetOptions = () => {
  return request.get('api/options', {
    params: {}
  })
}
