import axios from "axios";
import storageService from "../services/storage";
const baseUrl = "/api/blogs";

const headers = {
  Authorization: storageService.loadUser()
    ? `Bearer ${storageService.loadUser().token}`
    : null,
};

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const create = async (object) => {
  const request = await axios.post(baseUrl, object, { headers });
  return request.data;
};

const update = async (object) => {
  const obj = {
    title: object.title,
    likes: object.likes+1,
    url : object.url,
    author : object.author
  }
  const request = await axios.put(`${baseUrl}/${object.id}`, obj, {
    headers,
  });
  return request.data;
};

const remove = async (id) => {
  await axios.delete(`${baseUrl}/${id}`, { headers });
};

export default { getAll, create, update, remove };
