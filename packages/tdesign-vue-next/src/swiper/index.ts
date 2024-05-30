import { withInstall } from '@td/adapter-vue';
import _Swiper from '@td/components-common/src/swiper/swiper';
import _SwiperItem from '@td/components-common/src/swiper/swiper-item';
import type { TdSwiperProps } from './type';

import '@td/components-common/src/swiper/style';

export * from './type';
export type SwiperProps = TdSwiperProps;

export const Swiper = withInstall(_Swiper);
export const SwiperItem = withInstall(_SwiperItem);
export default Swiper;
