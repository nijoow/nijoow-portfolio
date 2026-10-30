import CustomList from '../../_container/CustomList';
import WorkImage from '../../_container/WorkImage';
import { WorkLinks } from '../../_container/WorkLinks';
import { WorkStudy } from '@/features/works/components/WorkStudy';
import {
  createWorkMetadata,
  WorkStructuredData,
} from '../../_container/workMetadata';
const PAGE_NAME = 'nijoow-shopping-mall';
export const metadata = createWorkMetadata(PAGE_NAME);
export default function Page() {
  return (
    <>
      <WorkStructuredData pageName={PAGE_NAME} />
      <WorkStudy
        pageName={PAGE_NAME}
        context={
          <>
            <h2 className="case-subheading">만든 이유</h2>
            <p className="text-ink-muted text-sm leading-relaxed break-keep">
              상품을 둘러보는 과정에서 직접 디자인을 바꾸고 주문까지 이어지는
              경험을 구현한 쇼핑몰 토이프로젝트입니다. 3D 스니커즈의 색상과
              재질, 각인을 편집하고 결과를 저장·공유하거나 장바구니에 담을 수
              있습니다. 결제와 배송은 데모로 동작합니다.
            </p>
          </>
        }
        features={
          <>
            <CustomList>
              <li className="mt-3 first:mt-0">
                <h3 className="text-base font-bold">
                  편집한 디자인을 구매 흐름에 연결
                </h3>
                <p className="text-ink-muted mt-2 text-sm leading-relaxed break-keep">
                  부위별 색상과 재질·각인 설정을 3D 미리보기에 반영하고, 실행
                  취소와 다시 실행, 디자인 저장·복제·공유, PNG 내보내기를
                  연결했습니다. 장바구니와 주문에도 선택한 구성과 미리보기를
                  남겨 편집 결과를 다시 확인할 수 있도록 했습니다.
                </p>
              </li>
              <li className="mt-3">
                <h3 className="text-base font-bold">
                  데모에서도 다루는 저장과 주문의 예외
                </h3>
                <p className="text-ink-muted mt-2 text-sm leading-relaxed break-keep">
                  서버에서 상품 구성·수량·금액을 검증하고, 같은 주문 요청이 중복
                  처리되지 않도록 구성했습니다. 모의 승인 실패와 재고 부족, 주문
                  취소·반품 흐름을 다루며 로컬은 SQLite, 배포 환경은
                  PostgreSQL을 사용하도록 저장 계층을 나눴습니다.
                </p>
              </li>
              <li className="mt-3">
                <h3 className="text-base font-bold">
                  3D 로딩과 실패 상태까지 구성
                </h3>
                <p className="text-ink-muted mt-2 text-sm leading-relaxed break-keep">
                  3D 뷰어를 클라이언트에서 별도로 불러오고 준비 중에는 대표
                  이미지를 보여 줍니다. 모델 로딩이 실패하면 안내와 재시도를
                  제공하도록 구성했습니다.
                </p>
              </li>
            </CustomList>
          </>
        }
        media={
          <>
            <WorkImage
              url="https://nijoow-shopping-mall.vercel.app/"
              imgSrc="nijoow-shopping-mall/01-shopping-mall-home.webp"
            />
            <div className="my-3 grid grid-cols-1 gap-4 md:grid-cols-2">
              <WorkImage imgSrc="nijoow-shopping-mall/02-shopping-product-list.webp" />
              <WorkImage imgSrc="nijoow-shopping-mall/03-shopping-product-detail.webp" />
              <WorkImage imgSrc="nijoow-shopping-mall/04-sneaker-customizer.webp" />
            </div>
          </>
        }
        links={
          <>
            <WorkLinks pageName={PAGE_NAME} />
          </>
        }
      />
    </>
  );
}
