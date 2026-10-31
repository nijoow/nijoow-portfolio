export interface StudyCase {
  title: string;
  problem: readonly string[];
  approach: readonly string[];
  outcome: readonly string[];
  diagram?: StudyDiagram;
}
export interface StudyDiagram {
  kind: string;
  title: string;
  nodes: readonly { label: string; detail: string }[];
}
export interface StudyGuide {
  diagram?: StudyDiagram;
  mediaAfterDetails?: boolean;
  result?: string;
  reasons: readonly (readonly string[])[];
  stacks: readonly string[];
  ai?: string;
  cases?: readonly StudyCase[];
  sections: {
    features: string;
    details: string | false;
    diagram: string | false;
    impact?: string;
  };
}
export const workStudyGuides: Record<string, StudyGuide> = {
  'digital-asset-management': {
    reasons: [],
    cases: [
      {
        title: '폴더 목록에 상속 관계 표시',
        problem: [
          '폴더·파일을 관리하던 표준 자산 관리 솔루션을 공간·설비와 실물·가상 자산 관리에 맞게 확장했습니다. 이 시스템에서는 폴더가 클래스나 인스턴스일 수 있고, 그 아래에 하위 클래스와 인스턴스가 이어집니다.',
          '기존 목록은 이 항목들을 같은 깊이로 나열했습니다. 어떤 클래스를 상속한 하위 클래스·인스턴스인지 목록 안에서 알 수 있도록 표현을 바꿔야 했습니다.',
        ],
        approach: [
          '각 행에 클래스·인스턴스 구분을 표시하고 상위 클래스 아래에 하위 항목을 들여썼습니다. 연결선을 함께 표시해 같은 클래스에서 파생된 항목을 묶어 볼 수 있게 했습니다.',
          '맡은 기능의 기존 코드와 요구사항을 확인하고, 목록의 계층 표현과 관련 데이터 처리·입력 제약을 변경된 자산 개념과 업무 규칙에 맞춰 수정했습니다.',
        ],
        outcome: [],
        diagram: {
          kind: 'hierarchy',
          title: '같은 항목을 나열하는 두 가지 방식',
          nodes: [],
        },
      },
      {
        title: '서버 상태·UI 상태·폼의 책임 구분',
        problem: [
          '기존 Redux·Redux-Saga의 반복 코드와 비동기 처리 흐름을 정리하면서도 기능 변경과 신규 환경 이관을 함께 진행해야 했습니다.',
        ],
        approach: [
          '담당 영역의 서버 상태를 TanStack Query로 단계적으로 이관하고 UI 상태는 Zustand로 분리했습니다. 폼 입력과 검증에는 React Hook Form·Zod를 적용했습니다.',
          '공통 UI와 반복 로직을 한곳에서 수정할 수 있도록 정리하고 데이터 처리와 UI의 역할을 구분했습니다. 팀원들과 미사용 기능·의존성도 정리했습니다.',
        ],
        outcome: [
          '전체 프론트엔드 개발 소스 규모를 팀 공동 작업으로 약 20% 줄였습니다. 저는 담당 기능의 전환·공통화·미사용 코드 정리에 참여했습니다.',
        ],
        diagram: {
          kind: 'responsibilities',
          title: '상태 관리 도구별 역할',
          nodes: [
            {
              label: 'TanStack Query',
              detail: '서버 조회·갱신 상태',
            },
            {
              label: 'Zustand',
              detail: '클라이언트 UI 상태',
            },
            {
              label: 'React Hook Form · Zod',
              detail: '폼 입력·검증',
            },
          ],
        },
      },
    ],
    stacks: [
      'Next.js',
      'TypeScript',
      'TanStack Query',
      'Zustand',
      'React Hook Form',
      'Zod',
    ],
    ai: '기획이 구체적이지 않은 기능은 먼저 동작하는 화면을 만들어 클라이언트와 요구사항을 정했습니다. AI로 작성한 코드의 주요 로직과 화면 동작을 확인하고 수정했으며, 기술 전환 방향은 팀원들과 함께 검토했습니다.',
    sections: {
      features: '맡은 작업',
      details: '기존 솔루션을 변경한 과정',
      diagram: false,
    },
    mediaAfterDetails: true,
  },
  'process-safety-management': {
    reasons: [],
    cases: [
      {
        title: '픽셀 대신 GPS 좌표로 위치와 크기 저장',
        problem: [
          '전체 도면에서 구역을 클릭하면 해당 상세 도면으로 이동하고, 작업 위치를 두 도면의 알맞은 위치에서 실제 축척에 비례하는 크기로 표시·수정해야 했습니다.',
          '도면마다 이미지 크기가 달라 위치와 크기를 픽셀 값 그대로 저장하면 전체·상세 도면에서 같은 작업 위치를 연동할 수 없었습니다.',
        ],
        approach: [
          '전체 도면의 구역 이동은 react-image-mapper에 구역 좌표를 지정해 연결했습니다. 작업 위치는 중앙에 도형을 띄운 뒤 react-moveable로 드래그와 크기 조절을 할 수 있게 했습니다.',
          '이미지 모서리의 실제 위도·경도를 기준으로 위치와 크기를 GPS 좌표로 변환하는 함수를 만들고, 변환한 값을 서버에 저장했습니다. 불러올 때는 각 도면 이미지의 크기에 맞춰 역변환했습니다.',
          'react-moveable은 엘리먼트 이동에 CSS transform을 사용했습니다. 따라서 저장값을 불러오는 것만으로 끝나지 않고, 복원한 위치와 크기를 다시 transform 값으로 변환하는 계산이 필요했습니다. 이 계산을 조정하는 시행착오를 거쳐 저장·불러오기·재수정 흐름을 연결했습니다.',
        ],
        outcome: [],
        diagram: {
          kind: 'coordinates',
          title: '서로 다른 도면에서 같은 위치 찾기',
          nodes: [],
        },
      },
      {
        title: '자유 곡선을 SVG 요소로 변환',
        problem: [
          '도면 출력을 위한 글·도형·스티커 마크업이 필요했습니다. 그중 직접 그린 자유 곡선을 다른 도형처럼 조작하고 저장·수정하는 부분이 까다로웠습니다.',
        ],
        approach: [
          '그린 path 좌표로 곡선의 범위를 구하고, 그 범위에 맞는 viewBox를 가진 SVG로 묶었습니다.',
          '곡선을 하나의 SVG 요소로 다룰 수 있게 되면서 다른 도형에 적용했던 이동·저장·복원 방식을 함께 사용할 수 있었습니다.',
        ],
        outcome: [],
        diagram: {
          kind: 'path-bounds',
          title: '경로의 범위를 SVG의 viewBox로',
          nodes: [],
        },
      },
      {
        title: 'PWA 적용과 모바일 이동 오류 수정',
        problem: [
          '기존 앱 WebView에서 외부 링크 이동과 뒤로가기 문제가 발생했습니다.',
        ],
        approach: [
          'PWA 도입을 제안하고 서비스워커를 적용한 프로토타입을 만들어 이동·링크 동작을 확인했습니다. 이후 FCM 푸시 알림을 연동했습니다.',
        ],
        outcome: [
          'PWA와 FCM을 실제 운영에 반영했습니다. 별도로 문서 목록에는 React Query와 MUI DataGrid의 서버사이드 페이지네이션·정렬·필터링을 연결하고 한·영 UI와 Jenkins 빌드 자동화를 담당했습니다.',
        ],
      },
    ],
    stacks: [
      'Next.js',
      'TypeScript',
      'Recoil',
      'React Query',
      'NextAuth',
      'Material UI',
      'PWA',
      'FCM',
      'react-image-mapper',
      'react-moveable',
      'SVG',
      'Jenkins',
      'MUI DataGrid',
    ],
    sections: {
      features: '맡은 작업',
      details: '도면 조작과 모바일 사용',
      diagram: false,
    },
    mediaAfterDetails: true,
  },
  'atop-dms': {
    reasons: [],
    cases: [
      {
        title: '변수 박스와 텍스트 커서의 위치 맞추기',
        problem: [
          '수식 입력창에는 일반 텍스트와 함께 변수명·유형·설정 버튼을 가진 박스가 들어가야 했습니다. 텍스트를 편집하는 위치와 박스를 그리는 위치가 달라지면 커서가 화면에서 보이는 변수와 어긋날 수 있었습니다.',
        ],
        approach: [
          '실제 입력은 textarea가 맡고, 변수 박스와 수식 색상은 별도 표시 레이어에서 그렸습니다. 입력 텍스트는 투명하게 두고 커서는 유지했으며, 두 레이어의 글자 크기·행간·패딩을 맞춰 같은 위치에 겹치도록 했습니다.',
          '변수는 {_…_} 형태의 표시 문자열로 구분했습니다. 이 문자열을 표시 레이어에 남기고 해당 영역에 변수 박스를 absolute로 겹쳐 배치했습니다. 변수 박스에는 유형과 이름, 필요한 경우 설정 버튼을 넣었습니다.',
          '변수 박스가 줄 경계에서 입력 텍스트와 어긋나지 않도록, _가 포함된 표시 문자열과 word-break: keep-all을 함께 사용해 줄바꿈을 조정했습니다.',
          '표시 문자열의 시작·끝 위치와 textarea의 selectionStart·selectionEnd를 비교해 방향키 이동을 처리했습니다. 커서가 변수 내부에 있을 때는 setSelectionRange로 시작 또는 끝 경계로 옮기고, 변수 내부를 클릭했을 때도 끝 경계로 정렬했습니다.',
          'Backspace로는 변수 하나가 함께 삭제되도록 입력 동작을 맞췄습니다. 변수 추가와 수식 오류 처리도 함께 구현했습니다.',
        ],
        outcome: [],
        diagram: {
          kind: 'formula',
          title: '입력 문자열과 변수 박스를 겹치는 구조',
          nodes: [],
        },
      },
      {
        title: '표 데이터 변환과 셀 범위의 양방향 연동',
        problem: [
          'React Spreadsheet와 MUI DataGrid에 전달하는 데이터 형식이 달랐습니다. 엑셀에서 읽은 값을 각 표가 사용할 수 있도록 정제하고, 셀 범위 선택도 화면과 입력창에 연결해야 했습니다.',
        ],
        approach: [
          '각 표 라이브러리에 맞게 데이터를 변환하고 선택 범위를 나타내는 데이터도 맞췄습니다. 시작·끝 입력창에 A4, D22 같은 주소를 입력하면 해당 범위가 선택되고, 반대로 표에서 셀을 선택하면 입력창의 값도 바뀌도록 연결했습니다.',
          '기존 표 데이터를 MUI DataGrid 형식으로 전환하고 가상 스크롤을 적용했습니다. 기존 엑셀 업로드 코드는 한 시트를 전제로 작성돼 있었습니다. 파일 안의 여러 시트를 읽고 사용자가 선택한 시트의 데이터로 표가 바뀌도록 수정했습니다. 데이터를 정제하고 Apache ECharts로 차트를 시각화했습니다.',
        ],
        outcome: [],
        diagram: {
          kind: 'sheet-range',
          title: '셀 주소 입력과 표 선택의 양방향 연동',
          nodes: [],
        },
      },
    ],
    stacks: [
      'Next.js',
      'TypeScript',
      'Recoil',
      'React Query',
      'Material UI',
      'Apache ECharts',
      'React Hook Form',
      'MUI DataGrid',
      'React Spreadsheet',
      'react-mentions',
    ],
    sections: {
      features: '맡은 작업',
      details: '수식 입력과 표 구현',
      diagram: false,
    },
    mediaAfterDetails: true,
  },
  fromyou: {
    diagram: {
      kind: 'flow',
      title: '독자가 고른 정보에 따라 이어지는 기사',
      nodes: [
        {
          label: '지역 선택',
          detail: 'SVG 지도',
        },
        {
          label: '연령·관심사',
          detail: '차트 선택·드래그로 순서 변경',
        },
        {
          label: '기사 읽기',
          detail: '선택 정보를 반영한 콘텐츠 흐름',
        },
      ],
    },
    reasons: [
      [
        'SVG · Nivo · dnd-kit',
        '지역·연령대·관심사를 각각 지도·차트·드래그 선택으로 표현했습니다.',
      ],
      [
        'Framer Motion',
        '콘텐츠에 맞는 화면 전환과 스크롤 애니메이션을 구현했습니다.',
      ],
      ['AWS Amplify', '반응형 웹을 배포하고 서브도메인을 연결했습니다.'],
    ],
    stacks: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Framer Motion',
      'dnd-kit',
      'Nivo',
      'SVG',
      'AWS Amplify',
    ],
    sections: {
      features: '맡은 작업',
      details: '화면을 구체화한 과정',
      diagram: '독자의 선택 흐름',
      impact: '관련 보도',
    },
    result:
      '개발에 참여한 From You를 활용한 인천일보 팀의 보도가 제423회 이달의 기자상을 받았습니다.',
  },
  'doodin-calendar': {
    reasons: [
      [
        'TanStack Query · React Hook Form',
        '서버의 조회·갱신 상태와 저장 전 입력을 분리했습니다.',
      ],
      [
        'Cloudflare · PWA',
        '접근을 제한하면서 여러 기기에서 사용할 수 있도록 구성했습니다.',
      ],
    ],
    stacks: [
      'React',
      'TypeScript',
      'Vinext',
      'Tailwind CSS',
      'TanStack Query',
      'React Hook Form',
      'Zod',
      'Cloudflare Workers · D1 · R2',
      'Cloudflare Access',
      'PWA',
    ],
    ai: '댓글·반응과 홈 사진처럼 함께 쓰면서 필요해진 기능을 정리해 AI로 구현했습니다. 실제 저장·수정·이동 동작을 확인하고 오류를 수정했으며, 반복 확인이 필요한 데이터 처리에는 테스트를 구성했습니다.',
    sections: {
      features: '구현할 때 정한 것',
      details: '함께 쓰면서 바꾼 부분',
      diagram: false,
    },
    mediaAfterDetails: true,
  },
  'ios-keyboard': {
    diagram: {
      kind: 'composition',
      title: '입력된 글자는 두고, 조합 중인 글자만 갱신',
      nodes: [],
    },
    reasons: [
      [
        'UIKit · SwiftUI',
        '실제 입력을 담당하는 키보드 확장과 설정 앱의 역할을 나눴습니다.',
      ],
      [
        'App Groups',
        '키보드 확장과 설정 앱에서 같은 설정을 사용하도록 연결했습니다.',
      ],
    ],
    stacks: ['Swift', 'UIKit', 'SwiftUI', 'App Groups'],
    ai: '배열과 커서 조작 방식을 정하고 AI 도구로 코드를 작성했습니다. 제 iPhone에서 한글 입력과 커서 이동을 반복해서 사용하며 불편한 동작을 수정했습니다.',
    sections: {
      features: '주요 기능',
      details: '입력 동작을 다듬은 과정',
      diagram: '키 입력과 한글 조합',
      impact: '직접 사용하며',
    },
    result:
      '개인 iPhone에 설치해 사용하고 있습니다. 숫자 키와 커서 이동 버튼을 익숙한 위치에 두어 편하게 사용하고 있습니다.',
  },
  'fromis9-stickers': {
    reasons: [
      [
        '@use-gesture/react',
        '모바일의 두 손가락 확대·회전 조작을 구현했습니다.',
      ],
      [
        'modern-screenshot',
        '편집 메뉴를 제외한 결과 영역을 PNG로 저장하는 데 사용했습니다.',
      ],
    ],
    stacks: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Framer Motion',
      'Zustand',
      '@use-gesture/react',
      'modern-screenshot',
    ],
    ai: '사진과 문구를 배치하는 편집 화면을 AI와 구현했습니다. 선택·잠금·겹침 순서와 모바일의 확대·회전이 의도대로 동작하는지 직접 확인하고 수정했습니다.',
    sections: {
      features: '주요 기능',
      details: false,
      diagram: false,
    },
  },
  'lessor-panda-village': {
    reasons: [],
    stacks: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Supabase 2 (Auth · Postgres · Realtime)',
      'Zustand 5',
      'Three.js r183',
      'React Three Fiber 9',
      '@react-three/drei 10',
      '@react-three/postprocessing',
      'Tailwind CSS 4',
      'Framer Motion',
    ],
    ai: '공간의 분위기와 캐릭터 동작을 정하고 AI 도구로 구현·수정했습니다. 생성형 3D 에셋을 사용했으며, 화면에서 직접 움직여 보며 이동과 상호작용을 확인했습니다.',
    sections: {
      features: '주요 기능',
      details: false,
      diagram: false,
    },
  },
  'nijoow-shopping-mall': {
    diagram: {
      kind: 'flow',
      title: '디자인을 저장하고 주문하는 순서',
      nodes: [
        {
          label: '3D 커스터마이징',
          detail: '색상·재질·각인·실행 취소',
        },
        {
          label: '디자인 저장',
          detail: '구성·미리보기·공유',
        },
        {
          label: '주문 데모',
          detail: '서버 검증·중복 요청 처리·모의 승인',
        },
      ],
    },
    reasons: [
      [
        'React Three Fiber · Three.js',
        '편집한 색상·재질·각인을 3D 미리보기에 연결했습니다.',
      ],
      [
        'Zod · SQLite · PostgreSQL',
        '서버 입력을 검증하고 로컬과 배포 환경의 저장 계층을 구성했습니다.',
      ],
    ],
    stacks: [
      'Next.js',
      'React',
      'TypeScript',
      'React Three Fiber',
      'Three.js',
      'Auth.js',
      'Zod',
      'SQLite · PostgreSQL',
      'CSS',
    ],
    ai: '화면 방향과 기능 범위를 정하고 AI와 구현했습니다. 편집한 디자인이 저장·장바구니·주문까지 이어지는지 확인하고, 저장과 주문 처리에는 자동 테스트를 구성했습니다.',
    sections: {
      features: '편집에서 주문까지',
      details: false,
      diagram: '작업 흐름',
    },
  },
  portfolio: {
    reasons: [
      [
        'Next.js · TypeScript',
        '작업 데이터와 라우트·메타데이터를 연결했습니다.',
      ],
      [
        'React Three Fiber',
        '홈의 손글씨 파티클 로고를 구현하고 WebGL 실패 시 정적 화면을 제공합니다.',
      ],
      [
        'TanStack Query',
        '서버 API로 정규화한 최근 활동 데이터를 화면에 연결했습니다.',
      ],
    ],
    stacks: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'React Three Fiber',
      'Framer Motion',
      'TanStack Query',
    ],
    ai: '손글씨 로고와 화면 분위기, 작업을 보여주는 순서를 정하고 AI와 구현·리팩터링을 진행했습니다. 모바일 배치와 본문 가독성, 인터랙션을 화면에서 확인하며 다듬었습니다.',
    sections: {
      features: '화면과 데이터 구성',
      details: false,
      diagram: false,
    },
  },
  launchpad: {
    diagram: {
      kind: 'timeline',
      title: '누름·해제 이벤트와 소리 제어',
      nodes: [
        {
          label: '입력 시작',
          detail: '마우스·키보드·터치',
        },
        {
          label: '재생 제어',
          detail: '누르기와 떼기 이벤트 구분',
        },
        {
          label: '사운드 출력',
          detail: '드럼·피아노 모드',
        },
      ],
    },
    reasons: [],
    stacks: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    ai: '건반 구성과 입력 방식을 정하고 AI와 구현했습니다. 누르기·떼기 동작에 맞춰 소리가 재생되도록 코드를 검토하고 수정했습니다.',
    sections: {
      features: '주요 기능',
      details: '입력과 소리의 재생 시점',
      diagram: '작업 흐름',
    },
  },
  ml3yp: {
    reasons: [
      [
        'Three.js · React Three Fiber',
        '3D 공간과 TV 화면 속 플레이어를 구성했습니다.',
      ],
      [
        'Orbit Controls',
        '공간을 다른 각도에서 탐색하는 카메라 조작에 사용했습니다.',
      ],
    ],
    stacks: [
      'Next.js',
      'TypeScript',
      'Three.js',
      'React Three Fiber',
      'Framer Motion',
      'Tailwind CSS',
    ],
    ai: '공간의 분위기와 영상 조작 방식을 정하고 AI와 구현했습니다. 카메라 이동과 영상 배치, 플레이리스트 동작을 확인하며 수정했습니다.',
    sections: {
      features: '주요 기능',
      details: false,
      diagram: false,
    },
  },
  'svg-drawing': {
    diagram: {
      kind: 'rotation',
      title: '회전된 도형의 축을 기준으로 크기 조절',
      nodes: [],
    },
    reasons: [
      [
        'SVG path',
        '도형과 직접 그린 경로를 같은 편집 데이터에서 표현했습니다.',
      ],
    ],
    stacks: ['Next.js', 'TypeScript', 'Recoil', 'Tailwind CSS'],
    sections: {
      features: '그리기와 편집 기능',
      details: '좌표와 편집 동작',
      diagram: '도형과 경로의 편집 구조',
    },
  },
  cusmetic: {
    reasons: [
      [
        'Next.js · NextAuth',
        '세션 기반 인증 화면과 소셜 로그인을 구성했습니다.',
      ],
      [
        'URL 쿼리 · 디바운스',
        '검색 맥락을 유지하고 입력 중 불필요한 조회를 줄이도록 적용했습니다.',
      ],
    ],
    stacks: ['Next.js', 'TypeScript', 'Recoil', 'Tailwind CSS', 'NextAuth'],
    sections: {
      features: '맡은 작업',
      details: '이전 데이터가 보이는 문제',
      diagram: false,
    },
  },
  moharu: {
    reasons: [],
    stacks: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Auth.js'],
    sections: {
      features: '맡은 작업',
      details: 'LTE 접속 오류',
      diagram: false,
    },
  },
  moimcity: {
    reasons: [],
    stacks: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Zustand',
      'Framer Motion',
    ],
    sections: {
      features: '맡은 작업',
      details: '리뉴얼 중 수정한 문제',
      diagram: false,
    },
  },
  'ev-charging-management': {
    reasons: [],
    stacks: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Zustand',
      'React Hook Form',
      'Zod',
    ],
    sections: {
      features: '맡은 작업',
      details: '테이블별 상태 관리',
      diagram: false,
    },
  },
  quve: {
    reasons: [],
    stacks: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Zustand',
      'TanStack Query',
    ],
    ai: 'Figma MCP로 만든 화면을 디자인과 비교하며 구조와 CSS를 수정했습니다.',
    sections: {
      features: '맡은 작업',
      details: false,
      diagram: false,
    },
  },
  treenow: {
    reasons: [
      ['React · TypeScript', '반응형 웹의 개발 환경과 화면을 구성했습니다.'],
      [
        'React Native WebView',
        '웹 화면을 사용하는 하이브리드 앱을 개발했습니다.',
      ],
    ],
    stacks: [
      'React.js',
      'TypeScript',
      'Recoil',
      'Tailwind CSS',
      'React Native WebView',
    ],
    sections: {
      features: '맡은 작업',
      details: false,
      diagram: false,
    },
  },
  memory: {
    reasons: [],
    stacks: ['HTML', 'CSS', 'JavaScript'],
    sections: {
      features: '참여한 작업',
      details: false,
      diagram: false,
    },
  },
  'return-to-blank': {
    diagram: {
      kind: 'art-sequence',
      title: '스크린을 누르고 손을 뗄 때',
      nodes: [
        {
          label: '붓으로 스크린 누르기',
          detail: 'Kinect 깊이 인식',
        },
        {
          label: '그림이 이어짐',
          detail: 'Unity VFX 파티클',
        },
        {
          label: '손을 뗌',
          detail: '잔상 소멸·백지로 복귀',
        },
      ],
    },
    reasons: [
      ['Kinect v1', '스크린의 깊게 눌린 위치와 손을 떼는 상태를 감지했습니다.'],
      ['Unity VFX Graph', '물감이 번지는 듯한 파티클 효과를 표현했습니다.'],
    ],
    stacks: ['Unity', '빔프로젝터', 'Kinect v1', '패브릭 스크린'],
    sections: {
      features: '제작한 부분',
      details: false,
      diagram: '관객의 움직임과 작품의 반응',
    },
  },
  'catch-the-candy': {
    diagram: {
      kind: 'flow',
      title: '바구니 선택부터 결과 확인까지',
      nodes: [
        {
          label: '바구니 선택',
          detail: '빨강·파랑 중 선택',
        },
        {
          label: '게임 진행',
          detail: '마우스 이동으로 사탕 받기',
        },
        {
          label: '결과 확인',
          detail: '타이머 종료 후 결과 표시',
        },
      ],
    },
    reasons: [
      [
        'Processing · Arduino · Kinect v1',
        '졸업전시 작품의 입력과 인터랙션에 사용했습니다.',
      ],
      [
        'p5.js',
        '웹에서는 마우스로 바구니를 움직이며 게임을 할 수 있도록 구현했습니다.',
      ],
    ],
    stacks: ['Processing', 'Arduino', 'Kinect v1', 'JavaScript (p5.js)'],
    sections: {
      features: '참여한 작업',
      details: false,
      diagram: '게임 진행',
    },
  },
};
