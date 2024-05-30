import { withInstall } from '@td/adapter-vue';
import type { TdStepItemProps, TdStepsProps } from '@td/components/steps/type';
import _Steps from '@td/components-common/src/steps/steps';
import _StepItem from '@td/components-common/src/steps/step-item';

import '@td/components-common/src/steps/style';

export * from '@td/components/steps/type';
export type StepsProps = TdStepsProps;
export type StepItemProps = TdStepItemProps;

export const Steps = withInstall(_Steps);
export const StepItem = withInstall(_StepItem);
export default Steps;
