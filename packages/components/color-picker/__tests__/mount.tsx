import { mount } from '@vue/test-utils';
import { ColorPicker } from '@tdesign/components';
import { TdColorPickerProps } from '@tdesign/components/color-picker/type';
import ColorPanel from '@tdesign/components/color-picker/components/panel';
import { userEvent } from '@tdesign/internal-tests';

/**
 * Mount a color picker and trigger the panel
 */
export async function mountColorPickerAndTriggerPanel({ props }: { props?: TdColorPickerProps }) {
  const wrapper = mount(<ColorPicker v-model={props.value} {...(props || {})} />);
  const trigger = wrapper.find('.t-color-picker__trigger');
  await userEvent.click(trigger.element);
  const panel = wrapper.findComponent(ColorPanel);
  return { wrapper, panel };
}
