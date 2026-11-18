export type ProjectType = 'business' | 'side';

export interface Work {
  pageName: string;
  name: string;
  imgSrc?: string;
  projectType: ProjectType;
  isFreelance?: boolean;
  disclosure?: 'full' | 'limited';
  tags: readonly string[];
  description?: string;
  role?: string;
  organization?: string;
  period?: string;
  liveUrl?: string;
  repoUrl?: string;
  status: 'published' | 'archive' | 'draft';
}

export const works: readonly Work[] = [
  {
    pageName: 'return-to-blank',
    name: 'return-to-blank',
    imgSrc: 'return-to-blank.webp',
    projectType: 'side',
    tags: ['Interactive'],
    description:
      'Kinect 카메라와 Unity를 활용해 선행성 기억상실증을 표현한 졸업전시 인터랙티브 미디어아트',
    role: '기획·인터랙티브 개발',
    period: '2021.',
    liveUrl: 'https://www.youtube.com/watch?v=11Wplgnpt90',
    repoUrl: 'https://github.com/nijoow/return-to-blank',
    status: 'published',
  },
  {
    pageName: 'memory',
    name: 'MEMORY',
    imgSrc: 'pnudt12.webp',
    projectType: 'side',
    tags: ['Web', 'Interactive', 'Design', 'Frontend', 'AI 활용 개발'],
    description:
      '가로 스크롤과 인터랙티브 요소를 활용한 부산대학교 디자인앤테크놀로지 졸업전시회 아카이브 웹사이트',
    role: '기획·디자인·퍼블리싱',
    period: '2021.',
    liveUrl: 'https://nijoow.github.io/PNUDT12/pages/about.html',
    repoUrl: 'https://github.com/nijoow/PNUDT12',
    status: 'published',
  },
  {
    pageName: 'catch-the-candy',
    name: 'CATCH THE CANDY',
    imgSrc: 'catchTheCandy.webp',
    projectType: 'side',
    tags: ['Web', 'Interactive'],
    description:
      '편향(Bias)이라는 주제를 담아 Processing/Arduino 작품을 p5.js 웹 게임으로 구현한 인터랙티브 아트',
    role: '기획·게임 개발',
    period: '2021.',
    liveUrl: 'https://nijoow.github.io/CatchTheCandy_p5/',
    repoUrl: 'https://github.com/nijoow/CatchTheCandy_p5',
    status: 'published',
  },
  {
    pageName: 'portfolio',
    name: 'portfolio',
    imgSrc: 'portfolio/01-portfolio-3d-logo-home.png',
    projectType: 'side',
    tags: ['Web', 'Interactive', 'Design', '3D', 'Frontend', 'AI 활용 개발'],
    description:
      '3D 파티클 로고와 작업 아카이브, 최근 활동, 연락 기능을 담은 개인 포트폴리오 웹사이트',
    role: 'UX/UI·프론트엔드',
    period: '2022. ~',
    liveUrl: 'https://nijoow-portfolio.vercel.app',
    repoUrl: 'https://github.com/nijoow/nijoow-portfolio',
    status: 'published',
  },
  {
    pageName: 'treenow',
    name: 'Treenow',
    imgSrc: 'treenow.webp',
    projectType: 'business',
    tags: ['Web', 'Frontend'],
    description: 'B2B 조경 수목 거래 하이브리드 앱 플랫폼',
    role: '프론트엔드·하이브리드 앱',
    organization: '주식회사 비멕스',
    period: '2022.09 ~ 2023.01',
    status: 'published',
  },
  {
    pageName: 'svg-drawing',
    name: 'svg-drawing',
    imgSrc: 'nijoow-drawing.webp',
    projectType: 'side',
    tags: ['Web', 'Frontend', 'Interactive', 'Design'],
    description: 'SVG 기반 벡터 드로잉 웹 애플리케이션',
    role: '프론트엔드·SVG 좌표 계산',
    liveUrl: 'https://nijoow-drawing.vercel.app/',
    repoUrl: 'https://github.com/nijoow/svg-drawing',
    status: 'published',
  },
  {
    pageName: 'cusmetic',
    name: 'cusmetic',
    imgSrc: 'cusmetic.webp',
    projectType: 'business',
    tags: ['Web', 'Frontend'],
    description: '맞춤형 피부타입 진단 및 화장품 추천 서비스',
    role: '프론트엔드 개발',
    organization: '주식회사 비멕스',
    period: '2023.10 ~ 2024.01',
    status: 'published',
  },
  {
    pageName: 'process-safety-management',
    name: '공정 안전 관리 시스템',
    projectType: 'business',
    disclosure: 'limited',
    tags: ['Web', 'Frontend'],
    description: '공정 프로세스의 작업 및 문서를 관리하는 B2B 웹 시스템',
    role: '프론트엔드 개발',
    organization: '주식회사 비멕스',
    period: '2023.03 ~ 2024.07',
    status: 'published',
  },
  {
    pageName: 'moharu',
    name: 'moharu',
    imgSrc: 'moharu.webp',
    projectType: 'side',
    tags: ['Web', 'Frontend'],
    description: '비사이드 포텐데이 해커톤에서 진행한 취미 활동 추천 서비스',
    role: '프론트엔드·배포',
    status: 'published',
  },
  {
    pageName: 'atop-dms',
    name: 'ATOP.DMS',
    imgSrc: 'atop-dms/main.webp',
    projectType: 'business',
    tags: ['Web', 'Frontend'],
    description: '기업 맞춤형 데이터 관리 시스템 SaaS',
    role: '프론트엔드 개발',
    organization: '주식회사 비멕스',
    period: '2024.05 ~ 2024.12',
    status: 'published',
  },
  {
    pageName: 'fromyou',
    name: '독자시점주의 From You',
    imgSrc: 'fromyou.webp',
    projectType: 'business',
    isFreelance: true,
    tags: ['Web', 'Frontend', 'Interactive', 'Design'],
    description: '인천일보 인터랙티브 스크롤텔링 웹사이트',
    role: 'UX/UI·프론트엔드',
    organization: '인천일보',
    period: '2025.04 ~ 2025.12',
    status: 'published',
  },
  {
    pageName: 'moimcity',
    name: '모임특별시',
    imgSrc: 'moimcity/moimcity.webp',
    projectType: 'business',
    isFreelance: true,
    tags: ['Web', 'Frontend'],
    description: '취향 기반 소셜 모임 플랫폼',
    role: '프론트엔드·리팩터링',
    organization: '(주)모임특별시',
    period: '2025.10 ~ 2025.11',
    status: 'published',
  },
  {
    pageName: 'ml3yp',
    name: 'Midnight Lo-fi 3D YouTube Player',
    imgSrc: 'ml3yp.webp',
    projectType: 'side',
    tags: ['Web', 'Frontend', '3D', 'Interactive', 'Design', 'AI 활용 개발'],
    description: '몰입형 3D 가상 공간 속 YouTube 플레이리스트 플레이어',
    role: 'UX/UI·개발',
    liveUrl: 'https://ml3yp.vercel.app/',
    repoUrl: 'https://github.com/nijoow/midnight-lofi-3d-youtube-player',
    status: 'published',
  },
  {
    pageName: 'fromis9-stickers',
    name: '프로미스나인 스티커 꾸미기',
    imgSrc: 'fromis9-stickers.webp',
    projectType: 'side',
    tags: ['Web', 'Interactive', 'Design', 'Frontend', 'AI 활용 개발'],
    description: '팬덤용 스티커 꾸미기 웹사이트',
    role: 'UX/UI·프론트엔드',
    liveUrl: 'https://fromis9-stickers.vercel.app/',
    status: 'published',
  },
  {
    pageName: 'launchpad',
    name: 'launchpad',
    imgSrc: 'launchpad/01-launchpad-drum-mode.png',
    projectType: 'side',
    tags: ['Web', 'Interactive', 'Frontend', 'Design', 'AI 활용 개발'],
    description: '웹 브라우저 기반의 런치패드 악기 연주 토이 프로젝트',
    role: 'UX/UI·프론트엔드',
    liveUrl: 'https://nijoow-launchpad.vercel.app/',
    repoUrl: 'https://github.com/nijoow/launchpad',
    status: 'published',
  },
  {
    pageName: 'nijoow-shopping-mall',
    name: '3D Shopping Mall',
    imgSrc: 'nijoow-shopping-mall/01-shopping-mall-home.png',
    projectType: 'side',
    tags: [
      'Web',
      'Frontend',
      'Backend',
      'Design',
      '3D',
      'Interactive',
      'AI 활용 개발',
    ],
    description:
      '3D 스니커즈 커스터마이징과 디자인 저장·공유, 상품 탐색과 주문 흐름을 연결한 쇼핑몰 데모',
    role: '풀스택 개발',
    period: '2024.08 ~',
    liveUrl: 'https://nijoow-shopping-mall.vercel.app/',
    repoUrl: 'https://github.com/nijoow/shopping-mall',
    status: 'published',
  },
  {
    pageName: 'ios-keyboard',
    imgSrc: 'keyboard/keyboard-settings-and-theme-selection.webp',
    name: '아이폰 커스텀 키보드',
    projectType: 'side',
    tags: ['iOS', 'Interactive', 'Design', 'AI 활용 개발'],
    description:
      '숫자 입력과 커서 이동의 불편을 줄이기 위해 만들어 직접 사용하는 한글·영문 키보드',
    role: '기획·UX/UI·구현 검토·사용 검증',
    status: 'published',
  },
  {
    pageName: 'doodin-calendar',
    imgSrc: 'doodin-calendar/home-overview.png',
    name: '두딘캘린더',
    projectType: 'side',
    tags: ['Web', 'Frontend', 'Design', 'AI 활용 개발'],
    description:
      '여자친구와 둘이 일정과 기록을 나누며, 실제 사용 피드백으로 개선하는 비공개 캘린더',
    role: '기획·UX/UI·구현 검토·운영',
    status: 'published',
  },
  {
    pageName: 'lessor-panda-village',
    name: '레서판다 빌리지',
    imgSrc: 'lessor-panda-village/01-panda-village-overview.png',
    projectType: 'side',
    tags: ['Web', 'Interactive', '3D', 'Frontend', 'AI 활용 개발'],
    description: '3D 캐릭터 기반 실시간 멀티플레이어 레서판다 마을',
    role: 'UX/UI·개발',
    period: '2026.03',
    liveUrl: 'https://lessor-panda-village.vercel.app/',
    repoUrl: 'https://github.com/nijoow/lessor-panda-village',
    status: 'published',
  },
  {
    pageName: 'digital-asset-management',
    name: '디지털 자산 관리 시스템 고도화',
    projectType: 'business',
    isFreelance: true,
    disclosure: 'limited',
    tags: ['Web', 'Frontend'],
    description:
      '디지털 자산의 등록·검색·분류·메타데이터·버전·권한 등을 관리하는 웹 애플리케이션 고도화',
    role: '프론트엔드 개발',
    organization: '(주)템페스트',
    period: '2026.05 ~ 현재',
    status: 'published',
  },
];

export const publicWorks = works.filter((work) => work.status !== 'draft');

export function getWork(pageName: string): Work | undefined {
  return works.find((work) => work.pageName === pageName);
}

export function getWorks(pageNames: readonly string[]): readonly Work[] {
  return pageNames.flatMap((pageName) => {
    const work = getWork(pageName);
    return work ? [work] : [];
  });
}
