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
  /* 
  带d:https://xiayuanchun.quarkioe.cn/inventory/managedObjects/166143/supportedSeries?nocache=7782224025605737 
  不带d:https://xiayuanchun.quarkioe.cn/inventory/managedObjects/166143/supportedMeasurements?nocache=11445009626240443
  */
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
