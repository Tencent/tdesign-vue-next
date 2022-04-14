import { InjectionKey } from 'vue';
import { StepItemExposed } from './step-item';
import { TdStepsProps } from './type';

export const StepsInjectionKey: InjectionKey<{
  current: TdStepsProps['current'];
  readonly: TdStepsProps['readonly'];
  theme: TdStepsProps['theme'];
  setCurrent: TdStepsProps['onChange'];
  addItem: (item: StepItemExposed) => void;
  removeItem: (item: StepItemExposed) => void;
}> = Symbol('StepsProvide');
