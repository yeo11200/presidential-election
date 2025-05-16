import React from "react";
import { Policy } from "../data/candidatesData";
import PolicyRadarChart from "./PolicyRadarChart";

interface PolicyDetailProps {
  policy: Policy;
  candidateColor: string;
  onClose: () => void;
}

const PolicyDetail: React.FC<PolicyDetailProps> = ({
  policy,
  candidateColor,
  onClose,
}) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        // 배경 클릭 시 닫기
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-xl max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto animate-fadeIn">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <span
              className="inline-block px-3 py-1 text-sm font-medium rounded-full text-white"
              style={{ backgroundColor: candidateColor }}
            >
              {policy.category}
            </span>
            <h2 className="text-xl font-bold">{policy.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="닫기"
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

        <p className="text-gray-600 mb-6 text-lg">{policy.summary}</p>

        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="flex-1 overflow-y-auto max-h-[400px] pr-1">
            {/* 목표 */}
            {policy.goal && policy.goal.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <span
                    className="inline-block w-2 h-2 rounded-full mr-2"
                    style={{ backgroundColor: candidateColor }}
                  />
                  목표
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg text-gray-700">
                  <ul className="list-disc pl-5 space-y-1">
                    {policy.goal.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* 이행방법 */}
            {policy.methods && policy.methods.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <span
                    className="inline-block w-2 h-2 rounded-full mr-2"
                    style={{ backgroundColor: candidateColor }}
                  />
                  이행방법
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg text-gray-700">
                  <ul className="list-disc pl-5 space-y-1">
                    {policy.methods.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* 이행기간 */}
            {policy.period && policy.period.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <span
                    className="inline-block w-2 h-2 rounded-full mr-2"
                    style={{ backgroundColor: candidateColor }}
                  />
                  이행기간
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg text-gray-700">
                  <ul className="list-disc pl-5 space-y-1">
                    {policy.period.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* 재원조달방안 */}
            {policy.fundingPlan && policy.fundingPlan.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <span
                    className="inline-block w-2 h-2 rounded-full mr-2"
                    style={{ backgroundColor: candidateColor }}
                  />
                  재원조달방안
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg text-gray-700">
                  <ul className="list-disc pl-5 space-y-1">
                    {policy.fundingPlan.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div className="md:w-64 flex-shrink-0">
            <h3 className="text-lg font-semibold mb-3">정책 평가</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <PolicyRadarChart policy={policy} color={candidateColor} />

              <div className="grid grid-cols-1 gap-3 mt-4">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">효과력</span>
                    <span
                      className="font-bold"
                      style={{ color: candidateColor }}
                    >
                      {policy.attack}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                    <div
                      className="h-2.5 rounded-full"
                      style={{
                        width: `${policy.attack}%`,
                        backgroundColor: candidateColor,
                      }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">비용</span>
                    <span
                      className="font-bold"
                      style={{ color: candidateColor }}
                    >
                      {policy.cost}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                    <div
                      className="h-2.5 rounded-full"
                      style={{
                        width: `${policy.cost}%`,
                        backgroundColor: candidateColor,
                      }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">리스크</span>
                    <span
                      className="font-bold"
                      style={{ color: candidateColor }}
                    >
                      {policy.risk}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                    <div
                      className="h-2.5 rounded-full"
                      style={{
                        width: `${policy.risk}%`,
                        backgroundColor: candidateColor,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default PolicyDetail;
