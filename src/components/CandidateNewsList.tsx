import React, { useEffect, useState } from "react";
import { getCandidateNameById } from "../api/newsApi";
import { fetchCandidateNews } from "../api/newsApi";

interface CandidateNewsListProps {
  candidateId: string;
  setNewsCount?: (count: number) => void;
}

const CandidateNewsList: React.FC<CandidateNewsListProps> = ({
  candidateId,
  setNewsCount,
}) => {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const name = getCandidateNameById(candidateId) || ""; // "이재명"

    setLoading(true);
    fetchCandidateNews(name)
      .then((res) => {
        // API 응답 구조에 맞게 파싱
        const newsData = res.data.data;
        const newsItems = newsData.news || [];
        const count = newsData.count || newsItems.length;

        setNews(newsItems);

        // 뉴스 개수를 부모 컴포넌트로 전달
        if (setNewsCount) {
          setNewsCount(count);
        }
      })
      .catch((err) => {
        console.error("뉴스를 불러오는 중 오류가 발생했습니다:", err);
        setNews([]);
      })
      .finally(() => setLoading(false));
  }, [candidateId, setNewsCount]);

  // 로딩 스피너 컴포넌트
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-blue-600 animate-spin mb-4"></div>
        <p className="text-gray-600 font-medium">뉴스를 불러오고 있습니다</p>
        <p className="text-gray-400 text-sm mt-1">잠시만 기다려 주세요...</p>
      </div>
    );
  }

  // 빈 상태 컴포넌트
  if (!news.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-gray-300 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
          />
        </svg>
        <h3 className="text-lg font-semibold text-gray-700 mb-1">
          뉴스가 없습니다
        </h3>
        <p className="text-gray-500 text-center max-w-md">
          현재 불러올 수 있는 뉴스 데이터가 없습니다.
          <br />
          다른 후보자를 선택하거나 나중에 다시 시도해주세요.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {news.map((item, idx) => (
        <div
          key={item.id || idx}
          className="p-4 bg-white rounded-lg shadow flex flex-col gap-2 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-1 rounded text-xs font-bold ${
                item.sentiment === "positive"
                  ? "bg-green-100 text-green-700"
                  : item.sentiment === "negative"
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {item.sentiment === "positive"
                ? "긍정"
                : item.sentiment === "negative"
                ? "부정"
                : "중립"}
            </span>
            <span className="text-xs text-gray-400">
              {item.published_at ? item.published_at.slice(0, 10) : ""}
            </span>
          </div>
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold hover:underline"
            dangerouslySetInnerHTML={{ __html: item.title }}
          />

          <div className="text-sm text-gray-600">
            {item.summary || item.content}
          </div>
          {item.link && (
            <div className="mt-2 text-right">
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:underline inline-flex items-center"
              >
                원문 보기
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CandidateNewsList;
