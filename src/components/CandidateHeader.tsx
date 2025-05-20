import React, { useState } from "react";

interface CandidateHeaderProps {
  id: string;
  name: string;
  color: string;
  titleType: "정책" | "뉴스";
  policyCount?: number;
  categoryCount?: number;
  newsCount?: number;
}

const CANDIDATE_IMAGES = {
  leejaemyung: "/images/leejaemyung.png", // 이미지 파일이 없으면 나중에 수정 필요
  kimmoonsu: "/images/kimmoonsu.png",
  leejunsuk: "/images/leejunsuk.png",
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

const CandidateHeader: React.FC<CandidateHeaderProps> = ({
  id,
  name,
  color,
  titleType,
  policyCount,
  categoryCount,
  newsCount,
}) => (
  <div className="flex items-center mb-6">
    <CandidateAvatar id={id} name={name} color={color} size="large" />
    <div className="ml-3">
      <h1 className="text-2xl font-bold">
        {name}의 {titleType}
      </h1>
      <p className="text-sm text-gray-500">
        {titleType === "정책"
          ? `총 ${policyCount || 0}개 정책, ${categoryCount || 0}개 분야`
          : `총 ${newsCount || 0}개 뉴스`}
      </p>
    </div>
  </div>
);

export default CandidateHeader;
