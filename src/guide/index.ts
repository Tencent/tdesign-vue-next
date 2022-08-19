import _Guide from './Guide';
import withInstall from '../utils/withInstall';
import { TdGuideProps } from './type';

import './style';

export * from './type';
export type GuideProps = TdGuideProps;

export const Guide = withInstall(_Guide);

export default Guide;
