import Swal from 'sweetalert2/dist/sweetalert2.js'

export const resHandle = (response) => {
  const { status, data, errors } = response.data
  if (status === 1) return { data }
  if (status !== 1) return {
    errors
  }
}

export const showSuccess = (text = '成功', cb = noFunction) => {
  Swal.fire({
    icon: 'success',
    text: `${text}`,
  }).then(() => cb())
}

const noFunction = () => { }