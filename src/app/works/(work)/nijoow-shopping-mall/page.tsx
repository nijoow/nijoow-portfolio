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
        imgSrc="nijoow-shopping-mall/01-shopping-mall-home.webp"
      />

      <div className="my-3 grid grid-cols-1 gap-4 md:grid-cols-2">
        <WorkImage imgSrc="nijoow-shopping-mall/02-shopping-product-list.webp" />
        <WorkImage imgSrc="nijoow-shopping-mall/03-shopping-product-detail.webp" />
        <WorkImage imgSrc="nijoow-shopping-mall/04-sneaker-customizer.webp" />
      </div>

      <PartTitle title="만든 이유" />
      <p className="text-ink-muted text-sm leading-relaxed break-keep">
        상품을 둘러보는 과정에서 직접 디자인을 바꾸고 주문까지 이어지는 경험을
        구현한 쇼핑몰 토이프로젝트입니다. 3D 스니커즈의 색상과 재질, 각인을
        편집하고 결과를 저장·공유하거나 장바구니에 담을 수 있습니다. 결제와
        배송은 데모로 동작합니다.
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

      <PartTitle title="직접 판단하고 구현한 부분" />
      <CustomList>
        <li className="mt-3 first:mt-0">
          <h3 className="text-base font-bold">
            편집한 디자인을 구매 흐름에 연결
          </h3>
          <p className="text-ink-muted mt-2 text-sm leading-relaxed break-keep">
            부위별 색상과 재질·각인 설정을 3D 미리보기에 반영하고, 실행 취소와
            다시 실행, 디자인 저장·복제·공유, PNG 내보내기를 연결했습니다.
            장바구니와 주문에도 선택한 구성과 미리보기를 남겨 편집 결과를 다시
            확인할 수 있도록 했습니다.
          </p>
        </li>
        <li className="mt-3">
          <h3 className="text-base font-bold">
            데모에서도 다루는 저장과 주문의 예외
          </h3>
          <p className="text-ink-muted mt-2 text-sm leading-relaxed break-keep">
            서버에서 상품 구성·수량·금액을 검증하고, 같은 주문 요청이 중복
            처리되지 않도록 구성했습니다. 모의 승인 실패와 재고 부족, 주문
            취소·반품 흐름을 다루며 로컬은 SQLite, 배포 환경은 PostgreSQL을
            사용하도록 저장 계층을 나눴습니다.
          </p>
        </li>
        <li className="mt-3">
          <h3 className="text-base font-bold">3D 로딩과 실패 상태까지 구성</h3>
          <p className="text-ink-muted mt-2 text-sm leading-relaxed break-keep">
            3D 뷰어를 클라이언트에서 별도로 불러오고 준비 중에는 대표 이미지를
            보여 줍니다. 모델 로딩이 실패하면 안내와 재시도를 제공하도록
            구성했습니다.
          </p>
        </li>
      </CustomList>

      <PartSubTitle title="작업 방식과 현재 범위" />
      <p className="text-ink-muted text-sm leading-relaxed break-keep">
        AI를 설계와 구현에 활용하며, 화면 방향과 기능 범위를 직접 정하고 생성된
        코드를 검토했습니다. 편집·저장·주문 흐름을 확인하고 문제를 수정하는
        방식으로 진행했습니다. 주문과 저장 로직의 자동 테스트 및 HTTP 검증
        코드를 두고 있으며, 실제 모바일 기기의 성능 확인은 남아 있습니다.
      </p>
      <p className="text-ink-muted mt-3 text-sm leading-relaxed break-keep">
        게스트 체험과 Auth.js 기반 소셜 로그인 구성을 마련했습니다.
        구글·카카오·네이버 로그인은 제공자 설정을 포함한 배포 환경 확인이
        필요하며, 운영용 상품·주문 관리 화면은 이후 작업 범위로 남겨 두었습니다.
      </p>

      <div className="my-3" />

      <PartTitle title="관련 링크" />

      <WorkLinks pageName={PAGE_NAME} />
    </>
  );
};

export default NijoowShoppingMallPage;
