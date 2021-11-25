import _Steps from './steps.vue';
import _StepItem from './step-item.vue';
import mapProps from '../utils/map-props';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdStepsProps, TdStepItemProps } from './type';

import './style';

export * from './type';
export type StepsProps = TdStepsProps;
export type StepItemProps = TdStepItemProps;

export const Steps: WithInstallType<typeof _Steps> = withInstall(
  mapProps([
    {
      name: 'current',
      event: 'change',
      alias: ['modelValue'],
    },
  ])(_Steps),
);
export const StepItem: WithInstallType<typeof _StepItem> = withInstall(_StepItem);
export default Steps;
