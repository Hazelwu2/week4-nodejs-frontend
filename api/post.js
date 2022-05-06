import request from '../utils/axios'

// 取得清單
export function getPostListAPI(data) {
  return request({
    url: 'api/posts',
    method: 'get',
    data
  })
}

// 新增貼文
export function createPostAPI(data) {
  return request({
    url: 'api/posts',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}

// 刪除所有貼文
export function deleteAllPostAPI(data) {
  return request({
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

