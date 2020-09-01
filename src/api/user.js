import axios from "axios";

//登录
export const loginReq = (data) => {
  return axios.request({
    url: "/UserInfo/Login",
    data,
    method: "post",
  });
};
// 获取视频列表
export const getListReq = (params) => {
  return axios.request({
    url: "/VideoInfo/GetList",
    params,
    method: "get",
  });
};
// 下载视频
export const downloadVideo = (params) => {
  return axios.request({
    url: "/VideoInfo/Download",
    params,
    method: "get",
    responseType: "blob",
  });
};
// 判断是否登陆
export const getCookie = () => {
  return axios.request({
    url: "/UserInfo/GetCookieModel",
    method: "get",
  });
};
export const getList = (params) => {
  return axios.request({
    url: "/OperationInfo/GetList",
    method: "get",
    params,
  });
};
