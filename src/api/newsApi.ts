import { apiGet, apiPost } from "./api";
import { candidatesData } from "../data/candidatesData";

// 영문 ID로 한글 이름 찾기
export function getCandidateNameById(id: string): string {
  const found = candidatesData.find((c) => c.id === id);
  return found ? found.name : "";
}

// 한글 이름으로 영문 ID 찾기
export function getCandidateIdByName(name: string): string | undefined {
  const found = candidatesData.find((c) => c.name === name);
  return found ? found.id : undefined;
}

// 전체 뉴스 목록 조회
export const fetchNews = (params?: {
  limit?: number;
  sentiment?: "positive" | "neutral" | "negative";
}) =>
  apiGet("/news", {
    params,
  });

// 특정 후보 뉴스 조회 (ID 사용)
export const fetchCandidateNews = (
  candidateId: string,
  params?: {
    limit?: number;
    sentiment?: "positive" | "neutral" | "negative";
  }
) =>
  apiGet(`/news/candidate/${candidateId}`, {
    params,
  });

// 키워드로 뉴스 검색
export const searchNewsByKeyword = (
  keyword: string,
  params?: {
    candidate?: string;
    limit?: number;
    sentiment?: "positive" | "neutral" | "negative";
  }
) =>
  apiGet("/news/search", {
    params: { keyword, ...params },
  });

// 감성 통계 조회
export const fetchSentimentStats = () => apiGet("/sentiment-stats");

// 네이버 후보 뉴스 검색
export const searchNaverCandidateNews = (
  candidate: string,
  params?: {
    page?: number;
    size?: number;
  }
) =>
  apiGet("/search/candidate", {
    params: { candidate, ...params },
  });

// 네이버 일반 검색
export const searchNaver = (
  query: string,
  params?: {
    type?: string;
    page?: number;
    size?: number;
    sort?: string;
  }
) =>
  apiGet("/search", {
    params: { query, ...params },
  });

// (예시) 수동 스크래핑 트리거
export const triggerScrape = () => apiPost("/trigger-scrape");
