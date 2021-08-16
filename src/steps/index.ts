import _Steps from './steps.vue';
import _StepItem from './step-item.vue';

import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdStepsProps, TdStepItemProps } from './type';

export * from './type';
export type StepsProps = TdStepsProps;
export type StepItemProps = TdStepItemProps;

export const Steps: WithInstallType<typeof _Steps> = withInstall(_Steps);
export const StepItem: WithInstallType<typeof _StepItem> = withInstall(_StepItem);
export default Steps;
