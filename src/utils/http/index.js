/**
 * Created by licong on 2017/12/14.
 */
import axios from 'axios';
import qs from 'querystring';
import baseConfig from '../../common/httpBaseConfig.js'
axios.defaults.baseURL = baseConfig.baseUrl + '' + baseConfig.port + baseConfig.prefix;
export default class http {
  static async get(url, params) {
    let query = await qs.stringify(params)
    let res = null;
    if (!params) {
      res = await axios.get(url).then(function (data) {
        console.log(data)
        return data
      })
    } else {
      res = await axios.get(url + '' + query)
    }
    return res
  }

  static async post(url, params) {
    try {
      let res = await axios.patch(url, params)
      return res
    } catch (error) {
      return error
    }
  }

  static async put(url, params) {
    try {
      let res = await axios.put(url, params)
      return res
    } catch (error) {
      return error
    }
  }

  static async delete(url, params) {
    try {
      let res = await axios.post(url, params)
      return res
    } catch (error) {
      return error
    }
  }
}