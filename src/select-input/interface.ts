import { TdSelectInputProps } from './type';

export interface SelectInputCommonProperties {
  autofocus?: TdSelectInputProps['autofocus'];
  size?: TdSelectInputProps['size'];
  status?: TdSelectInputProps['status'];
  tips?: TdSelectInputProps['tips'];
  clearable?: TdSelectInputProps['clearable'];
  disabled?: TdSelectInputProps['disabled'];
  label?: TdSelectInputProps['label'];
  placeholder?: TdSelectInputProps['placeholder'];
  readonly?: TdSelectInputProps['readonly'];
  prefixIcon?: TdSelectInputProps['prefixIcon'];
  suffix?: TdSelectInputProps['suffix'];
  suffixIcon?: TdSelectInputProps['suffixIcon'];
  onPaste?: TdSelectInputProps['onPaste'];
  onEnter?: TdSelectInputProps['onEnter'];
  onMouseenter?: TdSelectInputProps['onMouseenter'];
  onMouseleave?: TdSelectInputProps['onMouseleave'];
}

export interface SelectInputProps extends TdSelectInputProps {
  /**
   * 不对外暴露，参数穿透options, 给SelectInput/SelectInput 自定义选中项呈现的内容和多选状态下设置折叠项内容
   */
  options: any[];
}
