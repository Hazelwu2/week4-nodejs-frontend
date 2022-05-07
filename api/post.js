import request from '../utils/axios'
import { resHandle } from '../utils/resHandle'

// 取得清單
export async function getPostListAPI(data) {
  const resData = await request({
    url: 'api/posts',
    method: 'get',
    data
  })

  return resHandle(resData)
}

// 新增貼文
export async function createPostAPI(data) {
  const resData = await request({
    url: 'api/posts',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })

  return resHandle(resData)
}

// 刪除所有貼文
export async function deleteAllPostAPI(data) {
  const resData = await request({
    url: 'api/posts',
    method: 'delete',
    data
  })

  return resHandle(resData)
}

// 更新貼文
export function updatePostAPI(id, data) {
  const resData = request({
    url: `api/posts/${id}`,
    method: 'patch',
    data
  })

  return resHandle(resData)
}

// 刪除貼文
export function deletePostAPI(id) {
  const resData = request({
    url: `api/posts/${id}`,
    method: 'delete',
  })

  return resHandle(resData)
}

