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
  /* https://xiayuanchun.quarkioe.cn/inventory/managedObjects/166143/supportedSeries?nocache=7782224025605737 */
  getSupportedMeasurements(deviceId, params) {
    return request({
      methods: 'get',
      url: `${url}/${deviceId}/supportedSeries`,
      params,
    });
  },
}
;

export default device;
