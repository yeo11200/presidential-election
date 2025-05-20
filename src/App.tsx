import React, { useState, useEffect } from "react";
import "./App.css";
import LeftSideTab from "./components/LeftSideTab";
import CandidateMainTabs from "./components/CandidateMainTabs";
import MobileHeader from "./components/MobileHeader";
import { candidatesData } from "./data/candidatesData";

function App() {
  const [selectedCandidate, setSelectedCandidate] = useState(
    candidatesData[0].id
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);
  const [categoryResetKey, setCategoryResetKey] = useState(0);

  const handleCandidateChange = (candidateId: string) => {
    setSelectedCandidate(candidateId);
    setMobileMenuOpen(false);
    setCategoryResetKey((prevKey) => prevKey + 1);
  };

  // 스크롤 위치에 따라 '탑 버튼' 보이기/숨기기
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowTopButton(true);
      } else {
        setShowTopButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 맨 위로 스크롤 함수
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Mobile Header - only visible on small screens */}
      <div className="md:hidden">
        <MobileHeader
          selectedCandidate={selectedCandidate}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          onCandidateChange={handleCandidateChange}
        />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Side Tab - hidden on mobile, visible on md and up */}
          <div className="hidden md:block md:w-64 flex-shrink-0">
            <LeftSideTab
              selectedCandidate={selectedCandidate}
              onCandidateChange={handleCandidateChange}
            />
          </div>

          {/* Main Tabs: 공약/뉴스 */}
          <div className="flex-1">
            <CandidateMainTabs selectedCandidate={selectedCandidate} />
          </div>
        </div>
      </div>

      {/* 탑 버튼 */}
      {showTopButton && (
        <button
          className="fixed bottom-6 right-6 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all z-50"
          onClick={scrollToTop}
          aria-label="맨 위로 스크롤"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

export default App;
