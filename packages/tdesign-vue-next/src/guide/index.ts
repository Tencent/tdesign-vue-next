import { withInstall } from '@td/adapter-vue';
import _Guide from '@td/components-common/src/guide/guide';
import type { GuideStep, TdGuideProps } from './type';

import '@td/components-common/src/guide/style';

/**
 * TdGuideStepProps is going to be deprecated, use GuideStep instead
 * @deprecated
 */
export type TdGuideStepProps = GuideStep;

export * from './type';
export type GuideProps = TdGuideProps;

export const Guide = withInstall(_Guide);

export default Guide;
