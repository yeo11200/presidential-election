import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { candidatesData } from "../data/candidatesData";

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/`;

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// GET 요청
export async function apiGet<T = any>(
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> {
  return api.get<T>(url, config);
}

// POST 요청
export async function apiPost<T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> {
  return api.post<T>(url, data, config);
}

// 영문 ID로 한글 이름 찾기
export function getCandidateNameById(id: string) {
  const found = candidatesData.find((c) => c.id === id);
  return found ? found.name : undefined;
}
