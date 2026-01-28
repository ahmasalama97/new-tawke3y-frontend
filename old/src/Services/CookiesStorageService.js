import Cookies from "js-cookie"

const COOKIE_DEFAULT_META = {
  path: "/",
  domain: `${process.env.REACT_APP_DOMAIN}`,
  expires: 3,
}

const CookiesStorageService = (() => {
  let _service

  function _getService() {
    if (!_service) {
      _service = this
      return _service
    }
    return _service
  }

  function _setUserId(id) {
    Cookies.set("id", id, COOKIE_DEFAULT_META)
  }

  function _setUserInfo(user) {
    Cookies.set("user", user, COOKIE_DEFAULT_META)
  }

  function _setToken(token) {
    Cookies.set("token", token, COOKIE_DEFAULT_META)
  }

  function _setRefreshToken(refreshToken) {
    Cookies.set("refreshToken", refreshToken, COOKIE_DEFAULT_META)
  }

  function _setUserType(type) {
    Cookies.set("integrationType", type, COOKIE_DEFAULT_META)
  }

  function _setAdminType(type) {
    Cookies.set("adminType", type, COOKIE_DEFAULT_META)
  }

  function _setUserRoles(roles) {
    Cookies.set("roles", JSON.stringify(roles), COOKIE_DEFAULT_META)
  }

  function _getUserId() {
    return Cookies.get("id")
  }

  function _getUserInfo() {
    return Cookies.get("user")
  }

  function _getAccessToken() {
    return Cookies.get("token")
  }

  function _getAccessRefreshToken() {
    return Cookies.get("refreshToken")
  }

  function _getUserType() {
    return Cookies.get("integrationType")
  }

  function _getAdminType() {
    return Cookies.get("adminType")
  }

  function _getUserRoles() {
    if (Cookies.get("roles")) {
      return JSON.parse(Cookies.get("roles"))
    }
    return []
  }

  function _clearToken() {
    Cookies.remove("id", COOKIE_DEFAULT_META)
    Cookies.remove("user", COOKIE_DEFAULT_META)
    Cookies.remove("token", COOKIE_DEFAULT_META)
    Cookies.remove("refreshToken", COOKIE_DEFAULT_META)
    Cookies.remove("expireAt", COOKIE_DEFAULT_META)
    Cookies.remove("integrationType", COOKIE_DEFAULT_META)
    Cookies.remove("roles", COOKIE_DEFAULT_META)
    Cookies.remove("adminType", COOKIE_DEFAULT_META)
  }

  return {
    getService: _getService,
    setUserId: _setUserId,
    setUserInfo: _setUserInfo,
    setToken: _setToken,
    setRefreshToken: _setRefreshToken,
    setUserType: _setUserType,
    setAdminType: _setAdminType,
    setUserRoles: _setUserRoles,
    getUserId: _getUserId,
    getUserInfo: _getUserInfo,
    getAccessToken: _getAccessToken,
    getAccessRefreshToken: _getAccessRefreshToken,
    getUserType: _getUserType,
    getAdminType: _getAdminType,
    getUserRoles: _getUserRoles,
    clearToken: _clearToken,
  }
})()

export default CookiesStorageService
