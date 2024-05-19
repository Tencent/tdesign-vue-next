import _Guide from './guide';
import { withInstall } from '@td/adapter-utils';
import { TdGuideProps, GuideStep } from '@td/intel/guide/type';

import './style';

/**
 * TdGuideStepProps is going to be deprecated, use GuideStep instead
 * @deprecated
 */
export type TdGuideStepProps = GuideStep;

export * from '@td/intel/guide/type';
export type GuideProps = TdGuideProps;

export const Guide = withInstall(_Guide);

export default Guide;
