import { withInstall } from '@td/adapter-vue';
import type { TdSwiperProps } from '@td/components/swiper/type';
import _Swiper from '@td/components-common/src/swiper/swiper';
import _SwiperItem from '@td/components-common/src/swiper/swiper-item';

import '@td/components-common/src/swiper/style';

export * from '@td/components/swiper/type';
export type SwiperProps = TdSwiperProps;

export const Swiper = withInstall(_Swiper);
export const SwiperItem = withInstall(_SwiperItem);
export default Swiper;
