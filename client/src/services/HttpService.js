class HttpService {
  constructor() {
    this.axios = require('axios');
  }
  setContext(appCtx) {
    this.appCtx = appCtx;
  }
  post(url, data) {
    return this.axios.post(process.env.VUE_APP_ROOT_API + url, data);
  }
  get(url) {
    return this.axios.get(process.env.VUE_APP_ROOT_API + url);
  }
  delete(url) {
    return this.axios.delete(process.env.VUE_APP_ROOT_API + url);
  }
  patch(url, data) {
    return this.axios.patch(process.env.VUE_APP_ROOT_API + url, data);
  }
  put(url, data) {
    return this.axios.put(process.env.VUE_APP_ROOT_API + url, data);
  }
}

export default new HttpService();
