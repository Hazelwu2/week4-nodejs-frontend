const tokenName = 'accessToken'

const getToken = () => sessionStorage.getItem(tokenName)
const setToken = (token) => sessionStorage.setItem(tokenName, token)
const removeToken = () => sessionStorage.removeItem(tokenName)

export {
  getToken,
  setToken,
  removeToken
}