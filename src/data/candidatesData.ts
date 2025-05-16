export interface Policy {
  id: string;
  title: string;
  category: string;
  summary: string;
  attack: number;
  cost: number;
  risk: number;
  content: string;
  goal: string[];
  methods: string[];
  period: string[];
  fundingPlan: string[];
}

export interface Candidate {
  id: string;
  name: string;
  color: string;
  policies: Policy[];
}

export const candidatesData: Candidate[] = [
  // ================================
  //   이재명 후보 (더불어민주당)
  // ================================
  {
    id: "leejaemyung",
    name: "이재명",
    color: "#2563eb",
    policies: [
      {
        id: "policy1",
        title: "AI·K-콘텐츠 중심 경제강국",
        category: "경제",
        summary: "AI 고속도로, K콘텐츠 수출 50조 달성 목표",
        attack: 90,
        cost: 85,
        risk: 65,
        content:
          "목표:\n- AI 등 신산업 집중육성을 통해 새로운 성장기반 구축\n- K-콘텐츠 지원강화로 글로벌 빅5 문화강국 실현\n\n이행방법:\n- AI 고속도로 구축, GPU 5만개 확보, 융복합 산업 활성화\n- K컬쳐 글로벌 브랜드화 및 전방위 콘텐츠 지원",
        goal: [
          "AI·신산업 집중육성으로 성장기반 구축",
          "글로벌 K-콘텐츠 경쟁력 확보",
        ],
        methods: [
          "AI 고속도로 구축 및 GPU 5만개 확보",
          "융복합 산업 클러스터 활성화",
          "K-콘텐츠 해외 마케팅 확대",
        ],
        period: [
          "2025년 내 AI 인프라 기획 완료",
          "2026~2028년 GPU 단계적 배치",
          "2029년까지 융복합 클러스터 가동",
        ],
        fundingPlan: [
          "정부 R&D 예산 재편성",
          "산업 맞춤형 펀드 조성",
          "민간 투자 매칭 지원",
        ],
      },
      {
        id: "policy2",
        title: "민주주의 회복과 국민통합",
        category: "정치",
        summary: "국민소환제, 정치보복 근절, 검찰개혁",
        attack: 75,
        cost: 45,
        risk: 70,
        content:
          "목표:\n- 내란극복, 국민통합, 민주주의 회복\n\n이행방법:\n- 국민소환제, 검찰개혁, 감사원 중립성 강화\n- 온라인재판제, 방송 공공성 회복",
        goal: ["내란극복", "국민통합", "민주주의 회복"],
        methods: [
          "국민소환제 도입",
          "검찰 권한 축소 및 중립성 강화",
          "감사원·방송 공공성 제고",
        ],
        period: [
          "2025년 하반기 법령 개정안 발의",
          "2026년 국회 통과",
          "2027년 전면 시행",
        ],
        fundingPlan: [
          "기존 사법예산 구조조정",
          "감사원 운영 효율화로 재원 확보",
        ],
      },
      {
        id: "policy3",
        title: "가계·소상공인 활력 증진",
        category: "경제",
        summary: "채무 조정·탕감, 상권 르네상스 추진",
        attack: 80,
        cost: 70,
        risk: 50,
        content:
          "목표:\n- 가계와 소상공인의 활력 제고\n- 공정한 경제구조 실현\n\n이행방법:\n- 채무조정, 수수료 부담 완화, 상권르네상스 2.0 추진\n- 공정경제법제 강화, 플랫폼 규제 도입",
        goal: ["가계·소상공인 재정건전성 확보", "공정경제 구조 구축"],
        methods: [
          "채무 탕감 및 이자 부담 완화",
          "상권 르네상스 프로그램 2.0 추진",
          "공정거래법 강화",
        ],
        period: [
          "2025년 상반기 채무조정 법제화",
          "2026년 상권르네상스 실행계획 수립",
          "2027년 전면 시행",
        ],
        fundingPlan: ["재정사업 예산 중 일부 재편성", "공공기금 활용"],
      },
      {
        id: "policy4",
        title: "외교안보 강국 실현",
        category: "외교안보",
        summary: "G7참여, 남북 관계 복원, 한미동맹 강화",
        attack: 80,
        cost: 65,
        risk: 60,
        content:
          "목표:\n- 지속가능한 한반도 평화 실현\n- 경제안보 및 외교역량 강화\n\n이행방법:\n- G7 참여, 남북관계 복원, 한미동맹 강화\n- 외교다변화, 통상구조 혁신",
        goal: ["한반도 지속평화 기반 구축", "글로벌 외교역량 강화"],
        methods: [
          "G7 정상회의 정식 초청 추진",
          "남북 대화 채널 복원",
          "통상협력 다변화",
        ],
        period: [
          "2025년 말까지 G7 참여 준비",
          "2026년 남북 실무회담 개최",
          "2027년 통상혁신 로드맵 수립",
        ],
        fundingPlan: ["외교예산 일부 증액", "민관 합동 펀드 활용"],
      },
      {
        id: "policy5",
        title: "국민 생명·안전 강화",
        category: "행정",
        summary: "재난 대응 및 보건의료 개혁",
        attack: 85,
        cost: 70,
        risk: 60,
        content:
          "목표:\n- 국민 생활안전 강화 및 재난 대응력 제고\n\n이행방법:\n- 재난예측 시스템, 응급의료 체계 정비\n- 보건의료개혁 및 공공의료 확대",
        goal: ["국민 안전망 확충", "보건의료 접근성 강화"],
        methods: [
          "재난예측 AI 시스템 도입",
          "응급의료 인프라 확충",
          "공공의료기관 확대",
        ],
        period: [
          "2025년 재난시스템 구축 착수",
          "2026년 응급의료체계 정비 완료",
        ],
        fundingPlan: ["추경 예산 활용", "의료개혁 기금 조성"],
      },
      {
        id: "policy6",
        title: "세종 행정수도 및 5극 3특",
        category: "행정",
        summary: "균형발전, 공공기관 지방 이전",
        attack: 75,
        cost: 80,
        risk: 70,
        content:
          "목표:\n- 세종 행정수도 완성과 지역균형발전\n\n이행방법:\n- 5극 3특 추진, 국회·공공기관 지방 이전\n- 지역 전략산업 및 관광산업 육성",
        goal: ["균형발전 달성", "행정 효율성 제고"],
        methods: ["국회·공공기관 세종 이전", "5극 3특 산업 전략 수립"],
        period: ["2025년 행정수도 건설계획 확정", "2028년 공공기관 이전 완료"],
        fundingPlan: ["국가균형발전특별회계 활용", "지방채 발행"],
      },
      {
        id: "policy7",
        title: "노동존중 사회 실현",
        category: "노동",
        summary: "근로기준 강화, 산재보험 확대",
        attack: 70,
        cost: 55,
        risk: 65,
        content:
          "목표:\n- 노동 존중 사회 실현\n\n이행방법:\n- 동일노동 동일임금, 포괄임금제 금지\n- 산재보험 확대 및 노동자 권리 보장",
        goal: ["노동권 강화", "산재보험 보장 확대"],
        methods: ["포괄임금제 전면 금지", "동일노동 동일임금 법제화"],
        period: ["2025년 노사정 합의", "2026년 법제화"],
        fundingPlan: ["사회보험 분담금 조정"],
      },
      {
        id: "policy8",
        title: "보편적 복지 확대",
        category: "복지",
        summary: "기초연금 확대, 공공돌봄 강화",
        attack: 80,
        cost: 75,
        risk: 60,
        content:
          "목표:\n- 보편적 복지 확대\n\n이행방법:\n- 기초연금 확대, 공공돌봄 강화\n- 의료보장성 확대, 건강보험 지속성 확보",
        goal: ["기초연금 안정화", "공공돌봄체계 구축"],
        methods: ["기초연금 지급액 인상", "공공돌봄기관 확충"],
        period: ["2025년 안 인상안 확정", "2026년 시행"],
        fundingPlan: ["국가재정 지출 구조조정", "건강보험료 일부 인상"],
      },
      {
        id: "policy9",
        title: "공정경제 실현",
        category: "산업",
        summary: "대기업 갑질 방지, 플랫폼 수수료 제한",
        attack: 75,
        cost: 60,
        risk: 55,
        content:
          "목표:\n- 공정경제 실현\n\n이행방법:\n- 대기업 갑질 근절, 수수료 상한제\n- 주주환원 및 지배구조 개선",
        goal: ["시장지배력 남용 방지", "플랫폼 경제 투명성 제고"],
        methods: ["수수료 상한제 도입", "지배구조 개선 의무화"],
        period: ["2025년 수수료 상한 법제화", "2026년 전면 시행"],
        fundingPlan: ["공정거래위원회 예산 확대"],
      },
      {
        id: "policy10",
        title: "청년·신혼부부 주거정책",
        category: "주거",
        summary: "청년·신혼부부 위한 공공주택 공급 확대",
        attack: 70,
        cost: 70,
        risk: 50,
        content:
          "목표:\n- 청년·신혼부부 주거안정\n\n이행방법:\n- 공공주택 공급 확대, 대출 제도 개선\n- 전세사기 방지, 월세 세액공제 확대",
        goal: ["주거비 부담 경감", "주택 공급 확대"],
        methods: ["공공임대주택 20만호 추가 공급", "전세사기 방지법 강화"],
        period: ["2025~2027년 단계별 공급"],
        fundingPlan: ["주택도시기금 활용", "국비·지방비 매칭"],
      },
    ],
  },

  // ================================
  //   김문수 후보 (국민의힘)
  // ================================
  {
    id: "kimmoonsu",
    name: "김문수",
    color: "#dc2626",
    policies: [
      {
        id: "policy1",
        title: "자유 주도 성장, 기업하기 좋은 나라",
        category: "경제",
        summary: "규제 완화 및 기업 환경 개선으로 자유 성장",
        attack: 85,
        cost: 55,
        risk: 65,
        content:
          "목표:\n- 자본·기술·노동 혁신으로 성장\n- 기업하기 좋은 나라 실현\n\n이행방법:\n- 자유경제혁신법 제정, 세제 혜택 확대\n- 원전 확대, 근로시간 유연화",
        goal: ["기업 혁신 촉진", "규제 장벽 해소"],
        methods: [
          "자유경제혁신법 제정",
          "세제 인센티브 확대",
          "원전 정책 강화",
        ],
        period: ["2025년 초 법안 발의", "2026년 국회 통과"],
        fundingPlan: ["성장펀드 조성"],
      },
      {
        id: "policy2",
        title: "AI·에너지 3대 강국 도약",
        category: "과학기술",
        summary: "AI·원자력 기반 미래 성장 동력 확보",
        attack: 90,
        cost: 80,
        risk: 70,
        content:
          "목표:\n- AI·에너지 3대 강국 도약\n\n이행방법:\n- AI인재 20만 양성, 민관 100조 펀드\n- 원전 확대 및 과학기술 인프라 강화",
        goal: [
          "AI 전 주기에 걸친 집중 투자와 생태계 조성으로 3대 강국 도약",
          "세계 1위 원자력 기술로 에너지 강국 실현",
          "과학기술인이 존중받는 나라로 초격차 기술 혁신",
        ], // 0250603_대한민국_김문수_10대공약.pdf](file-service://file-SXAc6XXesFaXewmxxa5twm)
        methods: [
          "AI 청년 인재 20만명 양성 (대학원·SW중심대학 정원 확대, 글로벌 협력, 연구비 매칭)",
          "AI 유니콘 기업 지원 (민관합동펀드 100조 조성, 핵심 인프라 확보)",
          "글로벌 AI 융합센터 구축 (공공데이터 개방, 차세대 AI 원천기술 개발, 스타트업 펀드 조성, 중소기업 육성)",
        ], //
        period: ["취임 즉시 추진"], // 0250603_대한민국_김문수_10대공약.pdf](file-service://file-SXAc6XXesFaXewmxxa5twm)
        fundingPlan: ["기존 재원 활용으로 추가 재정 소요 없음"], // 0250603_대한민국_김문수_10대공약.pdf](file-service://file-SXAc6XXesFaXewmxxa5twm)
      },
      {
        id: "policy3",
        title: "청년이 크는 나라",
        category: "청년",
        summary: "청년 일자리, 주거, 교육, 결혼·육아 패키지 지원",
        attack: 80,
        cost: 70,
        risk: 55,
        content:
          "목표:\n- 청년의 미래를 키우는 나라\n- 청년 취업·주거·교육·결혼·양육 부담 완화로 기회 창출\n\n이행방법:\n- 국민연금 2차 개혁, 청년 주도 참여 보장\n- AI 스타트업 빌리지 조성 및 맞춤형 일자리 창출\n- 3·3·3 청년주택 공급 등 주거지원 확대\n- 신혼부부 결혼·육아 부담 완화 제도 도입\n- 보육수당 비과세 확대 및 세액공제 강화",
        goal: ["청년의 미래 기회 보장", "주거·일자리·복지 통합 지원 체계 구축"],
        methods: [
          "청년안심 연금개혁 위원회에 청년 참여 확대 및 자동조정장치 도입", // 20250603_대한민국_김문수_10대공약.pdf](file-service://file-SXAc6XXesFaXewmxxa5twm)
          "AI 청년 스타트업 빌리지 전국 조성 및 인력 양성", // 20250603_대한민국_김문수_10대공약.pdf](file-service://file-SXAc6XXesFaXewmxxa5twm)
          "3·3·3 청년주택 연 10만호 공급·공공주택 확대", // 20250603_대한민국_김문수_10대공약.pdf](file-service://file-SXAc6XXesFaXewmxxa5twm)
          "신혼부부 디딤돌·버팀목 대출 요건 완화 및 기간 연장", // 20250603_대한민국_김문수_10대공약.pdf](file-service://file-SXAc6XXesFaXewmxxa5twm)
          "6세 이하 보육수당 비과세 및 월세 세액공제 확대", // 20250603_대한민국_김문수_10대공약.pdf](file-service://file-SXAc6XXesFaXewmxxa5twm)
        ],
        period: [
          "취임 즉시: 제도 개편 로드맵 수립",
          "1년 내: 주요 제도(주택·연금) 법안 발의 및 시행",
        ],
        fundingPlan: ["기존 예산 재편성 및 청년특별기금 활용"],
      },
      {
        id: "policy4",
        title: "GTX 전국 확대",
        category: "교통",
        summary: "수도권 교통혁신 및 지방 메가시티 연결",
        attack: 75,
        cost: 85,
        risk: 60,
        content:
          "목표:\n- GTX를 전국 5대 광역권으로 확장해 국토 균형발전 촉진\n- 메가시티 조성으로 초광역권 성장기반 마련\n- 교통 체증 해소로 국민 삶의 질 개선\n\n이행방법:\n- 수도권 GTX 모델 전국화 및 노선별 적시 개통\n- 광역·도시철도 확충으로 30분 출퇴근 혁명\n- 초광역권 메가시티 5개권역 구축",
        goal: [
          "광역급행철도 전국망 실현",
          "지방 메가시티 및 초광역권 구상 완성",
        ],
        methods: [
          "GTX A~F 노선 수도권 모델 전국 5대 권역으로 확장", // 20250603_대한민국_김문수_10대공약.pdf](file-service://file-SXAc6XXesFaXewmxxa5twm)
          "광역철도·도시철도 추가 건설로 30분 출퇴근 지원", // 20250603_대한민국_김문수_10대공약.pdf](file-service://file-SXAc6XXesFaXewmxxa5twm)
          "수도권·충청·호남·대경·동남 메가시티 조성 TF 운영", // 20250603_대한민국_김문수_10대공약.pdf](file-service://file-SXAc6XXesFaXewmxxa5twm)
        ],
        period: [
          "취임 후 6개월: 종합 추진계획 수립",
          "2년 내: 주요 GTX 노선 착공",
        ],
        fundingPlan: ["국비·지방비 매칭, 민자유치 모델 도입"],
      },
      {
        id: "policy5",
        title: "중산층 자산증식",
        category: "조세",
        summary: "감세 및 자산형성 지원으로 중산층 강화",
        attack: 70,
        cost: 40,
        risk: 65,
        content:
          "목표:\n- 중산층 비율 확대 및 소득·자산 증가\n\n이행방법:\n- 소득세 물가연동제 도입 및 공제 확대\n- 장기투자·펀드 세제 혜택 강화\n- 상속·증여제도 개편으로 가업승계 지원",
        goal: ["중산층 세부담 경감", "자산 형성 기회 확대"],
        methods: [
          "종합소득세 물가연동제 도입 및 기본공제 상향", // 20250603_대한민국_김문수_10대공약.pdf](file-service://file-SXAc6XXesFaXewmxxa5twm)
          "ISA·장기주식보유 ETF 세제 지원 확대", // 20250603_대한민국_김문수_10대공약.pdf](file-service://file-SXAc6XXesFaXewmxxa5twm)
          "상속세·증여세율 인하 및 과세체계 개편", // ‡20250603_대한민국_김문수_10대공약.pdf](file-service://file-SXAc6XXesFaXewmxxa5twm)
        ],
        period: ["2025년 초: 조세특례법 개정안 발의", "2026년: 전면 시행"],
        fundingPlan: ["감세로 인한 세수 감소분은 분할상환 재정계획 수립"],
      },
      {
        id: "policy6",
        title: "아이 낳고 기르기 좋은 나라",
        category: "복지",
        summary: "출산부터 돌봄까지 전방위 육아 지원",
        attack: 80,
        cost: 75,
        risk: 60,
        content:
          "목표:\n- 생애주기별 맞춤형 복지체계 구축\n- 보건의료 접근성 강화\n\n이행방법:\n- 9년 청년·신혼부부 주거비 지원 확대\n- 난임·임신·출산·육아 의료비 지원 강화\n- ‘우리 아이 첫 걸음계좌’ 신설 및 아동자산 형성 지원\n- 예방접종 국가 지원 확대",
        goal: ["출산·육아 부담 완화", "전 생애 맞춤형 보건·돌봄 강화"],
        methods: [
          "청년·신혼부부 9년 주거비 지원 및 대출 요건 완화", // 20250603_대한민국_김문수_10대공약.pdf](file-service://file-SXAc6XXesFaXewmxxa5twm)
          "난임 시술·산후조리원·분만비 건강보험 적용 확대", // 20250603_대한민국_김문수_10대공약.pdf](file-service://file-SXAc6XXesFaXewmxxa5twm)
          "0~17세 첫 걸음계좌 신설 및 디딤씨앗 통장 확대", // 20250603_대한민국_김문수_10대공약.pdf](file-service://file-SXAc6XXesFaXewmxxa5twm)
          "영·유아·어르신 예방접종 전면 국가 지원", // 20250603_대한민국_김문수_10대공약.pdf](file-service://file-9atjqeGVbGZUXMpBQHc7dw)
        ],
        period: [
          "취임 즉시: 주거·의료 지원 계획 수립",
          "1년 내: 첫 걸음계좌 및 의료비 지원 시행",
        ],
        fundingPlan: [
          "재정 소요 없음(규제 완화·세제 개편 통한 세수 증가) ", // 20250603_대한민국_김문수_10대공약.pdf](file-service://file-SXAc6XXesFaXewmxxa5twm)
        ],
      },
      {
        id: "policy7",
        title: "소상공인 민생경제 회복",
        category: "경제",
        summary: "소상공인 지원단 및 금융 플랫폼 강화",
        attack: 70,
        cost: 65,
        risk: 50,
        content:
          "목표:\n- 소상공인 경영 부담 완화 및 민생경제 회복\n\n이행방법:\n- 긴급지원단 설치 및 금융 플랫폼 고도화\n- 공과금 바우처·디지털 마케팅 지원",
        goal: ["소상공인 금융·판로 지원 확대", "민생경제 안정 기반 구축"],
        methods: [
          "긴급지원단 설치로 현장 애로 신속 대응", // ‡20250603_대한민국_김문수_10대공약.pdf](file-service://file-SXAc6XXesFaXewmxxa5twm)
          "금융 플랫폼 개선 및 공과금 바우처 도입", // ‡20250603_대한민국_김문수_10대공약.pdf](file-service://file-SXAc6XXesFaXewmxxa5twm)
          "디지털 마케팅 지원 사업 전개", // ‡20250603_대한민국_김문수_10대공약.pdf](file-service://file-SXAc6XXesFaXewmxxa5twm)
        ],
        period: ["취임 즉시: 지원단 운영 개시", "6개월 내: 플랫폼 개편 완료"],
        fundingPlan: ["국비·지방비 재조정 및 공공기금 활용"],
      },
      {
        id: "policy8",
        title: "한미동맹 기반 안보정책",
        category: "외교안보",
        summary: "전방위 억제 및 전작권 환수",
        attack: 75,
        cost: 60,
        risk: 70,
        content:
          "목표:\n- 강력한 한미동맹 구축 및 전작권 환수\n\n이행방법:\n- 한미 핵 확장억제 실행력 강화\n- 3축 체계 고도화 및 방산수출 확대",
        goal: ["북핵 억제력 강화", "전작권 환수를 통한 국방자주권 확보"],
        methods: [
          "미 전략자산 상시 전개 및 확장억제 강화", // 0250603_대한민국_김문수_10대공약.pdf](file-service://file-9atjqeGVbGZUXMpBQHc7dw)
          "한국형 3축 체계(킬체인·아이언돔) 성능 고도화", // 0250603_대한민국_김문수_10대공약.pdf](file-service://file-9atjqeGVbGZUXMpBQHc7dw)
          "전작권 환수 협상 및 방산수출 촉진", // 0250603_대한민국_김문수_10대공약.pdf](file-service://file-9atjqeGVbGZUXMpBQHc7dw)
        ],
        period: [
          "취임 후 6개월: 실행계획 수립",
          "2년 이내: 핵·미사일 체계 고도화 완료",
        ],
        fundingPlan: ["국방예산 구조조정 내 재원 확보"],
      },
      {
        id: "policy9",
        title: "의료 개혁과 국민건강 강화",
        category: "보건의료",
        summary: "의료접근성 및 보건소 확대",
        attack: 70,
        cost: 60,
        risk: 60,
        content:
          "목표:\n- 의료접근성 제고 및 공공의료 체계 강화\n\n이행방법:\n- 건강보험 국고지원 안정화\n- 보건소·공공의료기관 전국 확대",
        goal: ["의료비 부담 완화", "공공의료 서비스 접근성 강화"],
        methods: [
          "건강보험 국고지원 확대 및 수가 개편", // ‡20250603_대한민국_이재명_10대공약.pdf](file-service://file-6VFRNT32hnHGXN5QaAvQAm)
          "공공보건소 및 병원 인프라 확충", // ‡20250603_대한민국_이재명_10대공약.pdf](file-service://file-6VFRNT32hnHGXN5QaAvQAm)
          "희귀질환·소아당뇨 등 특수환자 지원 강화", // ‡20250603_대한민국_이재명_10대공약.pdf](file-service://file-6VFRNT32hnHGXN5QaAvQAm)
        ],
        period: ["2025년부터: 법·예산 정비 단계 추진"],
        fundingPlan: [
          "정부재정 지출구조 조정분 및 연간 수입 증가분 활용", // ‡20250603_대한민국_이재명_10대공약.pdf](file-service://file-6VFRNT32hnHGXN5QaAvQAm)
        ],
      },
      {
        id: "policy10",
        title: "장애인 생애주기별 지원 확대",
        category: "복지",
        summary: "장애아·장애인 가족 돌봄 및 건강권 강화",
        attack: 65,
        cost: 55,
        risk: 45,
        content:
          "목표:\n- 장애인 권리보장 및 복지 강화\n\n이행방법:\n- 장애인권리보장법 제정\n- 원스톱 지원센터 설치 및 케어 코디네이터 운영",
        goal: ["장애인 사회참여 확대", "맞춤형 복지서비스 제공"],
        methods: [
          "‘장애인권리보장법’ 제정 및 지원체계 마련", // ‡20250603_대한민국_김문수_10대공약.pdf](file-service://file-9atjqeGVbGZUXMpBQHc7dw)
          "원스톱 생활지원센터 설치 및 운영", // ‡20250603_대한민국_김문수_10대공약.pdf](file-service://file-9atjqeGVbGZUXMpBQHc7dw)
          "생애주기별 돌봄 서비스 코디네이터 배치", // ‡20250603_대한민국_김문수_10대공약.pdf](file-service://file-9atjqeGVbGZUXMpBQHc7dw)
        ],
        period: ["2025년 6월부터 단계적 시행"],
        fundingPlan: ["국비 및 지방비 매칭, 공공기금 활용"],
      },
    ],
  },

  // ================================
  //   이준석 후보 (개혁신당)
  // ================================
  {
    id: "leejunsuk",
    name: "이준석",
    color: "#ea580c",
    policies: [
      {
        id: "policy1",
        title: "부처 13개로 축소, 대통령 힘빼기",
        category: "행정",
        summary: "대통령 권한 분산 및 정부 부처 통합",
        attack: 90,
        cost: 60,
        risk: 70,
        content:
          "목표:\n- 대통령 권한 축소와 부처 효율화\n\n이행방법:\n- 부처 13개로 축소, 예산기획 기능 이관\n- 공수처 폐지 및 부총리제 도입",
        goal: ["부처 중복 최소화 및 전문성 강화", "작은 정부 혁신 문화 정착"],
        methods: [
          "19부처 → 13부처 통폐합",
          "3부총리제 도입",
          "예산기획실 신설",
          "공수처 폐지·권익위 통합",
        ],
        period: [
          "취임 후 6개월 내 계획 수립",
          "1년 내 법개정 완료",
          "2년 내 정착",
        ],
        fundingPlan: ["중복예산 절감", "운영비 절감분 재투입"],
      },
      {
        id: "policy2",
        title: "리쇼어링 기업 유치 정책",
        category: "산업자원",
        summary: "외국인 노동자 규제 완화와 국내 복귀 유도",
        attack: 80,
        cost: 70,
        risk: 60,
        content:
          "목표:\n- 국내 복귀 기업 유인으로 지역경제 활성화\n\n이행방법:\n- 특수비자 신설, 규제완화, 적응지원",
        goal: ["해외 이전 기업 복귀 촉진", "외국인 노동자 절차 간소화"],
        methods: ["E-9-11 특수비자 도입", "주요 산업단지 우대 규제완화"],
        period: ["3개월 내 세부정책 수립", "6개월 내 법제화"],
        fundingPlan: ["세수 증가분 활용"],
      },
      {
        id: "policy3",
        title: "지자체 법인세 자치권 부여",
        category: "조세",
        summary: "지역 재정 자율성 및 경쟁 강화",
        attack: 70,
        cost: 65,
        risk: 75,
        content:
          "목표:\n- 법인세 일부를 지방세로 전환해 지자체 자율권 강화\n\n이행방법:\n- 법인세 국세분 30% 감면·지방세 전환\n- 지자체별 탄력세율 도입 및 경쟁 체계 구축\n- 이전 효과 극대화를 위한 지방소비세 제도 연계",
        goal: ["지방재정 자율성 확보", "지자체 간 건전한 조세경쟁 유도"],
        methods: [
          "법인세 국세분 30%를 지방세로 전환", // 20250603_대한민국_이준석_10대공약.pdf](file-service://file-7LyALnTSGcmw6qVioq2Jdn)
          "지자체별 탄력세율(최대50%) 적용 및 시행예고제 도입", // 20250603_대한민국_이준석_10대공약.pdf](file-service://file-7LyALnTSGcmw6qVioq2Jdn)
          "지방소비세 이전 효과 활용으로 추가 재정 확보", // 20250603_대한민국_이준석_10대공약.pdf](file-service://file-7LyALnTSGcmw6qVioq2Jdn)
        ],
        period: [
          "취임 후 6개월: 법령 정비 및 지자체 협의",
          "1년 내: 제도 시행",
        ],
        fundingPlan: ["중앙정부 교부금 조정으로 별도 재정 투입 없이 운영"],
      },
      {
        id: "policy4",
        title: "지방 최저임금 결정권 부여",
        category: "노동",
        summary: "지자체에 최저임금 조정 권한 부여",
        attack: 65,
        cost: 50,
        risk: 70,
        content:
          "목표:\n- 지역실정 반영한 최저임금제도로 지방경제 활성화\n\n이행방법:\n- 중앙위원회 결정을 기본으로 지자체가 ±30% 범위 내 조정권 부여\n- 지역별 생활비·기업여건 반영한 조정기구 설치",
        goal: ["지역 간 균형적 임금 결정", "지방자치 강화"],
        methods: [
          "중앙위 결정 후 지자체별 ±30% 조정권 부여", // 20250603_대한민국_이준석_10대공약.pdf](file-service://file-7aRetH8TRhrXAeGBZ3ELeV)
          "조정기구 설치 및 지역 실태조사 반영", // 20250603_대한민국_이준석_10대공약.pdf](file-service://file-7aRetH8TRhrXAeGBZ3ELeV)
        ],
        period: [
          "취임 후 6개월: 지자체별 준비기구 구성",
          "1년 내: 조정제도 시행",
        ],
        fundingPlan: ["기존 최저임금위원회·노사정 예산 활용"],
      },
      {
        id: "policy5",
        title: "국민연금 신-구 분리 개혁",
        category: "복지",
        summary: "신규 가입자 위한 연금 체계 분리 운영",
        attack: 85,
        cost: 80,
        risk: 85,
        content:
          "목표:\n- 세대 간 형평성 확보를 위한 신·구연금 분리\n\n이행방법:\n- 분리된 기금 운영 체계 도입\n- 자동조정장치·확정기여형 제도 도입",
        goal: ["세대 간 형평성 강화", "연금 지속가능성 확보"],
        methods: [
          "신규 가입자는 확정기여형 연금 체계 적용", // 20250603_대한민국_이준석_10대공약.pdf](file-service://file-7LyALnTSGcmw6qVioq2Jdn)
          "기존 기금은 자동조정장치 통해 재정건전성 유지", // 20250603_대한민국_이준석_10대공약.pdf](file-service://file-7LyALnTSGcmw6qVioq2Jdn)
        ],
        period: ["취임 후 1년: 세법 개정안 발의", "2년 내: 분리체계 이행"],
        fundingPlan: ["기존 연금기금 운용수익 재투자 및 국고지원"],
      },
      {
        id: "policy6",
        title: "교사 소송 국가책임제",
        category: "교육",
        summary: "교권 보호를 위한 국가 변호 지원",
        attack: 60,
        cost: 40,
        risk: 40,
        content:
          "목표:\n- 교사의 법적안전 확보 및 교육권 보장\n\n이행방법:\n- 교육청 전담 변호사 배치\n- 허위신고 처벌 강화\n- 학습지도실·생활지원관 제도 도입",
        goal: ["교권 보호 강화", "교육환경 안정화"],
        methods: [
          "교육청별 전담 변호사 배치 및 소송 지원", // 20250603_대한민국_이준석_10대공약.pdf](file-service://file-7LyALnTSGcmw6qVioq2Jdn)
          "허위신고자에 대한 민·형사상 책임 강화", // 20250603_대한민국_이준석_10대공약.pdf](file-service://file-7LyALnTSGcmw6qVioq2Jdn)
          "학습지도실 1곳 이상 설치 및 생활지원관 배치", // 20250603_대한민국_이준석_10대공약.pdf](file-service://file-7LyALnTSGcmw6qVioq2Jdn)
        ],
        period: [
          "취임 후 3개월: 법령·규정 개정",
          "6개월 내: 인력 배치 및 제도시행",
        ],
        fundingPlan: ["교육청 예산 재편 및 학교환경개선 예산 활용"],
      },
      {
        id: "policy7",
        title: "든든출발자금 청년 정책대출",
        category: "청년",
        summary: "최대 5천만원 대출로 청년 자립 지원",
        attack: 75,
        cost: 60,
        risk: 50,
        content:
          "목표:\n- 초기 자금 부족 청년의 도전 지원\n\n이행방법:\n- 연 1.7% 고정금리 대출 상품 출시\n- 상환유연성(거치·분할·취업후 상환) 제공\n- 학자금대출과 선택·전환 허용",
        goal: ["청년 초기 자금 지원", "상환부담 완화"],
        methods: [
          "1분기당 500만원, 최대 5천만원 대출 상품 출시", // 20250603_대한민국_이준석_10대공약.pdf](file-service://file-7LyALnTSGcmw6qVioq2Jdn)
          "5년 거치·10년 분할 혹은 취업후상환 선택제", // 20250603_대한민국_이준석_10대공약.pdf](file-service://file-7LyALnTSGcmw6qVioq2Jdn)
          "학자금대출과의 선택 및 전환 가능", // 20250603_대한민국_이준석_10대공약.pdf](file-service://file-7LyALnTSGcmw6qVioq2Jdn)
        ],
        period: [
          "취임 후 6개월 내: 상품 설계 및 금융기관 협약",
          "1년 내: 전면 시행",
        ],
        fundingPlan: ["정책금융기금 활용 및 민간금융 매칭"],
      },
      {
        id: "policy8",
        title: "현역대상자 장교선발제",
        category: "국방",
        summary: "병사 훈련 후 우수자 장교 임관",
        attack: 65,
        cost: 55,
        risk: 60,
        content:
          "목표:\n- 군 인력 구조 개혁 및 병력의 전문성 강화\n\n이행방법:\n- 복무 중 장교 선발·등록금 지원\n- 복무 연계 학업 유예 및 복귀 보장",
        goal: ["병사 기회 균등 및 전문성 강화"],
        methods: [
          "임관 후 1년7개월 복무·학업 복귀 보장", // 0250603_대한민국_이준석_10대공약.pdf](file-service://file-7aRetH8TRhrXAeGBZ3ELeV)
          "복무기간 비례 등록금 전액 지원", // 0250603_대한민국_이준석_10대공약.pdf](file-service://file-7aRetH8TRhrXAeGBZ3ELeV)
          "최대 3년 복무 유예제 도입", // 0250603_대한민국_이준석_10대공약.pdf](file-service://file-7aRetH8TRhrXAeGBZ3ELeV)
        ],
        period: ["취임 후 6개월: 제도 설계·법령 정비", "1년 내: 시범사업 실시"],
        fundingPlan: ["기존 군 인건비·등록금 예산 재배치"],
      },
      {
        id: "policy9",
        title: "국립의대 신설 및 전액 국비 의무복무제",
        category: "보건의료",
        summary: "지역 공공의료 강화를 위한 국립의대",
        attack: 80,
        cost: 75,
        risk: 70,
        content:
          "목표:\n- 의료 불균형 해소 및 지역 공공의료 강화\n\n이행방법:\n- 국립의대 설립·입학정원 확대\n- 졸업 후 의무복무 연한 부여 및 지원",
        goal: ["지역 의료인력 확보"],
        methods: [
          "국립의대 설립·국비 전액 지원 의무복무제 도입", // 20250603_대한민국_이준석_10대공약.pdf](file-service://file-7aRetH8TRhrXAeGBZ3ELeV)
        ],
        period: [
          "취임 후 1년: 대학 설립 계획 수립",
          "2년 내: 입학 및 교육 개시",
        ],
        fundingPlan: ["국립대학 설립예산 및 보건의료기금 활용"],
      },
      {
        id: "policy10",
        title: "연봉 상한제 및 공영방송 민영화",
        category: "언론",
        summary: "공공기관 개혁과 언론 경쟁력 강화",
        attack: 75,
        cost: 45,
        risk: 80,
        content:
          "목표:\n- 공공기관 고연봉 관행 해소\n- 공영방송의 독립성·경쟁력 제고\n\n이행방법:\n- 공공기관 연봉 상한제 도입\n- 공영방송 민영화 및 공정언론 제도 정비",
        goal: ["공공부문 비용 효율화", "언론자율성 확대"],
        methods: [
          "공공기관 최고연봉 상한 설정", // 20250603_대한민국_이준석_10대공약.pdf](file-service://file-7aRetH8TRhrXAeGBZ3ELeV)
          "공영방송 민영화 법안 발의 및 시장경쟁 도입", // 20250603_대한민국_이준석_10대공약.pdf](file-service://file-7aRetH8TRhrXAeGBZ3ELeV)
        ],
        period: ["취임 후 6개월: 정책설계·법령 개정", "1년 내: 단계적 시행"],
        fundingPlan: ["비효율 예산 절감분으로 초기 재원 마련"],
      },
    ],
  },
];
