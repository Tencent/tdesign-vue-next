import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { ref, nextTick, render, reactive, Ref } from 'vue';
import { ColorPicker, Input, Popup } from '@tdesign/components';
import { TdColorPickerProps } from '@tdesign/components/color-picker/type';
import ColorPanel from '@tdesign/components/color-picker/components/panel';
import { CloseCircleFilledIcon } from 'tdesign-icons-vue-next';
import { sleep } from '@tdesign/internal-utils';

/**
 * Mount a color picker and trigger the panel
 * 备注：预期的应该是通过点击输入框从而触发面板，但尝试后怎么都不行，因此改为 popup visible 为 true
 * @param param0
 * @returns
 */
export async function mountColorPickerAndTriggerPanel({ props }: { props?: TdColorPickerProps }) {
  const popupProps = reactive({ visible: false });
  const wrapper = mount(<ColorPicker v-model={props.value} popupProps={popupProps} {...(props || {})} />);
  popupProps.visible = true;
  await nextTick();
  const panel = wrapper.getComponent(ColorPanel);
  return { wrapper, panel, getPanel: () => wrapper.getComponent(ColorPanel) };
}
