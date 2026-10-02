import CustomList from '../../_container/CustomList';
import PartSubTitle from '../../_container/PartSubTitle';
import PartTitle from '../../_container/PartTitle';
import TechStack from '../../_container/TechStack';
import WorkImage from '../../_container/WorkImage';
import { WorkLinks } from '../../_container/WorkLinks';
import {
  createWorkMetadata,
  WorkStructuredData,
} from '../../_container/workMetadata';

const PAGE_NAME = 'moharu';

export const metadata = createWorkMetadata(PAGE_NAME);

const MoharuPage = () => {
  return (
    <>
      <WorkStructuredData pageName={PAGE_NAME} />
      <WorkImage imgSrc="moharu.webp" />

      <div className="my-3" />

      <PartTitle title="프로젝트 개요" />

      <CustomList>
        <CustomList.MainListItem>
          비사이드 포텐데이 온라인 해커톤 팀 프로젝트
        </CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title="기술 스택" />

      <TechStack
        stacks={['Next.js', 'TypeScript', 'Tailwind CSS', 'Auth.js']}
      />

      <PartSubTitle title="주요 작업" />

      <CustomList>
        <CustomList.MainListItem>Next.js 구조 설계</CustomList.MainListItem>
        <CustomList.MainListItem>
          Auth.js 회원가입/이메일 로그인/소셜 로그인 기능 및 페이지 구현
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          Vercel 배포 및 도메인 연결
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          클라이언트 컴포넌트로 만든 페이지를 서버 컴포넌트로 리팩터링
        </CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title="문제 해결" />

      <CustomList>
        <li className="mt-5 first:mt-0">
          <h3 className="text-base font-bold">
            LTE 환경에서의 SSL 프로토콜 에러
          </h3>
          <p className="text-ink-muted mt-2 text-sm leading-relaxed break-keep">
            백엔드는 NCP, 프론트엔드는 Vercel에 배포한 환경에서 LTE 접속 시
            SSL_PROTOCOL_ERROR가 간헐적으로 발생했습니다. NCP 서브 도메인의 DNS
            Records를 Vercel 도메인 설정에 추가해 네트워크 경로의 IP 불일치
            문제를 해결했습니다.
          </p>
        </li>
      </CustomList>

      <div className="my-3" />

      <PartTitle title="관련 링크" />

      <WorkLinks
        links={[
          {
            href: 'https://bside.best/projects/detail/P240514222247',
            label: '상세 설명 바로가기',
          },
          {
            href: 'https://github.com/poten-moharu/moharu-frontend',
            label: 'GitHub',
            kind: 'github',
          },
        ]}
      />
    </>
  );
};

export default MoharuPage;
