import axios from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2.js'

const service = axios.create({
  baseURL: 'http://localhost:3005'
})

// [發出請求]
service.interceptors.request.use(
  config => {
    console.log(
      `%c👨‍💻 Request:%c${config.url}`,
      'background:#3F51B5; padding: 3px; border-radius: 5px; color: #fff;',
      'padding: 3px;',
      config.data ? config.data : ''
    )

    return config
  },
  error => {
    console.error(`❌ 發生錯誤：${error}`) // for debug
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `${error}`,
    })
    return Promise.reject(error)
  }
)

// [Response 回應]
service.interceptors.response.use(
  response => {
    console.log(
      `%c🔌 Response:%c${response.config.url}`,
      'background:deepskyblue; padding: 3px; border-radius: 5px; color: #fff;',
      'padding: 3px;',
      response.data
    )

    return response.data
  },

  error => {
    console.error(`❌ 發生錯誤：${error}`)
    const { message } = error?.response.data

    Swal.fire({
      icon: 'error',
      title: 'Oops..發生錯誤',
      text: `${message}`,
    })

    console.table(error.response.data)
  }
)

export default service