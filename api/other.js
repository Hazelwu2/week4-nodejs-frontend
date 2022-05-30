import request from '../utils/axios'

// 登入
export async function uploadImageAPI(data) {
  return await request({
    url: 'api/upload',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}
