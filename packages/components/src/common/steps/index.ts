import _Steps from './steps';
import _StepItem from './step-item';
import { withInstall } from '@td/adapter-utils';
import type { TdStepsProps, TdStepItemProps } from '@td/intel/components/steps/type';

import './style';

export * from '@td/intel/components/steps/type';
export type StepsProps = TdStepsProps;
export type StepItemProps = TdStepItemProps;

export const Steps = withInstall(_Steps);
export const StepItem = withInstall(_StepItem);
export default Steps;
