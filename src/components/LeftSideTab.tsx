import React, { useState } from "react";
import { candidatesData } from "../data/candidatesData";

// 정당 로고나 후보 이미지를 위한 상수 정의
const CANDIDATE_IMAGES = {
  leejaemyung: "/images/leejaemyung.png", // 이미지 파일이 없으면 나중에 수정 필요
  kimmoonsu: "/images/kimmoonsu.png",
  leejunsuk: "/images/leejunsuk.png",
};

// 이미지가 없는 경우 대체할 fallback 아이콘 컴포넌트
const FallbackIcon = ({ name, color }: { name: string; color: string }) => {
  const initial = name.charAt(0);
  return (
    <div
      className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
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
}: {
  id: string;
  name: string;
  color: string;
}) => {
  const [imageError, setImageError] = useState(false);
  const imagePath = CANDIDATE_IMAGES[id as keyof typeof CANDIDATE_IMAGES];

  if (imageError || !imagePath) {
    return <FallbackIcon name={name} color={color} />;
  }

  return (
    <img
      src={imagePath}
      alt={name}
      className="w-6 h-6 rounded-full object-cover"
      onError={() => setImageError(true)}
    />
  );
};

interface LeftSideTabProps {
  selectedCandidate: string;
  onCandidateChange: (candidateId: string) => void;
}

const LeftSideTab: React.FC<LeftSideTabProps> = ({
  selectedCandidate,
  onCandidateChange,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <h2 className="text-xl font-bold mb-4">후보 목록</h2>
      <div className="space-y-2">
        {candidatesData.map((candidate) => {
          const isActive = selectedCandidate === candidate.id;

          return (
            <div
              key={candidate.id}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 ${
                isActive
                  ? "text-white shadow-md"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
              onClick={() => onCandidateChange(candidate.id)}
              style={isActive ? { backgroundColor: candidate.color } : {}}
            >
              {/* 후보 프로필 이미지 또는 fallback 아이콘 */}
              <CandidateAvatar
                id={candidate.id}
                name={candidate.name}
                color={candidate.color}
              />

              <span className="text-sm font-medium">{candidate.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeftSideTab;
