import { withInstall } from '@td/adapter-vue';
import type { GuideStep, TdGuideProps } from '@td/components/guide/type';
import _Guide from './guide';

import './style';

/**
 * TdGuideStepProps is going to be deprecated, use GuideStep instead
 * @deprecated
 */
export type TdGuideStepProps = GuideStep;

export * from '@td/components/guide/type';
export type GuideProps = TdGuideProps;

export const Guide = withInstall(_Guide);

export default Guide;
