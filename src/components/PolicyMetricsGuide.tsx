import React, { useState } from "react";

// 지표 설명 데이터
const metricsExplanations = {
  attack: {
    title: "효과력",
    description: "정책이 끼치는 전국적 영향력, 구조적 파급력",
    levels: [
      { range: "90 이상", description: "국가 구조 변화, 법/행정 체계 전환급" },
      { range: "70~89", description: "전국 단위 산업·교육 등 대중적인 영향" },
      { range: "50~69", description: "특정 세대·계층·지역에 혜택" },
      { range: "30~49", description: "조건부 적용, 시범사업" },
      { range: "0~29", description: "캠페인형, 상징적 메시지" },
    ],
  },
  cost: {
    title: "비용",
    description: "국가 예산 투입, 시스템 구축, 운영비 등 고려",
    levels: [
      {
        range: "90 이상",
        description: "수십조 단위, 구조 개편 + 기반 시설 필요",
      },
      { range: "70~89", description: "조 단위 예산, 제도 전환" },
      { range: "50~69", description: "수천억 ~ 1조 미만" },
      { range: "30~49", description: "수백억 규모, 기존 시스템 보완" },
      { range: "0~29", description: "거의 예산 없음, 행정적 조치" },
    ],
  },
  risk: {
    title: "리스크",
    description: "사회적 갈등, 실현 가능성, 저항 가능성",
    levels: [
      { range: "90 이상", description: "강한 정치적/사회적 반대 예상" },
      { range: "70~89", description: "입법 난이도 높음, 노조/이익집단 저항" },
      { range: "50~69", description: "기술적 난이도, 제도 불안정성" },
      { range: "30~49", description: "시행에 일부 조율 필요" },
      { range: "0~29", description: "무난하게 수용될 수 있음" },
    ],
  },
};

interface PolicyMetricsGuideProps {
  onClose: () => void;
}

const PolicyMetricsGuide: React.FC<PolicyMetricsGuideProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-md w-full p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">정책 평가 지표 가이드</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          {Object.entries(metricsExplanations).map(([key, metric]) => (
            <div key={key} className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-bold text-lg mb-1">{metric.title}</h3>
              <p className="text-gray-600 mb-3">{metric.description}</p>

              <div className="space-y-2">
                {metric.levels.map((level, index) => (
                  <div key={index} className="flex">
                    <span className="font-medium min-w-[70px]">
                      {level.range}:
                    </span>
                    <span className="text-gray-700">{level.description}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

// 작은 버튼 컴포넌트
export const PolicyMetricsHelpButton: React.FC = () => {
  const [showGuide, setShowGuide] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowGuide(true)}
        className="inline-flex items-center justify-center w-5 h-5 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 text-xs font-bold"
        title="정책 평가 지표 설명"
      >
        ?
      </button>
      {showGuide && <PolicyMetricsGuide onClose={() => setShowGuide(false)} />}
    </>
  );
};

export default PolicyMetricsGuide;
