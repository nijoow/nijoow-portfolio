import CustomList from '../../_container/CustomList';
import PartSubTitle from '../../_container/PartSubTitle';
import PartTitle from '../../_container/PartTitle';
import TechStack from '../../_container/TechStack';
import WorkCarousel from '../../_container/WorkCarousel';
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
      <WorkCarousel
        imgSrcList={[
          'nijoow-shopping-mall/01-shopping-mall-home.png',
          'nijoow-shopping-mall/02-shopping-product-list.png',
          'nijoow-shopping-mall/03-shopping-product-detail.png',
          'nijoow-shopping-mall/04-sneaker-customizer.png',
        ]}
        imageLabels={[
          '메인 화면',
          '상품 목록',
          '상품 상세',
          '3D 스니커즈 커스터마이징',
        ]}
        background="dark"
        aspectRatio="video"
      />

      <div className="my-3" />

      <PartTitle title="만든 이유" />
      <p className="text-ink-muted text-sm leading-relaxed break-keep">
        색상과 재질, 각인을 바꾼 신발을 주문해 볼 수 있는 쇼핑몰을 만들었습니다.
        편집한 3D 스니커즈를 저장하거나 공유하고, 장바구니에 담아 주문해 볼 수
        있습니다. 결제와 배송은 데모로 동작합니다. 화면과 기능을 기획하고 AI를
        활용해 프론트엔드와 서버 코드를 구현했습니다.
      </p>

      <PartSubTitle title="기술 스택" />

      <TechStack
        stacks={[
          'Next.js',
          'React',
          'TypeScript',
          'React Three Fiber',
          'Three.js',
          'Auth.js',
          'Zod',
          'SQLite · PostgreSQL',
          'CSS',
        ]}
      />

      <PartTitle title="주요 작업" />
      <CustomList>
        <li className="mt-3 first:mt-0">
          <h3 className="text-base font-bold">
            편집한 신발을 장바구니와 주문에 담기
          </h3>
          <p className="text-ink-muted mt-2 text-sm leading-relaxed break-keep">
            부위별 색상과 재질·각인 설정을 3D 미리보기에 반영하고, 실행 취소와
            다시 실행, 디자인 저장·복제·공유, PNG 내보내기를 연결했습니다.
            장바구니와 주문에도 선택한 구성과 미리보기를 남겨 편집 결과를 다시
            확인할 수 있도록 했습니다.
          </p>
        </li>
        <li className="mt-3">
          <h3 className="text-base font-bold">중복 주문과 결제 실패 처리</h3>
          <p className="text-ink-muted mt-2 text-sm leading-relaxed break-keep">
            서버에서 상품 구성·수량·금액을 검증하고, 같은 주문 요청이 중복
            처리되지 않도록 구성했습니다. 모의 승인 실패와 재고 부족, 주문
            취소·반품 흐름을 다루며 로컬은 SQLite, 배포 환경은 PostgreSQL을
            사용하도록 저장 계층을 나눴습니다.
          </p>
        </li>
        <li className="mt-3">
          <h3 className="text-base font-bold">
            3D 모델을 불러오는 동안의 화면
          </h3>
          <p className="text-ink-muted mt-2 text-sm leading-relaxed break-keep">
            3D 뷰어를 클라이언트에서 별도로 불러오고 준비 중에는 대표 이미지를
            보여 줍니다. 모델 로딩이 실패하면 안내와 재시도를 제공하도록
            구성했습니다.
          </p>
        </li>
      </CustomList>

      <PartSubTitle title="데모 이용 안내" />
      <p className="text-ink-muted text-sm leading-relaxed break-keep">
        게스트로 체험할 수 있습니다. 소셜 로그인은 배포 설정 확인이 필요한
        상태이며, 상품과 주문을 관리하는 운영자 화면은 포함하지 않았습니다.
      </p>

      <div className="my-3" />

      <PartTitle title="관련 링크" />

      <WorkLinks pageName={PAGE_NAME} />
    </>
  );
};

export default NijoowShoppingMallPage;
