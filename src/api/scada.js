import request from '@/utils/request';

const scada = {
  saveScada(url, params, data) {
    return request({
      method: 'post',
      url,
      params,
      data,
    });
  },
  getScada(url, params) {
    return request({
      method: 'get',
      url,
      params,
    });
  },
};

export default scada;
