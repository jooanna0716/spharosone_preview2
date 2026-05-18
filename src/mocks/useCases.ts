export const FEATURES = [
  {
    key: 'security',
    title: '보안',
    subtitle: 'Security',
    icon: 'ri-shield-check-line',
    summary: '글로벌 표준의 보안 컴플라이언스와 정보보안을 기반으로, 데이터 보호와 위협 방어를 강화합니다.',
    detailPoints: [
      '공공기관 · 금융기관 수준의 보안 정책 적용',
      '데이터 센터 직접 운영으로 외부 접근 차단',
      '인증 및 감사 이력 관리, 접근 권한 제어',
    ],
  },
  {
    key: 'compliance',
    title: '컴플라이언스',
    subtitle: 'Compliance',
    icon: 'ri-file-list-3-line',
    summary: '금융, 공공, 제조 등 다양한 산업의 규제 요건을 충족하는 컴플라이언스 환경을 제공합니다.',
    detailPoints: [
      '금융보안원, 공공기관 등 심사 기준 충족',
      '감사 추적 및 데이터 보관 정책 자동화',
      'ISMS-P, ISO 27001 등 국내외 인증 대응',
    ],
  },
  {
    key: 'multi-cloud',
    title: '멀티/하이브리드 클라우드',
    subtitle: 'Multi/Hybrid Cloud',
    icon: 'ri-cloud-line',
    summary: '온프레미스와 클라우드를 자유롭게 연결하는 하이브리드 및 멀티 클라우드 환경을 지원합니다.',
    detailPoints: [
      '온프레미스 · 퍼블릭 클라우드 통합 관리',
      '유연한 워크로드 이동 및 재해 복구',
      '단일 콘솔로 멀티 클라우드 인프라 운영',
    ],
  },
  {
    key: 'infra',
    title: 'IT 인프라',
    subtitle: 'IT Infrastructure',
    icon: 'ri-server-line',
    summary: '안정적인 서버, 스토리지, 네트워크 인프라를 구축하고 효율적으로 운영할 수 있도록 지원합니다.',
    detailPoints: [
      '가상화 및 컨테이너 기반 인프라 구축',
      '자동화된 리소스 확장 및 복구 체계',
      '네트워크 분리 및 다중 연결 지원',
    ],
  },
  {
    key: 'backup',
    title: '백업/복구',
    subtitle: 'Backup & Recovery',
    icon: 'ri-database-2-line',
    summary: '데이터 손실 없는 안정적인 백업 및 신속한 복구 체계를 구축합니다.',
    detailPoints: [
      '정기 자동 백업 및 보관 주기 설정',
      'RPO/RTO 기준 맞춤형 재해 복구 설계',
      '데이터 무결성 검증 및 복구 테스트',
    ],
  },
  {
    key: 'devops',
    title: 'DevOps/자동화',
    subtitle: 'DevOps & Automation',
    icon: 'ri-settings-3-line',
    summary: 'CI/CD 파이프라인과 인프라 자동화를 통해 개발과 운영의 효율성을 극대화합니다.',
    detailPoints: [
      '자동화된 배포 및 롤백 파이프라인',
      'IaC 기반 인프라 구성 관리',
      '모니터링과 알림 연동으로 운영 효율화',
    ],
  },
  {
    key: 'ai',
    title: 'AI/분석',
    subtitle: 'AI & Analytics',
    icon: 'ri-bar-chart-grouped-line',
    summary: 'AI 및 데이터 분석 워크로드를 위한 최적화된 GPU 인프라와 분석 환경을 제공합니다.',
    detailPoints: [
      'GPU 클러스터 기반 AI 학습 및 추론',
      '빅데이터 분석 및 실시간 처리 지원',
      'MLOps 파이프라인 및 모델 관리',
    ],
  },
];

