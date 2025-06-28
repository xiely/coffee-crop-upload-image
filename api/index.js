import request from '@/utils/request'

export function login(data) {
    return request({
        url: '/gw/v1/user/login/login',
        method:'post',
        headers: {
            isToken: false
        },
        data:{
            data: data
        }
    })
}
export function checkCode(data) {
    return request({
      url: '/gw/v1/uploadImage',
      method: 'post',
      data: data
    })
  }
export function uploadFile(data) {
    return request({
      url: '/api/ota/software',
      method: 'post',
      data: data
    })
  }

  export function putFile(data) {
    return request({
      url: '/api/ota/software',
      method: 'put',
      data: data
    })
  }

  export function fileList(data) {
    return request({
      url: '/api/ota/software',
      method: 'get',
      data: data
    })
  }

export function deleteFile(id) {
    return request({
      url: `/api/ota/software/${id}`,
      method: 'delete'
    })
  }