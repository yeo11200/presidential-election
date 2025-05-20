import React, { useState, useEffect, useRef } from "react";
import { candidatesData } from "../data/candidatesData";
import { apiGet, apiPost, api } from "../api/api";

// 로컬 스토리지 키
const VOTE_STORAGE_KEY = "presidential_vote";
const VOTE_ID_KEY = "presidential_vote_id";

interface VoteStats {
  [key: string]: number; // 후보 ID: 투표 수
}

interface VoteResponse {
  data: {
    total: number;
    candidates: {
      [key: string]: number; // 후보 ID: 투표 수
    };
  };
}

interface HasVotedResponse {
  data: {
    has_voted: boolean;
  };
}

interface CandidateVoteBoxProps {
  selectedCandidateId: string;
}

const CandidateVoteBox: React.FC<CandidateVoteBoxProps> = ({
  selectedCandidateId,
}) => {
  // 투표 상태 관리
  const [voteStats, setVoteStats] = useState<VoteStats>({});
  const [votedFor, setVotedFor] = useState<string | null>(null);
  const [totalVotes, setTotalVotes] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelCandidateId, setCancelCandidateId] = useState<string | null>(
    null
  );

  // API 호출 중복 방지를 위한 ref
  const dataFetchedRef = useRef(false);
  const lastVoteActionRef = useRef<string | null>(null);

  // 고유 ID 생성 또는 가져오기 (중복 투표 방지)
  const getUserId = () => {
    let userId = localStorage.getItem(VOTE_ID_KEY);
    if (!userId) {
      userId = crypto.randomUUID();
      localStorage.setItem(VOTE_ID_KEY, userId);
    }
    return userId;
  };

  // 투표 여부 확인
  const checkIfUserHasVoted = async () => {
    // 이미 처리 중인 경우 중복 요청 방지
    if (lastVoteActionRef.current === "checking") {
      return;
    }

    lastVoteActionRef.current = "checking";
    const userId = getUserId();

    try {
      const response = await apiGet<HasVotedResponse>("vote/has-voted-any", {
        headers: {
          "x-user-id": userId,
        },
      });

      // 응답 구조가 { data: { has_voted: true } }
      if (response.data.data.has_voted) {
        // 투표한 경우 - 어떤 후보인지 알 수 없으므로 로컬 스토리지 참조
        const storedVote = localStorage.getItem(VOTE_STORAGE_KEY);
        if (storedVote) {
          setVotedFor(storedVote);
        }
      } else {
        // 투표하지 않은 경우 로컬 상태와 스토리지 초기화
        setVotedFor(null);
        localStorage.removeItem(VOTE_STORAGE_KEY);
      }
    } catch (error) {
      console.error("투표 여부 확인 오류:", error);
      // API 오류 시 로컬 스토리지에 의존
      const storedVote = localStorage.getItem(VOTE_STORAGE_KEY);
      if (storedVote) {
        setVotedFor(storedVote);
      }
    } finally {
      // 상태 초기화
      lastVoteActionRef.current = null;
    }
  };

  // 투표 통계 데이터 가져오기
  const fetchVoteStats = async () => {
    try {
      // 이미 처리 중인 경우 중복 요청 방지
      if (lastVoteActionRef.current === "fetching") {
        return;
      }

      lastVoteActionRef.current = "fetching";
      const response = await apiGet<VoteResponse>("vote/stats/candidates");
      lastVoteActionRef.current = null;

      // 응답 구조가 { data: { total: 2, candidates: { ... } } }
      setVoteStats(response.data.data.candidates || {});
      setTotalVotes(response.data.data.total || 0);
    } catch (error) {
      console.error("투표 통계 로딩 오류:", error);
      // 오류 시 기본 더미 데이터 사용
      const fallbackStats = {
        leejaemyung: 1,
        kimmoonsu: 1,
        shin: 1,
      };
      setVoteStats(fallbackStats);
      setTotalVotes(Object.values(fallbackStats).reduce((a, b) => a + b, 0));
      lastVoteActionRef.current = null;
    }
  };

  // 투표 통계 요약 정보
  const getVoteStatsSummary = () => {
    // 총 투표수
    const total = totalVotes;

    // 각 후보별 투표 수와 비율
    const candidateStats = candidatesData.map((candidate) => ({
      id: candidate.id,
      name: candidate.name,
      votes: voteStats[candidate.id] || 0,
      percentage: getVotePercentage(candidate.id),
    }));

    // 투표율 순으로 정렬
    const sortedStats = candidateStats.sort(
      (a, b) => b.percentage - a.percentage
    );

    return {
      total,
      candidates: sortedStats,
    };
  };

  // 컴포넌트 마운트 시 한 번만 데이터 로드
  useEffect(() => {
    // React Strict Mode로 인한 중복 실행 방지
    if (dataFetchedRef.current) return;

    // 데이터 로드 플래그 설정 (즉시 설정하여 동일 렌더 사이클에서의 중복 호출 방지)
    dataFetchedRef.current = true;

    const loadInitialData = async () => {
      setIsLoading(true);

      try {
        // 이미 진행 중인 API 호출이 있는지 확인
        if (lastVoteActionRef.current) return;

        // 병렬로 API 호출 (Promise.all 사용)
        await Promise.all([
          // 클로저로 함수 래핑하여 API 호출 분리
          (async () => {
            if (lastVoteActionRef.current !== "checking") {
              lastVoteActionRef.current = "checking";
              try {
                const userId = getUserId();
                const response = await apiGet<HasVotedResponse>(
                  "vote/has-voted-any",
                  {
                    headers: {
                      "x-user-id": userId,
                    },
                  }
                );

                if (response.data.data.has_voted) {
                  const storedVote = localStorage.getItem(VOTE_STORAGE_KEY);
                  if (storedVote) {
                    setVotedFor(storedVote);
                  }
                } else {
                  setVotedFor(null);
                  localStorage.removeItem(VOTE_STORAGE_KEY);
                }
              } finally {
                if (lastVoteActionRef.current === "checking") {
                  lastVoteActionRef.current = null;
                }
              }
            }
          })(),

          // 투표 통계 API 호출 분리
          (async () => {
            if (lastVoteActionRef.current !== "fetching") {
              lastVoteActionRef.current = "fetching";
              try {
                const response = await apiGet<VoteResponse>(
                  "vote/stats/candidates"
                );
                setVoteStats(response.data.data.candidates || {});
                setTotalVotes(response.data.data.total || 0);
              } catch (error) {
                console.error("투표 통계 로딩 오류:", error);
                const fallbackStats = {
                  leejaemyung: 1,
                  kimmoonsu: 1,
                  shin: 1,
                };
                setVoteStats(fallbackStats);
                setTotalVotes(
                  Object.values(fallbackStats).reduce((a, b) => a + b, 0)
                );
              } finally {
                if (lastVoteActionRef.current === "fetching") {
                  lastVoteActionRef.current = null;
                }
              }
            }
          })(),
        ]);
      } catch (error) {
        console.error("데이터 로드 오류:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // 즉시 초기 데이터 로드 시작
    loadInitialData();

    // 컴포넌트 언마운트 시 플래그 초기화
    return () => {
      dataFetchedRef.current = false;
    };
  }, []);

  // 투표 취소 모달 표시
  const showCancelConfirmation = (candidateId: string) => {
    if (!votedFor || votedFor !== candidateId) return;
    setCancelCandidateId(candidateId);
    setShowCancelModal(true);
  };

  // 투표 취소 함수
  const handleCancelVote = async () => {
    if (!cancelCandidateId || lastVoteActionRef.current) return;

    setIsAnimating(true);
    lastVoteActionRef.current = "canceling";
    const userId = getUserId();

    try {
      // DELETE API 호출로 투표 취소
      await api.delete(`vote/candidate/${cancelCandidateId}`, {
        headers: {
          "x-user-id": userId,
        },
      });

      // 로컬 스토리지에서 투표 정보 삭제
      localStorage.removeItem(VOTE_STORAGE_KEY);

      // 로컬 상태 업데이트 (API 호출 없이 먼저 UI 업데이트)
      const newStats = { ...voteStats };
      if (newStats[cancelCandidateId] && newStats[cancelCandidateId] > 0) {
        newStats[cancelCandidateId] = newStats[cancelCandidateId] - 1;
      }
      setVoteStats(newStats);
      setTotalVotes(Math.max(0, totalVotes - 1));
      setVotedFor(null);

      // 투표 취소 후 통계만 가져오기
      await fetchVoteStats();
    } catch (error) {
      console.error("투표 취소 오류:", error);
      alert("투표 취소 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setShowCancelModal(false);
      setCancelCandidateId(null);
      setTimeout(() => {
        setIsAnimating(false);
        lastVoteActionRef.current = null;
      }, 700);
    }
  };

  // 후보에게 투표하는 함수
  const handleVote = async (candidateId: string) => {
    // 이미 투표한 경우, 같은 후보를 클릭하면 취소 처리
    if (votedFor === candidateId) {
      showCancelConfirmation(candidateId);
      return;
    } else if (votedFor || lastVoteActionRef.current) {
      // 다른 후보에게 이미 투표한 경우 또는 진행 중인 작업이 있는 경우
      return;
    }

    setIsAnimating(true);
    lastVoteActionRef.current = "voting";
    const userId = getUserId();

    try {
      // 실제 API 호출
      await apiPost(
        "vote/candidate",
        {
          candidate_id: candidateId,
          vote_type: true,
        },
        {
          headers: {
            "x-user-id": userId,
          },
        }
      );

      // 로컬 스토리지에 투표 저장
      localStorage.setItem(VOTE_STORAGE_KEY, candidateId);

      // 로컬 상태 업데이트 (API 호출 없이 먼저 UI 업데이트)
      const newStats = { ...voteStats };
      newStats[candidateId] = (newStats[candidateId] || 0) + 1;
      setVoteStats(newStats);
      setTotalVotes(totalVotes + 1);
      setVotedFor(candidateId);

      // 투표 후 통계만 가져오기
      await fetchVoteStats();
    } catch (error) {
      console.error("투표 제출 오류:", error);
      alert("투표를 처리하는 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setTimeout(() => {
        setIsAnimating(false);
        lastVoteActionRef.current = null;
      }, 700);
    }
  };

  // 각 후보의 투표 비율 계산
  const getVotePercentage = (candidateId: string) => {
    if (totalVotes === 0) return 0;
    return Math.round(((voteStats[candidateId] || 0) / totalVotes) * 1000) / 10;
  };

  // 투표 통계 정보 가져오기
  const voteStatsSummary = getVoteStatsSummary();

  if (isLoading) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 shadow-md flex justify-center items-center py-12">
        <div className="text-center text-gray-500">
          <svg
            className="animate-spin h-8 w-8 mx-auto mb-2 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p>투표 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 shadow-md">
        {votedFor && (
          <p className="text-center text-green-600 mb-3 text-sm font-medium">
            ✅ 투표 완료
          </p>
        )}

        <div className="space-y-3">
          {candidatesData.map((candidate) => {
            const percentage = getVotePercentage(candidate.id);
            const isVoted = votedFor === candidate.id;
            const isNotVotedYet = !votedFor;
            const barWidth = `${percentage}%`;

            return (
              <div
                key={candidate.id}
                className={`rounded-lg transition-all ${
                  isVoted
                    ? `border-2 border-${candidate.color} shadow-md bg-white`
                    : isNotVotedYet
                    ? "border border-gray-200 hover:border-gray-300 hover:shadow-md bg-white"
                    : "border border-gray-100 bg-gray-50"
                }`}
              >
                <div className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center min-w-0 flex-shrink-1">
                      <span
                        className="flex-shrink-0 inline-block w-5 h-5 rounded-full mr-2"
                        style={{ backgroundColor: candidate.color }}
                      ></span>
                      <span className="font-medium whitespace-nowrap">
                        {candidate.name}
                      </span>
                    </div>
                    <span className="flex-shrink-0 text-sm font-medium ml-2">
                      👍 {percentage}%
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                    <div
                      className={`h-2.5 rounded-full transition-all duration-700 ${
                        isAnimating ? "transition-all duration-700" : ""
                      }`}
                      style={{
                        width: barWidth,
                        backgroundColor: candidate.color,
                      }}
                    ></div>
                  </div>

                  {isNotVotedYet ? (
                    <button
                      onClick={() => handleVote(candidate.id)}
                      disabled={!!lastVoteActionRef.current}
                      className={`mt-2 w-full py-1.5 text-white rounded-md font-medium text-sm transition-colors ${
                        lastVoteActionRef.current
                          ? "opacity-70 cursor-not-allowed"
                          : ""
                      }`}
                      style={{ backgroundColor: candidate.color }}
                    >
                      {lastVoteActionRef.current === "voting"
                        ? "투표 중..."
                        : "투표하기"}
                    </button>
                  ) : (
                    isVoted && (
                      <button
                        onClick={() => showCancelConfirmation(candidate.id)}
                        disabled={!!lastVoteActionRef.current}
                        className={`mt-2 w-full py-1.5 bg-white text-red-500 border border-red-500 rounded-md font-medium text-sm transition-colors hover:bg-red-50 ${
                          lastVoteActionRef.current
                            ? "opacity-70 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        {lastVoteActionRef.current === "canceling"
                          ? "취소 중..."
                          : "투표 취소하기"}
                      </button>
                    )
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 투표 통계 요약 */}
        <div className="mt-4 pt-3 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            투표 현황 요약
          </h4>
          <p className="text-xs text-gray-600 mb-2">
            총 투표수:{" "}
            <span className="font-semibold">{voteStatsSummary.total}명</span>
          </p>
          <div className="space-y-1.5">
            {voteStatsSummary.candidates.map((stat, index) => (
              <div
                key={stat.id}
                className="flex items-center justify-between text-xs"
              >
                <div className="flex items-center">
                  <span className="text-gray-500 mr-1">{index + 1}위.</span>
                  <span
                    className="inline-block w-2 h-2 rounded-full mr-1"
                    style={{
                      backgroundColor:
                        candidatesData.find((c) => c.id === stat.id)?.color ||
                        "#ccc",
                    }}
                  ></span>
                  <span className="font-medium">{stat.name}</span>
                </div>
                <div className="text-gray-600">
                  <span className="font-semibold">{stat.votes}표</span>
                  <span className="text-gray-400 ml-1">
                    ({stat.percentage}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {votedFor && (
          <p className="text-xs text-center text-gray-500 mt-3">
            브라우저당 1회만 가능합니다
          </p>
        )}
      </div>

      {/* 투표 취소 확인 모달 */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 transform transition-all">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg
                  className="h-6 w-6 text-red-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                투표 취소
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                같은 후보 투표를 취소하시겠습니까?
              </p>
              <div className="flex justify-center space-x-3">
                <button
                  onClick={() => setShowCancelModal(false)}
                  disabled={!!lastVoteActionRef.current}
                  className="py-2 px-4 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  아니오
                </button>
                <button
                  onClick={handleCancelVote}
                  disabled={!!lastVoteActionRef.current}
                  className="py-2 px-4 bg-red-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  {lastVoteActionRef.current === "canceling"
                    ? "처리 중..."
                    : "예, 취소합니다"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CandidateVoteBox;
