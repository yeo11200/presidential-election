import React, { useState, useEffect, useMemo } from "react";
import PolicyCardList from "./PolicyCardList";
import CandidateNewsList from "./CandidateNewsList";
import CandidateHeader from "./CandidateHeader";
import CandidateVoteBox from "./CandidateVoteBox";
import { candidatesData } from "../data/candidatesData";

const CandidateMainTabs = ({
  selectedCandidate,
}: {
  selectedCandidate: string;
}) => {
  const [tab, setTab] = useState<"policy" | "news">("policy");
  const [newsCount, setNewsCount] = useState<number>(0);

  // 후보자가 변경되면 탭을 '공약'으로 초기화
  useEffect(() => {
    setTab("policy");
    setNewsCount(0);
  }, [selectedCandidate]);

  // 선택된 후보자 데이터 찾기
  const candidate = useMemo(
    () =>
      candidatesData.find((c) => c.id === selectedCandidate) ||
      candidatesData[0],
    [selectedCandidate]
  );

  // 카테고리 개수 계산
  const categoryCount = useMemo(() => {
    if (!candidate) return 0;
    return new Set(candidate.policies.map((p) => p.category)).size;
  }, [candidate]);

  return (
    <div>
      {/* 후보자 헤더 정보 */}
      <CandidateHeader
        id={candidate.id}
        name={candidate.name}
        color={candidate.color}
        titleType={tab === "policy" ? "정책" : "뉴스"}
        policyCount={candidate.policies.length}
        categoryCount={categoryCount}
        newsCount={newsCount}
      />

      {/* 모바일에서만 보이는 투표 UI */}
      <div className="md:hidden mb-4">
        <CandidateVoteBox selectedCandidateId={selectedCandidate} />
      </div>

      {/* 탭 버튼 */}
      <div className="flex border-b mb-4">
        <button
          className={`px-4 py-2 font-semibold ${
            tab === "policy"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setTab("policy")}
        >
          공약
        </button>
        <button
          className={`px-4 py-2 font-semibold ${
            tab === "news"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setTab("news")}
        >
          뉴스
        </button>
      </div>

      {/* 선택된 탭에 따라 컴포넌트 렌더링 */}
      {tab === "policy" ? (
        <PolicyCardList selectedCandidate={selectedCandidate} />
      ) : (
        <CandidateNewsList
          candidateId={selectedCandidate}
          setNewsCount={setNewsCount}
        />
      )}
    </div>
  );
};

export default CandidateMainTabs;
