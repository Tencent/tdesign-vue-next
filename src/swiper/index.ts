import _Swiper from './swiper';
import _SwiperItem from './swiper-item';
import withInstall from '../utils/withInstall';
import { TdSwiperProps } from './type';

import './style';

export * from './type';
export type SwiperProps = TdSwiperProps;

export const Swiper = withInstall(_Swiper);
export const SwiperItem = withInstall(_SwiperItem);
export default Swiper;
