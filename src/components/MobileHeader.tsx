import React, { useState, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { candidatesData } from "../data/candidatesData";

// 정당 로고나 후보 이미지를 위한 상수 정의
const CANDIDATE_IMAGES = {
  leejaemyung: "/images/leejaemyung.png",
  kimmoonsu: "/images/kimmoonsu.png",
  leejunsuk: "/images/leejunsuk.png",
};

// FallbackIcon 컴포넌트 - 이미지가 없는 경우 대체할 아이콘
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

interface MobileHeaderProps {
  selectedCandidate: string;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  onCandidateChange: (candidateId: string) => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({
  selectedCandidate,
  mobileMenuOpen,
  setMobileMenuOpen,
  onCandidateChange,
}) => {
  // 내부 상태와 외부 상태 동기화
  useEffect(() => {
    // mobileMenuOpen 상태가 변경되면 내부적으로도 반영
  }, [mobileMenuOpen]);

  // Find the currently selected candidate
  const currentCandidate = candidatesData.find(
    (candidate) => candidate.id === selectedCandidate
  );

  return (
    <div className="bg-white shadow-md px-4 py-3 sticky top-0 z-10">
      <div className="relative">
        {/* 헤더 버튼 */}
        <button
          className="w-full flex justify-between items-center py-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
        >
          <div className="flex items-center gap-2">
            {currentCandidate && (
              <CandidateAvatar
                id={currentCandidate.id}
                name={currentCandidate.name}
                color={currentCandidate.color}
              />
            )}
            <span className="font-medium">{currentCandidate?.name}</span>
          </div>
          <ChevronDownIcon
            className={`${
              mobileMenuOpen ? "transform rotate-180" : ""
            } h-5 w-5 text-gray-500 transition-transform duration-200`}
          />
        </button>

        {/* 드롭다운 메뉴 */}
        {mobileMenuOpen && (
          <div className="pt-2 pb-1">
            <div className="space-y-1">
              {candidatesData.map((candidate) => (
                <div
                  key={candidate.id}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                    selectedCandidate === candidate.id
                      ? "bg-gray-100 font-medium"
                      : ""
                  }`}
                  onClick={() => {
                    onCandidateChange(candidate.id);
                    setMobileMenuOpen(false);
                  }}
                >
                  <CandidateAvatar
                    id={candidate.id}
                    name={candidate.name}
                    color={candidate.color}
                  />
                  <span>{candidate.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileHeader;
