import request from '@/utils/request';


const url = '/inventory/managedObjects';
const device = {
  getDeviceList(params) {
    return request({
      methods: 'get',
      url,
      params,
    });
  },

  getSupportedMeasurements(deviceId, params) {
    return request({
      methods: 'get',
      url: `${url}/${deviceId}/supportedMeasurements`,
      params,
    });
  },
}
;

export default device;
