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

const PAGE_NAME = 'nijoow-shopping-mall';

export const metadata = createWorkMetadata(PAGE_NAME);

const NijoowShoppingMallPage = () => {
  return (
    <>
      <WorkStructuredData pageName={PAGE_NAME} />
      <WorkImage
        url="https://nijoow-shopping-mall.vercel.app/"
        imgSrc="nijoow-shopping-mall.webp"
      />

      <div className="my-3" />

      <PartTitle title="프로젝트 개요" />

      <CustomList>
        <CustomList.MainListItem>🚧 개발 진행 중 🚧</CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title="기술 스택" />

      <TechStack
        stacks={['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL']}
      />

      <PartSubTitle title="구현한 기능" />

      <CustomList>
        <CustomList.MainListItem>
          회원가입, 로그인, 소셜로그인(구글) 기능
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          내 정보 수정, 배송정보 저장
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          홈화면, 상품 목록 페이지, 상품 페이지, 좋아요 리스트
        </CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title="추가·개선할 기능" />

      <CustomList>
        <CustomList.MainListItem>디자인 개선</CustomList.MainListItem>
        <CustomList.MainListItem>내 정보 생년월일 추가</CustomList.MainListItem>
        <CustomList.MainListItem>
          소셜로그인(네이버/카카오)
        </CustomList.MainListItem>
        <CustomList.MainListItem>주문, 배송, 리뷰</CustomList.MainListItem>
        <CustomList.MainListItem>
          관리자 페이지(상품/주문/리뷰 관리)
        </CustomList.MainListItem>
      </CustomList>

      <div className="my-3" />

      <PartTitle title="관련 링크" />

      <WorkLinks pageName={PAGE_NAME} />
    </>
  );
};

export default NijoowShoppingMallPage;
