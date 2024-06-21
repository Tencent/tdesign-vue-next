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