export const CASE_STUDIES = [
  {
    key: 'finance',
    industry: '금융',
    title: '금융기관 핵심 시스템 클라우드 전환',
    description:
      '레거시 인프라를 클라우드로 전환하여 시스템 가용성을 높이고, 금융보안원 컴플라이언스를 완벽히 충족했습니다. 핵심 시스템의 무중단 운영과 재해 복구 체계를 구축하여 비즈니스 연속성을 확보했습니다.',
    metrics: [
      { label: '시스템 가용성', value: '99.99%' },
      { label: '복구 시간 단축', value: '70%' },
      { label: '운영 인력 효율', value: '40% 향상' },
    ],
    tags: ['금융보안원 인증', 'DRaaS', '컴플라이언스'],
    image:
      'https://readdy.ai/api/search-image?query=modern%20bank%20office%20interior%20with%20digital%20screens%20showing%20financial%20data%20charts%2C%20clean%20corporate%20environment%2C%20soft%20blue%20and%20white%20lighting%2C%20professional%20fintech%20atmosphere%2C%20minimalist%20style%2C%20high%20detail%2C%20photorealistic&width=800&height=500&seq=cs_finance&orientation=landscape',
  },
  {
    key: 'public',
    industry: '공공',
    title: '공공기관 클라우드 인프라 구축',
    description:
      '공공기관의 데이터센터를 프라이빗 클라우드로 전환하여 보안과 효율성을 동시에 확보했습니다. 전자정부 표준 프레임워크와 연동하여 안정적인 서비스를 제공합니다.',
    metrics: [
      { label: '서버 가상화율', value: '85%' },
      { label: '에너지 절감', value: '30%' },
      { label: '장애 대응 속도', value: '5분 이내' },
    ],
    tags: ['전자정부 연동', 'IaaS', '보안 컨설팅'],
    image:
      'https://readdy.ai/api/search-image?query=government%20modern%20data%20center%20interior%20with%20servers%20and%20blue%20ambient%20lighting%2C%20clean%20futuristic%20public%20sector%20technology%20infrastructure%2C%20wide%20angle%20view%2C%20professional%20atmosphere%2C%20high%20detail%2C%20photorealistic&width=800&height=500&seq=cs_public&orientation=landscape',
  },
  {
    key: 'manufacturing',
    industry: '제조',
    title: '스마트팩토리 클라우드 인프라',
    description:
      '제조 공정 데이터를 실시간으로 수집·분석하는 스마트팩토리 인프라를 구축했습니다. IoT 센서 데이터와 AI 분석을 연동하여 생산 효율을 최적화하고 예측 정비 체계를 마련했습니다.',
    metrics: [
      { label: '생산 효율', value: '25% 향상' },
      { label: '불량률 감소', value: '60%' },
      { label: '예측 정비 정확도', value: '92%' },
    ],
    tags: ['IoT', 'AI 분석', '스마트팩토리'],
    image:
      'https://readdy.ai/api/search-image?query=modern%20smart%20factory%20interior%20with%20robotic%20arms%20and%20digital%20displays%2C%20clean%20industrial%20automation%20environment%2C%20blue%20and%20white%20lighting%2C%20futuristic%20manufacturing%20facility%2C%20wide%20angle%2C%20high%20detail%2C%20photorealistic&width=800&height=500&seq=cs_mfg&orientation=landscape',
  },
  {
    key: 'retail',
    industry: '유통/리테일',
    title: '온·오프라인 통합 클라우드 플랫폼',
    description:
      '대규모 유통 기업의 온라인 쇼핑몰과 오프라인 매장 시스템을 통합 클라우드로 연결했습니다. 프로모션 기간의 급증하는 트래픽을 안정적으로 처리하고 실시간 재고·주문 데이터를 동기화합니다.',
    metrics: [
      { label: '트래픽 처리', value: '10만 TPS' },
      { label: '주문 동기화', value: '실시간' },
      { label: '시스템 응답', value: '<200ms' },
    ],
    tags: ['대규모 트래픽', '실시간 동기화', '멀티 클라우드'],
    image:
      'https://readdy.ai/api/search-image?query=modern%20retail%20distribution%20center%20with%20automated%20sorting%20systems%20and%20digital%20dashboards%2C%20clean%20warehouse%20technology%20environment%2C%20warm%20lighting%2C%20logistics%20and%20ecommerce%20facility%2C%20wide%20angle%2C%20high%20detail%2C%20photorealistic&width=800&height=500&seq=cs_retail&orientation=landscape',
  },
  {
    key: 'healthcare',
    industry: '의료',
    title: '의료 정보 시스템 클라우드 전환',
    description:
      '병원 정보 시스템을 클라우드 환경으로 전환하여 전자차트, 영상 저장, 예약 시스템을 통합 운영합니다. 의료정보보호법 및 개인정보보호법을 준수하며 환자 데이터를 안전하게 관리합니다.',
    metrics: [
      { label: '데이터 암호화', value: '전체' },
      { label: '백업 주기', value: '1시간' },
      { label: '접근 통제', value: '역할 기반' },
    ],
    tags: ['의료정보보호법', '암호화', '통합 운영'],
    image:
      'https://readdy.ai/api/search-image?query=modern%20hospital%20digital%20health%20monitoring%20room%20with%20multiple%20screens%20showing%20patient%20data%2C%20clean%20medical%20technology%20environment%2C%20soft%20blue%20and%20white%20lighting%2C%20professional%20healthcare%20IT%20atmosphere%2C%20wide%20angle%2C%20high%20detail%2C%20photorealistic&width=800&height=500&seq=cs_health&orientation=landscape',
  },
  {
    key: 'media',
    industry: '미디어/엔터',
    title: '실시간 스트리밍 인프라 구축',
    description:
      '대규모 동시 접속을 처리하는 실시간 스트리밍 인프라를 구축하여 콘텐츠 전송 품질을 보장합니다. CDN 연동과 인코딩 파이프라인 자동화로 안정적인 방송·VOD 서비스를 제공합니다.',
    metrics: [
      { label: '동시 접속자', value: '100만+' },
      { label: '전송 지연', value: '<3초' },
      { label: '가용성', value: '99.95%' },
    ],
    tags: ['실시간 스트리밍', 'CDN', '자동화'],
    image:
      'https://readdy.ai/api/search-image?query=modern%20broadcast%20control%20room%20with%20multiple%20monitors%20showing%20live%20streaming%20and%20video%20content%2C%20clean%20media%20technology%20environment%2C%20warm%20ambient%20lighting%2C%20professional%20streaming%20studio%2C%20wide%20angle%2C%20high%20detail%2C%20photorealistic&width=800&height=500&seq=cs_media&orientation=landscape',
  },
];
