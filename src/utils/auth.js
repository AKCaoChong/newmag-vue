const USER_KEY = "USER_KEY"
const TOKEN_KEY = "JWT_TOKEN_KEY"
const SCOPES = ["snsapi_base","snsapi_userinfo"]
const USER_ID = "USER_ID"
const A_ID = "A_ID"
const OPEN_ID = "OPEN_ID"

class Auth {
  install(Vue,options){
      let auth = this
      console.log(options)
      this.setAppId(options.appid)
      this.scope = SCOPES[options.scope ? 1 :0]
      Vue.mixin({
          created(){
              this.$auth = auth
          }
      })
  }

  constructor() {
    this.appid = null
    this.redirectUri = null
    this.scope = null
    this._code = null
    this._redirectUri = null

    this.token = null
    this.user = null
    this.token = localStorage.getItem(TOKEN_KEY)
    const userJson = localStorage.getItem(USER_KEY)
    if (userJson) {
      this.user = JSON.parse(userJson)
    }
  }

  static makeState(){
      return(
          Math.random().toString(36).substring(2,15) + Math.random().toString(36).substring(2,15)
      )
  }

  setAppId(appid){
    this.appid = appid
  }

  set redirectUri(redirectUri){

      console.log(redirectUri)
      this._redirectUri = encodeURIComponent(redirectUri)
  }

  get redirectUri(){
      return this._redirectUri
  }

  set state(state){
    localStorage.setItem("wechat_auth:state",state)
  }

  get state(){
    return localStorage.getItem("wechat_auth:state")
  }

  get authUrl(){
      if(this.appid == null){
          throw new Error('appid must not be null')
      }
      if(this.redirectUri == null){
          throw new Error('redirect uri must not be null')
      }
      this.state = Auth.makeState()
      return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.appid}&redirect_uri=${this.redirectUri}&response_type=code&scope=${this.scope}&state=${this.state}#wechat_redirect`
  }

  returnFromWechat(redirectUri){
      let parseUrl = this.$qs.parse(redirectUri.split('?')[1])
      if(process.env.NODE_ENV === 'development'){
          this.state = null
          this._code = parseUrl.code
      }else{
          if(this.state === null){
              throw new Error("You didn't set state")
          }
          if(parseUrl.state.replace('#/','') === this.state){
              this.state = null
              this._code = parseUrl.code
          }else{
              this.state = null
              throw new Error('Wrong state: ${parseUrl.state}')
          }
      }
  }

  get code(){
      console.log('code', this._code)
      if(this._code === null){
          throw new Error('Not get the code from wechat server!')
      }
      const code = this._code
      this._code = null
      return code
  }

  static getInstance() {
    if (!this._instance) {
      this._instance = new Auth()
    }
    return this._instance
  }

  setUserToken(user, token) {
    this.user = user
    this.token = token
    localStorage.setItem(USER_KEY, JSON.stringify(user))
    localStorage.setItem(TOKEN_KEY, token)
  }

  clearUserToken() {
    this.user = null;
    this.token = null;
    localStorage.removeItem(USER_KEY)
    localStorage.removeItem(TOKEN_KEY)
  }

  setUserId(uid){
    console.log(uid)
    localStorage.setItem(USER_ID, uid)
  }

  getUserId(){
      console.log(localStorage.getItem(USER_ID))
      return localStorage.getItem(USER_ID)
  }

  setOpenId(openid){
    console.log(openid)
    localStorage.setItem(OPEN_ID, openid)
  }

  getOpenId(){
    console.log(localStorage.getItem(OPEN_ID))
      return localStorage.getItem(OPEN_ID)
  }

  setAid(aid){
    console.log(aid)
    localStorage.setItem(A_ID, aid)
  }

  getAid(){
    console.log(localStorage.getItem(A_ID))
      return localStorage.getItem(A_ID)
  }

  get is_authed() {
    if (this.user && this.token) {
      return true
    } else {
      return false
    }
  }
}


export default Auth.getInstance()
