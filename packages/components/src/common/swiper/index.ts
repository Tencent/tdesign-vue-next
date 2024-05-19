import _Swiper from './swiper';
import _SwiperItem from './swiper-item';
import { withInstall } from '@td/adapter-utils';
import type { TdSwiperProps } from '@td/intel/components/swiper/type';

import './style';

export * from '@td/intel/components/swiper/type';
export type SwiperProps = TdSwiperProps;

export const Swiper = withInstall(_Swiper);
export const SwiperItem = withInstall(_SwiperItem);
export default Swiper;
