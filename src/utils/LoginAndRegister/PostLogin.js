// 用户登陆
import request from '../request'
export const RequestPostLogin = ({ username, password }) => {
  return request.post('api/users', {}, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: {
      mode: 'login',
      account: username,
      password: password
    }
  })
}
