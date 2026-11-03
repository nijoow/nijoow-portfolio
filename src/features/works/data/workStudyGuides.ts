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
  layout?: 'showcase';
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
        title: '기능 개발과 병행한 단계적 스택 전환',
        problem: [
          'Redux 기반 전역 로딩과 앱별 API 요청 처리, 기존 UI가 강하게 결합되어 있었습니다. 신규 기능을 개발하면서 상태 관리 구조도 바꿔야 했습니다.',
          '신규 기능 개발과 구조 변경을 함께 진행해야 했습니다. 전체 화면을 한 번에 교체하지 않고, 신규 화면과 연결된 페이지부터 전환한 뒤 나머지를 페이지 단위로 이관했습니다.',
        ],
        approach: [
          '신규 화면과 그에 영향을 받는 페이지부터 새 구조로 전환했습니다. 요구사항 개발을 마친 뒤 나머지 화면을 페이지 단위로 이관했습니다.',
          'Redux 기반 비동기 처리와 앱별 요청 코드를 정리하고, OpenAPI 스펙 기반 Hey API 코드 생성기와 공통 API 클라이언트로 요청·응답 DTO 타입을 맞췄습니다.',
          'API 조회 결과는 TanStack Query로 관리하고, 공유하거나 복원할 화면 조건은 URL에 저장했습니다. UI 상태는 공유 범위에 따라 Zustand와 useState를 나누어 사용하고, 폼 입력과 검증은 React Hook Form·Zod로 관리했습니다.',
        ],
        outcome: [],
        diagram: {
          kind: 'responsibilities',
          title: '상태 관리 도구별 역할',
          nodes: [
            {
              label: 'TanStack Query · Hey API',
              detail: 'Query Key 기반 서버 상태 캐싱 · OpenAPI DTO 표준화',
            },
            {
              label: 'URL Query · Zustand',
              detail: '공유 가능한 화면 조건 · 클라이언트 UI 상태',
            },
            {
              label: 'React Hook Form · Zod',
              detail: '폼 입력 관리 · 스키마 기반 검증',
            },
          ],
        },
      },
      {
        title: '공용 테이블과 액션 정의 정리',
        problem: [
          '테이블·팝업·선택 메뉴·입력 폼이 화면마다 다르게 구현되어 있었습니다. 목록의 컨텍스트 메뉴와 툴바 액션도 여러 곳에서 관리해 같은 기능을 수정할 때 관련 코드를 함께 찾아야 했습니다.',
        ],
        approach: [
          'TanStack Table 기반 공용 테이블에 가상·무한 스크롤, 열 너비 조절과 로컬 스토리지 저장, 좌측 고정 체크박스 열, 행 펼침 기능을 구현해 관리 화면과 자산·사용자 목록에 적용했습니다.',
          '여러 곳에 중복된 정의를 한곳에서 관리하는 SSOT(Single Source of Truth) 방식으로 정리했습니다. 목록의 컨텍스트 메뉴와 툴바가 같은 액션 정의를 참조하도록 바꾼 것도 그중 하나입니다.',
          '팝업·선택 메뉴·입력 요소를 공용 컴포넌트로 교체하고, 검색어·필터·탭의 세션 상태 유지와 날짜·시간 처리를 공용 모듈로 분리했습니다.',
          '구형 UI·목업·미참조 이미지·중복 export와 미사용 의존성을 삭제하고, 다른 화면에 영향을 주던 스타일을 정리했습니다. 색상 토큰을 맞추고 Next.js·TypeScript·Zod·TanStack Table 업데이트와 암묵적 any 정리도 진행했습니다.',
        ],
        outcome: [
          '이 정리 작업으로 프로젝트의 전체 프론트엔드 소스 규모가 약 20% 줄었습니다.',
        ],
      },
      {
        title: '자산 유형과 상속 관계를 보여주는 목록',
        problem: [
          '폴더·파일 외에 클래스와 인스턴스를 다루면서, 목록에서 자산 유형을 구분하고 어떤 항목을 상속받는지 확인할 수 있어야 했습니다.',
        ],
        approach: [
          'AI로 들여쓰기와 연결선이 있는 UI 프로토타입을 빠르게 만들어 클라이언트에게 보여주고, 이를 바탕으로 상속 관계를 표현하는 목록을 구현했습니다.',
          '폴더는 회색 폴더 아이콘, 클래스는 파란색 C, 인스턴스는 보라색 I로 구분했습니다. 파일은 PNG처럼 확장자가 표시된 파일 아이콘을 사용해 목록에서 유형을 알아볼 수 있게 했습니다.',
        ],
        outcome: [],
        diagram: {
          kind: 'hierarchy',
          title: '자산 유형과 상속 관계',
          nodes: [],
        },
      },
      {
        title: '워크스페이스와 사용자 권한을 한 화면에서 관리',
        problem: [
          '워크스페이스 권한과 사용자별 권한을 여러 곳에서 관리하고 있어, 관련 설정을 확인하고 수정하려면 화면을 오가야 했습니다.',
        ],
        approach: [
          '워크스페이스 권한과 사용자별 권한을 한 페이지에서 확인하고 변경할 수 있도록 UI와 사용 흐름을 설계했습니다. 프로토타입으로 화면 구성을 검토하며 권한 관리 화면을 구현했습니다.',
        ],
        outcome: [],
      },
    ],
    stacks: [
      'Next.js',
      'TypeScript',
      'TanStack Query',
      'TanStack Table',
      'Zustand',
      'React Hook Form',
      'Zod',
      'Hey API (OpenAPI)',
      'SCSS',
    ],
    ai: '스택 전환과 공용 컴포넌트 적용에도 AI Agent를 활용해 기존 코드를 탐색하고 수정했습니다.',
    sections: {
      features: '작업 범위',
      details: '구조 개선과 화면 설계',
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
          '도면마다 크기가 달라 화면의 픽셀 좌표를 그대로 재사용할 수 없었습니다. 이미지 모서리의 위도·경도를 기준으로 작업 위치와 크기를 변환해 저장하고, 전체·상세 도면에서 각각의 이미지 크기에 맞게 복원했습니다.',
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
        title: '도형과 자유선을 같은 방식으로 편집',
        problem: [
          '도면 출력을 위한 글·도형·스티커 마크업이 필요했습니다. 그중 직접 그린 자유 곡선을 다른 도형처럼 조작하고 저장·수정하는 부분이 까다로웠습니다.',
        ],
        approach: [
          '팝업에서 화살표나 사각형 도구를 누르면 캔버스에 도형을 추가하고, 자유선 도구를 누르면 직접 그리는 모드로 전환하도록 했습니다.',
          '그리기를 마치거나 모드를 종료하면 스케치 라이브러리의 결과를 SVG 객체로 변환했습니다. 그린 path 좌표로 곡선의 범위를 구하고, 그 범위에 맞는 viewBox로 묶었습니다.',
          '변환한 자유선에도 다른 도형과 같은 이동·크기 조절·회전을 적용하고, 같은 방식으로 저장하고 복원할 수 있게 했습니다.',
        ],
        outcome: [],
        diagram: {
          kind: 'path-bounds',
          title: '도면 마크업 편집',
          nodes: [],
        },
      },
      {
        title: '대용량 문서 목록의 검색·필터 조건 유지',
        problem: [
          '10만 건 이상의 문서를 다루는 목록에서 검색·필터 조건을 적용한 뒤 새로고침하거나 상세 화면에 다녀오면 조건이 초기화되어 반복 조회가 불편했습니다.',
        ],
        approach: [
          '10만 건 이상의 문서를 한 번에 가져오지 않고, 페이지·정렬·필터 조건에 맞는 목록을 서버에서 조회하도록 구성했습니다. 검색 조건은 URL에 저장해 새로고침하거나 상세 화면에 다녀온 뒤에도 유지했습니다.',
        ],
        outcome: [],
      },
      {
        title: '모바일 WebView의 이동 문제와 PWA 전환',
        problem: [
          '기존 모바일 앱 WebView에서 외부 링크 이동과 브라우저 뒤로가기 동작이 정상적으로 이어지지 않았습니다.',
        ],
        approach: [
          'PWA 도입을 제안하고 서비스워커를 적용한 프로토타입으로 외부 링크와 히스토리 이동 동작을 확인했습니다.',
          'FCM 푸시 알림을 연동하고 PWA를 운영 환경에 반영했습니다.',
        ],
        outcome: [],
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
      details: '도면·문서 목록과 모바일 사용',
      diagram: false,
    },
    mediaAfterDetails: true,
  },
  'atop-dms': {
    layout: 'showcase',
    reasons: [],
    cases: [
      {
        title: '변수 박스와 텍스트 커서의 위치 맞추기',
        problem: [
          '수식 입력창에는 일반 텍스트와 함께 변수명·유형·설정 버튼을 가진 박스가 들어가야 했습니다. 텍스트를 편집하는 위치와 박스를 그리는 위치가 달라지면 커서가 화면에서 보이는 변수와 어긋날 수 있었습니다.',
        ],
        approach: [
          '실제 입력은 textarea가 맡고, 변수 박스와 수식 색상은 별도 표시 레이어에서 그렸습니다. 입력 텍스트는 투명하게 두고 커서는 유지했으며, 두 레이어의 글자 크기·행간·패딩을 맞춰 같은 위치에 겹치도록 했습니다.',
          '{_…_} 표시 문자열은 변수 박스가 차지할 공간을 확보하고 커서가 이동할 변수의 시작·끝 경계를 구분하는 데 사용했습니다. 표시 레이어에는 변수 박스를 겹쳐 그리고, 커서는 변수 내부에 머물지 않도록 경계로 이동시켰습니다.',
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
          '셀 주소를 입력하는 방식과 표에서 직접 선택하는 방식을 함께 지원했습니다. A4·D22 같은 주소와 표의 선택 범위 데이터를 서로 변환해 어느 쪽에서 수정해도 같은 범위를 가리키도록 했습니다.',
          'React Spreadsheet와 MUI DataGrid가 요구하는 데이터 형식이 달라 엑셀에서 읽은 값을 DataGrid에 맞게 변환했습니다. 표 렌더링 지연을 줄이기 위해 가상 스크롤을 지원하는 DataGrid로 교체했습니다. 한 시트만 읽던 업로드 처리를 여러 시트를 읽도록 바꾸고, 선택한 시트의 데이터로 표를 전환할 수 있게 했습니다. 데이터를 정제하고 Apache ECharts로 차트를 시각화했습니다.',
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
  },
  fromyou: {
    layout: 'showcase',
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
      '해당 프로젝트를 활용한 인천일보 팀의 보도가 제423회 이달의 기자상을 받았습니다.',
  },
  'doodin-calendar': {
    layout: 'showcase',
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
  },
  'ios-keyboard': {
    layout: 'showcase',
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
    },
  },
  'fromis9-stickers': {
    layout: 'showcase',
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
    ai: 'AI로 스티커 편집 화면을 구현하고, 직접 사용하며 모바일 확대·회전과 레이어 선택·잠금 동작을 수정했습니다. 이미지를 저장할 때 편집 메뉴가 포함되지 않는지도 확인했습니다.',
    sections: {
      features: '주요 기능',
      details: false,
      diagram: false,
    },
  },
  'lessor-panda-village': {
    layout: 'showcase',
    reasons: [],
    cases: [
      {
        title: '다중 접속 시 캐릭터 위치가 튀는 현상 개선',
        problem: [
          '여러 사용자가 동시에 마을에 접속해 이동할 때 다른 방문자의 캐릭터 위치가 순간이동하듯 튀거나 끊겨 보이는 현상이 발생했습니다.',
          '로컬 이동 계산 주기와 실시간 네트워크 브로드캐스트 주기가 맞물리지 않고, 원격 좌표를 수신 즉시 그대로 반영한 것이 원인이었습니다.',
        ],
        approach: [
          '매 프레임 처리하는 로컬 이동·충돌 계산과 네트워크 상태 전송을 분리해, 위치·회전·동작에 의미 있는 변화가 있을 때만 최대 초당 10회(10Hz) 주기로 좌표를 전송하도록 스로틀링했습니다.',
          '다른 방문자의 좌표를 받을 때마다 바로 옮기면 움직임이 끊겨 보였습니다. 화면에서는 현재 위치와 전달받은 위치 사이를 보간해 이어서 이동하도록 바꿨습니다.',
        ],
        outcome: [],
      },
      {
        title: '이동 시 렌더링 부하 줄이기',
        problem: [
          '숲·강·벤치 등 지형 오브젝트와 파티클, 여러 캐릭터 애니메이션이 한꺼번에 렌더링되면서 프레임이 저하되어 캐릭터 움직임이 무겁고 느리게 느껴졌습니다.',
        ],
        approach: [
          '모든 지형과 장식물을 계속 표시하지 않고, 카메라 거리와 안개 범위에 따라 숨기도록 했습니다.',
          '원격 방문자 캐릭터는 카메라 거리에 따라 애니메이션 업데이트 주기를 낮추고(원거리 6~10fps) 가짜 그림자와 LOD를 적용했으며, 기기 환경에 맞춰 전환할 수 있는 그래픽 품질 프리셋(auto·low·medium·high)을 구성했습니다.',
        ],
        outcome: [],
      },
      {
        title:
          '비동기 조회 순서 역전으로 삭제한 방명록이 다시 보이는 문제 수정',
        problem: [
          '방명록 쪽지를 삭제한 직후, 삭제 요청 이전에 출발했던 목록 조회 응답이 뒤늦게 도착하면서 방금 지운 쪽지가 목록과 3D 게시판에 다시 나타나는 레이스 컨디션이 있었습니다.',
        ],
        approach: [
          '삭제가 확정되는 시점에 진행 중이던 이전 조회 결과를 무효화하고, UI 목록과 3D 공간의 게시판 표시 상태, 로컬 캐시가 즉시 같은 상태를 바라보도록 동기화 순서를 정리했습니다.',
        ],
        outcome: [],
      },
    ],
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
    ai: 'AI와 생성형 3D 에셋으로 마을과 멀티플레이 기능을 구현했습니다. 좌표 전송과 보간, 거리별 렌더링 처리, 방명록의 비동기 조회 순서 개선에도 AI를 활용했습니다.',
    sections: {
      features: '주요 기능',
      details: '트러블슈팅',
      diagram: false,
    },
  },
  'nijoow-shopping-mall': {
    layout: 'showcase',
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
    ai: 'AI로 3D 커스터마이저와 주문 흐름을 구현했습니다. 디자인 저장과 장바구니 연동, 중복 주문 방지를 직접 확인하고 자동화 테스트로 점검했습니다.',
    sections: {
      features: '편집에서 주문까지',
      details: false,
      diagram: '작업 흐름',
    },
  },
  portfolio: {
    layout: 'showcase',
    reasons: [
      [
        'Next.js · TypeScript',
        '작업 데이터와 라우트·메타데이터를 연결했습니다.',
      ],
      [
        'React Three Fiber',
        '홈의 파티클 로고를 구현하고 WebGL 실패 시 정적 화면을 제공합니다.',
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
    ai: '파티클 로고와 화면 분위기, 작업을 보여주는 정보 구조를 설계하고 AI와 함께 빠르게 구현·개편했습니다. 모바일 가독성과 프로젝트 탐색 UX, 렌더링 성능을 직접 점검하며 지속적으로 다듬고 있습니다.',
    sections: {
      features: '화면과 데이터 구성',
      details: false,
      diagram: false,
    },
  },
  launchpad: {
    layout: 'showcase',
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
    ai: '초기 건반 UI와 입력·사운드 처리는 직접 구현했습니다. 이후 기능을 확장하고 기존 코드를 수정하는 과정에 AI를 활용했습니다.',
    sections: {
      features: '주요 기능',
      details: '입력과 소리의 재생 시점',
      diagram: '작업 흐름',
    },
  },
  ml3yp: {
    layout: 'showcase',
    reasons: [
      [
        'Three.js · React Three Fiber',
        '3D 공간과 TV 화면 속 플레이어를 구성했습니다.',
      ],
      [
        '카메라 시점 전환',
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
    ai: 'AI로 3D 방과 TV 플레이어를 구성했습니다. 카메라 시점 전환과 3D 오브젝트 위 YouTube iframe의 클릭·재생 동기화를 직접 확인하며 다듬었습니다.',
    sections: {
      features: '주요 기능',
      details: false,
      diagram: false,
    },
  },
  'svg-drawing': {
    layout: 'showcase',
    diagram: {
      kind: 'rotation',
      title: '도형과 자유선 그리기·편집',
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
    layout: 'showcase',
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
      details: '인증과 검색·목록 처리',
      diagram: false,
    },
  },
  moharu: {
    layout: 'showcase',
    reasons: [],
    stacks: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Auth.js'],
    sections: {
      features: '맡은 작업',
      details: 'LTE 접속 오류',
      diagram: false,
    },
  },
  moimcity: {
    layout: 'showcase',
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
    cases: [
      {
        title: 'Refresh Token 기반 인증과 실패 요청 자동 재시도',
        problem: [
          '관리 시스템 특성상 한 화면에 오래 머물며 조회·등록·수정 작업을 이어가는 경우가 많아, Access Token 만료 시 작업 흐름이 끊기지 않도록 자연스러운 세션 연장과 보안 처리가 필요했습니다.',
        ],
        approach: [
          '보안을 위해 Access Token은 메모리에, Refresh Token은 HttpOnly Cookie에 분리 보관하고, 새로고침 시에는 Refresh Token으로 세션을 복원하도록 구성했습니다.',
          'API 호출에서 401 응답이 발생하면 Refresh Token으로 Access Token을 자동 재발급받은 뒤, 실패했던 기존 API 요청을 자동으로 재실행하도록 연결했습니다.',
          '재시도 횟수를 제한하고 Refresh 요청 전용 인터셉터를 분리해 토큰 갱신 중 무한 루프가 발생하지 않도록 방지했으며, Refresh Token까지 만료·무효화된 경우에는 즉시 로그아웃 처리했습니다.',
        ],
        outcome: [
          'Access Token 만료 시 토큰 갱신과 실패 요청 재시도를 연결해, 작업 중 다시 로그인해야 하는 상황을 줄였습니다.',
        ],
      },
      {
        title: '테이블별 상태 분리와 새로고침 후 정렬·페이지 유지',
        problem: [
          '여러 관리 화면의 테이블이 하나의 전역 상태를 공유하면 화면 간 정렬 기준과 페이지 번호가 서로 덮어써지고, 새로고침 시 탐색 위치가 초기화되는 불편이 있었습니다.',
        ],
        approach: [
          '공통 스토어 생성 함수를 두고 Zustand의 createStore로 테이블마다 독립된 상태 인스턴스를 생성했습니다.',
          'persist 미들웨어로 상태를 sessionStorage에 저장하되 테이블 식별자를 저장 키에 포함해, 각 테이블의 정렬·페이지 상태를 독립된 키로 복원하도록 구성했습니다.',
        ],
        outcome: [
          '여러 테이블이 공유하던 정렬·페이지 상태를 테이블별로 분리했습니다. 화면을 이동하거나 새로고침해도 해당 테이블의 상태를 복원하도록 했습니다.',
        ],
      },
    ],
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
      details: '인증 갱신 처리와 테이블별 상태 분리',
      diagram: false,
    },
  },
  quve: {
    reasons: [],
    cases: [
      {
        title:
          '정적 HTML/CSS 퍼블리싱 코드의 React 컴포넌트 전환과 반응형 재구성',
        problem: [
          '전달받은 외주 HTML/CSS 퍼블리싱 결과물이 정적 페이지 기준으로 작성되어 있어, 그대로 복사해 넣는 것만으로는 Next.js 컴포넌트 구조와 상태 연동, 화면별 반응형 레이아웃에 맞지 않았습니다.',
        ],
        approach: [
          '전달받은 HTML/CSS에 결제·멤버십 상태와 API를 연결해야 했습니다. 마크업을 화면·기능 단위의 React 컴포넌트로 나누고, 데스크톱과 모바일에서 깨지던 레이아웃을 수정하면서 미완성 화면을 보완했습니다.',
          '미완성 화면을 보완하고 신규 페이지를 개발하면서 일부 작업에 Figma MCP의 도움을 받았습니다. 디자인 시안과 대조해 마크업 구조와 CSS를 조정하고 결제 등 백엔드 API를 연동했습니다.',
        ],
        outcome: [
          '출시 3주 전 합류해 랜딩·멤버십·마이페이지 화면을 일관된 반응형 구조로 완성해 정식 출시를 지원했습니다.',
        ],
      },
    ],
    stacks: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Zustand',
      'TanStack Query',
    ],
    ai: '일부 화면 작업에 Figma MCP를 활용하고, 디자인 시안과 비교하며 구조와 CSS를 수정했습니다.',
    sections: {
      features: '맡은 작업',
      details: '퍼블리싱 코드의 컴포넌트 전환과 반응형 재구성',
      diagram: false,
    },
  },
  treenow: {
    layout: 'showcase',
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
    layout: 'showcase',
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
    layout: 'showcase',
    diagram: {
      kind: 'flow',
      title: '바구니 선택부터 결과 확인까지',
      nodes: [
        {
          label: '바구니 선택',
          detail: '빨강·파랑 실물 바구니 중 선택',
        },
        {
          label: '게임 진행',
          detail: '바구니를 들고 스크린 앞에서 움직이기',
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
