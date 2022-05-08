import request from '../utils/axios'
import { resHandle } from '../utils/resHandle'

// 取得清單
export async function getPostListAPI(data) {
  return await request({
    url: 'api/posts',
    method: 'get',
    data
  })

}

// 取得清單
export async function getPostListQueryAPI({ sort = '', q = '' }) {
  return await request({
    // sort: 針對 createdAt 排序，asc || desc
    // q: 針對貼文內容 content 模糊搜尋
    url: `api/posts?sort=${sort}&q=${q}`,
    method: 'get',
  })

}

// 新增貼文
export async function createPostAPI(data) {
  return await request({
    url: 'api/posts',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })

}

// 刪除所有貼文
export async function deleteAllPostAPI(data) {
  return await request({
    url: 'api/posts',
    method: 'delete',
    data
  })

}

// 更新貼文
export function updatePostAPI(id, data) {
  return request({
    url: `api/posts/${id}`,
    method: 'patch',
    data
  })

}

// 刪除貼文
export function deletePostAPI(id) {
  return request({
    url: `api/posts/${id}`,
    method: 'delete',
  })

}

