import React from "react";
import { Policy } from "../data/candidatesData";
import PolicyRadarChart from "./PolicyRadarChart";
import { PolicyMetricsHelpButton } from "./PolicyMetricsGuide";

interface PolicyCardProps {
  policy: Policy;
  candidateColor: string;
}

const PolicyCard: React.FC<PolicyCardProps> = ({ policy, candidateColor }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 mb-6 hover:shadow-lg hover:scale-[1.01] transition cursor-pointer">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center mb-2 gap-2">
            <span
              className="inline-block px-2 py-1 text-xs font-medium rounded-full text-white whitespace-nowrap max-w-[120px] overflow-hidden text-ellipsis"
              style={{ backgroundColor: candidateColor }}
            >
              {policy.category}
            </span>
            <h3 className="font-bold text-lg break-words">{policy.title}</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">{policy.summary}</p>

          <div className="grid grid-cols-3 gap-2 text-sm">
            <div>
              <div className="flex items-center gap-1 text-gray-500">
                <span>효과력</span>
              </div>
              <div className="font-semibold">{policy.attack}%</div>
            </div>
            <div>
              <span className="text-gray-500">비용</span>
              <div className="font-semibold">{policy.cost}%</div>
            </div>
            <div>
              <span className="text-gray-500">리스크</span>
              <div className="font-semibold">{policy.risk}%</div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-48 flex-shrink-0">
          <PolicyRadarChart policy={policy} color={candidateColor} />
        </div>
      </div>
    </div>
  );
};

export default PolicyCard;
