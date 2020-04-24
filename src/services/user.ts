import request from '@/utils/request';
import {baseURL} from "../../config/constants";

export async function query(): Promise<any> {
  return request('/api/users');
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}

export async function queryCurrent(userid: string): Promise<any> {
  return request(`${baseURL}/api/getBasciInfo?userid=${userid}`);
}

export async function updateUserInfo(payload: object) {
  return request(`${baseURL}/api/updateBasicInfo`, {
    method: 'POST',
    data: payload,
  });
}

export async function getBreakInfo() {
  return request(`${baseURL}/api/getBreakinfo`);
}

export async function addBreakInfo(payload: object){
  return request(`${baseURL}/api/addBreakinfo`, {
    method: 'POST',
    data: payload,
  });
}


export async function getLampInfo() {
  return request(`${baseURL}/api/getLightData`);
}

export async function getThreshold() {
  return request(`${baseURL}/api/getLightThreshold`);
}

export async function updateThreshold(payload: object){
  return request(`${baseURL}/api/updateLightThreshold`, {
    method: 'POST',
    data: payload,
  });
}

export async function updateLightStatus(payload: object){
  return request(`${baseURL}/api/updateLightStatus`, {
    method: 'POST',
    data: payload,
  });
}
