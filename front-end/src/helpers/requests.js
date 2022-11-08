import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

const instace = axios.create({
  baseURL: BASE_URL,
});

export const post = async (endpoint, body) => {
  const { data } = await instace.post(endpoint, body);
  return data;
};

export const getAll = async (endpoint) => {
  const { data } = await instace.get(endpoint);
  return data;
};

export const get = async (endpoint, body) => {
  const { data } = await instace.get(endpoint, body);
  return data;
};

export const put = async (endpoint, body, token) => {
  const { data } = await instace.put(endpoint, body, {
    headers: { Authorization: token },
  });
  return data;
};

export default instace;
