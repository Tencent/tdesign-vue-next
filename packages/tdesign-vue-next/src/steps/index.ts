import { withInstall } from '@td/adapter-vue';
import _Steps from '@td/components-common/src/steps/steps';
import _StepItem from '@td/components-common/src/steps/step-item';
import type { TdStepItemProps, TdStepsProps } from './type';

import '@td/components-common/src/steps/style';

export * from './type';
export type StepsProps = TdStepsProps;
export type StepItemProps = TdStepItemProps;

export const Steps = withInstall(_Steps);
export const StepItem = withInstall(_StepItem);
export default Steps;
