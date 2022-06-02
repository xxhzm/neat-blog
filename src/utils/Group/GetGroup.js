import request from '../request'
export const RequestGetGrpup = () => {
  return request.get('api/group', {
    params: {
      mode: 'detail'
    }

  })
}
