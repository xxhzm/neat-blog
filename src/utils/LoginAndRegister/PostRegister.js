// 用户注册
import request from '../request'
export const RequestPostRegister = ({ nickname, email, password, code }) => {
  return request.post('api/users', {}, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: {
      mode: 'register',
      nickname,
      email,
      password,
      code
    }
  })
}
