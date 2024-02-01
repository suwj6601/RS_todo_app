import axios from 'axios';

const API_TIMEOUT = 10000;
const BASE_ENDPOINT = 'http://localhost:3004';

const api = async (method = 'get', url, requestBody?: any, params?: any) => {
  try {
    const res = await axios({
      method,
      url: BASE_ENDPOINT + url,
      data: requestBody,
      params,
      timeout: API_TIMEOUT,
    });

    return res?.data;
  } catch (error: any) {
    return { error: error?.response?.data?.message };
  }
};

export default api;
