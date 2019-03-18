import request from '@/utils/request';


const url = '/inventory/managedObjects';
const supported = {
  getSupportedList(params) {
    return request({
      methods: 'get',
      url,
      params,
    });
  },
}
;

export default supported;
