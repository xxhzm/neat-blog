// Header 请求独立页面接口
import axios from 'axios'
export const AxiosGetPage = () => {
  return axios.get('api/page?limit=4')
}
