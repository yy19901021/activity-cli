import Loading from '../Loading/index.js.js'
import $ from "npm-zepto"
const baseUrl ='/activitys_api'
let count = 0
let createHttp = function (method) {
  return function (url, data: any = '', headers = {}, withLoading = true) {
    let arg = Array.prototype.slice.call(arguments, 0)
    if (arg.length < 4 && arg.length  > 1 && typeof arg[arg.length - 1] === 'boolean') {
      withLoading = arg[arg.length - 1]
    }
    return new Promise((resolve, rejects) => {
      withLoading && Loading.loading()
      withLoading && count++
      $.ajax({
        type: method,
        url: baseUrl + url,
        data: method =='GET' ? data : JSON.stringify(data),
        // headers: headers,
        // timeout: 5000,
        contentType: 'application/json',
        success: function (res) {
          resolve(res)
          withLoading && count--
        },
        error: function (err) {
          count--
          if (count === 0) {
            Loading.hideloading()
          }
          rejects(err.response)
        },
        complete: function () {
          if (count === 0) {
            Loading.hideloading()
          }
        }
      })
    })
  }
}

let http = {
  get: createHttp('GET'),
  post: createHttp('POST')
}

export default {
  getCode (phone: string) {
    return http.post('/getValiad', {phone: phone})
  },
  getSdkInfor(url) {
    return http.get('/getSign?url=' + encodeURIComponent(url), false)
  },
  getUserNum () {
    return http.get('/getUserNum')
  },
  getUserNumWithBase () {
    return http.get('/getUserModi')
  },
  appendActivity (data) {
    return http.post('/adduser', data)
  },
  shareWx () {
    return http.post('/share', false)
  },
  getActivityTime (key) {
    return http.get('/getSysParam', {key: key})
  },
  // 9号线online
  getOnlineNum () {
    return http.get('/getUserModi')
  },
  getUserStamps (userId) {
    return http.post('/queryUserStamp', {userId: userId})
  },
  getStations () {
    return http.post('/stationQuery')
  },
  mark (data) {
    return http.post('/mark', data,  false)
  },
  getStamp (data) {
    return http.post('/getStamp', data, false)
  },
  getParamsList () {
    return http.post('/sysParmList', {"page":1,"limit":100},  false)
  },
  getShareStamp(data) {
    return http.post('/getShareStamp', data)
  },
  transformStamp (data) {
    return http.post('/chargeCommonStamp', data)
  },
  getPrize (data) {
    return http.post('/getPrize', data, false)
  },
  getUserPrize (userId) {
    return http.post('/queryUserPrize', {userId})
  },
  getAd (data = {}) {
    return http.post('/advMark', data, false)
  },
  getMarkCount (userId) {
    return http.post('/getMarkCount', {userId})
  },
  addUserWithoutCode (phone) {
    return http.post('/adduserD', {phone}, false)
  },
  getPath(startStation:string, endStation:string) {
    return http.post('/getPath', {startStation, endStation})
  }
}