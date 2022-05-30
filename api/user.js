import request from '../utils/axios'

// 登入
export async function signInAPI(data) {
  return await request({
    url: 'api/users/sign_in',
    method: 'post',
    data
  })
}

// 註冊
export async function signUpAPI(data) {
  return await request({
    url: `api/users/sign_up`,
    method: 'post',
    data
  })

}

// 重設密碼
export async function updatePasswordAPI(data) {
  return await request({
    url: 'api/users/updatePassword',
    method: 'patch',
    data
  })

}

// 取得個人資料
export async function getMyProfileAPI(data) {
  return await request({
    url: 'api/users/profile',
    method: 'get',
    data
  })
}

// 更新個人資料
export async function updateMyProfileAPI(data) {
  return await request({
    url: 'api/users/profile',
    method: 'patch',
    data
  })
}


