import { withInstall } from '@td/adapter-vue';
import type { TdStepItemProps, TdStepsProps } from '@td/components/steps/type';
import _Steps from './steps';
import _StepItem from './step-item';

import './style';

export * from '@td/components/steps/type';
export type StepsProps = TdStepsProps;
export type StepItemProps = TdStepItemProps;

export const Steps = withInstall(_Steps);
export const StepItem = withInstall(_StepItem);
export default Steps;
