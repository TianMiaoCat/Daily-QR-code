import request from '@/utils/request'

export function submitInfo(form) {
    return request({
      url: '/table/list',
      method: 'post',
      data: { form }
    })
  }

export function submitExcel(list) {
    return request({
        url: '',
        method: 'post',
        data: { list }
    })
}