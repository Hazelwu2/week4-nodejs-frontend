const tokenName = 'accessToken'

const getToken = () => sessionStorage.getItem(tokenName)
const setToken = (token) => sessionStorage.setItem(tokenName, token)
const removeToken = () => sessionStorage.removeToken(tokenName)

export {
  getToken,
  setToken,
  removeToken
}