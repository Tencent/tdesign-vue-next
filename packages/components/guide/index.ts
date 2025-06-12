import _Guide from './guide';
import { withInstall } from '@tdesign/shared-utils';
import { TdGuideProps, GuideStep } from './type';

import './style';

/**
 * TdGuideStepProps is going to be deprecated, use GuideStep instead
 * @deprecated
 */
export type TdGuideStepProps = GuideStep;

export * from './type';
export type GuideProps = TdGuideProps;

export const Guide = withInstall(_Guide);

export default Guide;
