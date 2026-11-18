import WorkCarousel from './WorkCarousel';

function WorkImage({ imgSrc }: { url?: string; imgSrc: string }) {
  return <WorkCarousel imgSrcList={[imgSrc]} imageLabels={['프로젝트 화면']} />;
}
export default WorkImage;
