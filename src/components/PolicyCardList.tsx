import React, { useMemo, useState, useRef, useEffect } from "react";
import { candidatesData, Policy } from "../data/candidatesData";
import PolicyCard from "./PolicyCard";
import { PolicyMetricsHelpButton } from "./PolicyMetricsGuide";

// 정당 로고나 후보 이미지를 위한 상수 정의
const CANDIDATE_IMAGES = {
  leejaemyung: "/images/leejaemyung.png",
  kimmoonsu: "/images/kimmoonsu.png",
  leejunsuk: "/images/leejunsuk.png",
};

// FallbackIcon 컴포넌트 재사용
const FallbackIcon = ({ name, color }: { name: string; color: string }) => {
  const initial = name.charAt(0);
  return (
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
      style={{ backgroundColor: color }}
    >
      {initial}
    </div>
  );
};

// 후보 아바타 컴포넌트 - 이미지 로드 실패 시 FallbackIcon 사용
const CandidateAvatar = ({
  id,
  name,
  color,
  size = "medium",
}: {
  id: string;
  name: string;
  color: string;
  size?: "small" | "medium" | "large";
}) => {
  const [imageError, setImageError] = useState(false);
  const imagePath = CANDIDATE_IMAGES[id as keyof typeof CANDIDATE_IMAGES];

  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-8 h-8",
    large: "w-10 h-10",
  };

  const sizeClass = sizeClasses[size];

  if (imageError || !imagePath) {
    return (
      <div
        className={`${sizeClass} rounded-full flex items-center justify-center text-white font-bold`}
        style={{ backgroundColor: color }}
      >
        {name.charAt(0)}
      </div>
    );
  }

  return (
    <img
      src={imagePath}
      alt={name}
      className={`${sizeClass} rounded-full object-cover`}
      onError={() => setImageError(true)}
    />
  );
};

interface PolicyCardListProps {
  selectedCandidate: string;
  resetKey?: number; // 카테고리 초기화를 위한 키 값 (옵션)
}

const PolicyCardList: React.FC<PolicyCardListProps> = ({
  selectedCandidate,
  resetKey = 0,
}) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement }>({});

  // resetKey가 변경되면 activeCategory를 null로 초기화
  useEffect(() => {
    setActiveCategory(null);
    // 페이지 최상단으로 스크롤
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [resetKey]);

  // Find the selected candidate and their policies
  const selectedCandidateData = useMemo(() => {
    return candidatesData.find(
      (candidate) => candidate.id === selectedCandidate
    );
  }, [selectedCandidate]);

  // Group policies by category
  const policiesByCategory = useMemo(() => {
    if (!selectedCandidateData) return {};

    return selectedCandidateData.policies.reduce<Record<string, Policy[]>>(
      (acc, policy) => {
        if (!acc[policy.category]) {
          acc[policy.category] = [];
        }
        acc[policy.category].push(policy);
        return acc;
      },
      {}
    );
  }, [selectedCandidateData]);

  // Count policies by category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    if (selectedCandidateData) {
      selectedCandidateData.policies.forEach((policy) => {
        counts[policy.category] = (counts[policy.category] || 0) + 1;
      });
    }
    return counts;
  }, [selectedCandidateData]);

  // 카테고리 클릭 처리
  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    const element = categoryRefs.current[category];
    if (element) {
      const yOffset = -80; // 헤더 높이 등을 고려한 오프셋
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  if (!selectedCandidateData) {
    return <div>후보자를 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <CandidateAvatar
          id={selectedCandidateData.id}
          name={selectedCandidateData.name}
          color={selectedCandidateData.color}
          size="large"
        />
        <div className="ml-3">
          <h1 className="text-2xl font-bold">
            {selectedCandidateData.name}의 정책
          </h1>
          <p className="text-sm text-gray-500">
            총 {selectedCandidateData.policies.length}개 정책,{" "}
            {Object.keys(categoryCounts).length}개 분야
          </p>
        </div>
      </div>

      {/* 정책 평가 지표 설명 */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">정책 평가 지표 안내</span>
          </div>
          <PolicyMetricsHelpButton />
        </div>
        <div className="mt-2 text-sm text-gray-600 flex flex-wrap gap-x-6 gap-y-1">
          <div>효과력: 정책 파급력과 영향 범위</div>
          <div>비용: 필요 예산 및 자원</div>
          <div>리스크: 실현 난이도 및 갈등 가능성</div>
        </div>
      </div>

      {/* 카테고리 태그 리스트 */}
      <div className="flex flex-wrap gap-2 py-3 mb-6 bg-gray-50 rounded-lg">
        {Object.entries(categoryCounts).map(([category, count]) => (
          <div
            key={category}
            className={`text-xs px-3 py-1 rounded-full cursor-pointer transition-all flex items-center ${
              activeCategory === category
                ? "text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            style={
              activeCategory === category
                ? { backgroundColor: selectedCandidateData.color }
                : {}
            }
            onClick={() => handleCategoryClick(category)}
          >
            <span className="inline-block max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">
              {category}
            </span>
            <span className="inline-block ml-1 whitespace-nowrap">
              ({count})
            </span>
          </div>
        ))}
      </div>

      {/* 카테고리별 정책 목록 */}
      {Object.entries(policiesByCategory).map(([category, policies]) => (
        <div
          key={category}
          className="mb-8"
          ref={(el) => {
            if (el) categoryRefs.current[category] = el;
          }}
          id={`category-${category}`}
        >
          <h2 className="text-lg font-bold mb-4 flex items-center">
            <span
              className="inline-block w-2 h-2 rounded-full mr-2"
              style={{ backgroundColor: selectedCandidateData.color }}
            />
            {category} 정책 ({policies.length})
          </h2>
          <div className="space-y-4">
            {policies.map((policy) => (
              <PolicyCard
                key={policy.id}
                policy={policy}
                candidateColor={selectedCandidateData.color}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PolicyCardList;
