import { withInstall } from '@td/adapter-vue';
import type { GuideStep, TdGuideProps } from '@td/components/guide/type';
import _Guide from '@td/components-common/src/guide/guide';

import '@td/components-common/src/guide/style';

/**
 * TdGuideStepProps is going to be deprecated, use GuideStep instead
 * @deprecated
 */
export type TdGuideStepProps = GuideStep;

export * from '@td/components/guide/type';
export type GuideProps = TdGuideProps;

export const Guide = withInstall(_Guide);

export default Guide;
