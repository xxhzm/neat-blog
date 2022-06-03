// 获取邮箱验证码
import request from '../request'
export const RequestPostVerifyCode = (email) => {
  return request.post('api/verify-code', {}, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: {
      mode: 'create',
      email
    }
  })
}
