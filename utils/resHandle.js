export const resHandle = (response) => {
  const { status, data, errors } = response.data
  if (status === 1) return { data }
  if (status !== 1) return {
    errors
  }
}