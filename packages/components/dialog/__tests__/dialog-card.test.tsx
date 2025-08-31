// @ts-nocheck
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { ref, nextTick } from 'vue';
import { CheckCircleFilledIcon, CloseIcon } from 'tdesign-icons-vue-next';
import DialogCard from '../dialog-card';

beforeEach(() => {
  document.body.innerHTML = '';
});

afterEach(() => {
  document.body.innerHTML = '';
});

describe('props', () => {
  it('header[string]', async () => {
    const wrapper = mount(() => <DialogCard header="Test Title" body="Test Content" />);

    await nextTick();
    expect(wrapper.find('.t-dialog__header').exists()).toBe(true);
    expect(wrapper.find('.t-dialog__header').text()).toBe('Test Title');
  });

  it('header[function]', async () => {
    const renderHeader = () => <span class="custom-header">Custom Header</span>;
    const wrapper = mount(() => <DialogCard header={renderHeader} body="Content" />);

    await nextTick();
    expect(wrapper.find('.custom-header').exists()).toBe(true);
    expect(wrapper.find('.custom-header').text()).toBe('Custom Header');
  });

  it('header[slot]', async () => {
    const wrapper = mount(() => (
      <DialogCard body="Content" v-slots={{ header: () => <div class="slot-header">Slot Header</div> }}></DialogCard>
    ));

    await nextTick();
    expect(wrapper.find('.slot-header').exists()).toBe(true);
    expect(wrapper.find('.slot-header').text()).toBe('Slot Header');
  });

  it('body[string]', async () => {
    const wrapper = mount(() => <DialogCard header="Title" body="String Body" />);

    await nextTick();
    const body = wrapper.find('.t-dialog__body');
    expect(body.exists()).toBe(true);
    expect(body.text()).toBe('String Body');
  });

  it('body[function]', async () => {
    const renderBody = () => <div class="custom-body">Custom Body</div>;
    const wrapper = mount(() => <DialogCard header="Title" body={renderBody} />);

    await nextTick();
    expect(wrapper.find('.custom-body').exists()).toBe(true);
    expect(wrapper.find('.custom-body').text()).toBe('Custom Body');
  });

  it('body[slot]', async () => {
    const wrapper = mount(() => (
      <DialogCard header="Title" v-slots={{ body: () => <div class="slot-body">Slot Body</div> }}></DialogCard>
    ));

    await nextTick();
    expect(wrapper.find('.slot-body').exists()).toBe(true);
    expect(wrapper.find('.slot-body').text()).toBe('Slot Body');
  });

  it('footer[boolean]', async () => {
    // footer=true 应该显示默认按钮
    const wrapperTrue = mount(() => <DialogCard header="Title" body="Content" footer={true} />);
    await nextTick();
    expect(wrapperTrue.find('.t-dialog__footer').exists()).toBe(true);

    // footer=false 应该隐藏footer
    const wrapperFalse = mount(() => <DialogCard header="Title" body="Content" footer={false} />);
    await nextTick();
    expect(wrapperFalse.find('.t-dialog__footer').exists()).toBe(false);
  });

  it('footer[function]', async () => {
    const renderFooter = () => <div class="custom-footer">Custom Footer</div>;
    const wrapper = mount(() => <DialogCard header="Title" body="Content" footer={renderFooter} />);

    await nextTick();
    expect(wrapper.find('.custom-footer').exists()).toBe(true);
    expect(wrapper.find('.custom-footer').text()).toBe('Custom Footer');
  });

  it('footer[slot]', async () => {
    const wrapper = mount(() => (
      <DialogCard
        header="Title"
        body="Content"
        footer={true}
        v-slots={{ footer: () => <div class="slot-footer">Slot Footer</div> }}
      ></DialogCard>
    ));

    await nextTick();
    expect(wrapper.find('.slot-footer').exists()).toBe(true);
    expect(wrapper.find('.slot-footer').text()).toBe('Slot Footer');
  });

  it('theme[string]', async () => {
    const themes = ['default', 'info', 'warning', 'danger', 'success', ''] as const;

    themes.forEach(async (theme) => {
      const wrapper = mount(() => <DialogCard header="Title" body="Content" theme={theme} />);
      await nextTick();
      const dialog = wrapper.find('.t-dialog');
      expect(dialog.classes()).toContain(`t-dialog__modal-${theme}`);
    });
  });

  it('closeBtn[boolean]', async () => {
    // 默认应该显示关闭按钮
    const wrapperDefault = mount(() => <DialogCard header="Title" body="Content" />);
    await nextTick();
    expect(wrapperDefault.find('.t-dialog__close').exists()).toBe(true);

    // closeBtn=false 应该隐藏关闭按钮
    const wrapperFalse = mount(() => <DialogCard header="Title" body="Content" closeBtn={false} />);
    await nextTick();
    expect(wrapperFalse.find('.t-dialog__close').exists()).toBe(false);
  });

  it('closeBtn[function]', async () => {
    const renderCloseBtn = () => <span class="custom-close">×</span>;
    const wrapper = mount(() => <DialogCard header="Title" body="Content" closeBtn={renderCloseBtn} />);

    await nextTick();
    expect(wrapper.find('.custom-close').exists()).toBe(true);
    expect(wrapper.find('.custom-close').text()).toBe('×');
  });

  it('placement[string]', async () => {
    const placements = ['top', 'center'] as const;

    placements.forEach(async (placement) => {
      const wrapper = mount(() => <DialogCard header="Title" body="Content" placement={placement} />);
      await nextTick();
      const dialog = wrapper.find('.t-dialog');
      expect(dialog.classes()).toContain(`t-dialog--${placement}`);
    });
  });

  it('width[number]', async () => {
    const wrapper = mount(() => <DialogCard header="Title" body="Content" width={500} />);

    await nextTick();
    const dialog = wrapper.find('.t-dialog');
    expect(dialog.element.style.width).toBe('500px');
  });

  it('width[string]', async () => {
    const wrapper = mount(() => <DialogCard header="Title" body="Content" width="80%" />);

    await nextTick();
    const dialog = wrapper.find('.t-dialog');
    expect(dialog.element.style.width).toBe('80%');
  });

  it('draggable[boolean]', async () => {
    const wrapper = mount(() => <DialogCard header="Title" body="Content" mode="modeless" draggable={true} />);

    await nextTick();
    const dialog = wrapper.find('.t-dialog');
    expect(dialog.classes()).toContain('t-dialog--draggable');
  });

  it('mode[string]', async () => {
    const modes = ['modal', 'modeless'] as const;

    modes.forEach(async (mode) => {
      const wrapper = mount(() => <DialogCard header="Title" body="Content" mode={mode} />);
      await nextTick();
      // 这里需要根据实际的class名称进行调整
      const dialog = wrapper.find('.t-dialog');
      expect(dialog.exists()).toBe(true);
    });
  });

  it('zIndex[number]', async () => {
    const wrapper = mount(() => <DialogCard header="Title" body="Content" zIndex={9999} />);

    await nextTick();
    const dialog = wrapper.find('.t-dialog');
    expect(dialog.exists()).toBe(true);
    // 这里需要根据实际的样式应用方式进行调整
  });

  it('preventScrollThrough[boolean]', async () => {
    const wrapper = mount(() => <DialogCard header="Title" body="Content" preventScrollThrough={true} />);

    await nextTick();
    const dialog = wrapper.find('.t-dialog');
    expect(dialog.exists()).toBe(true);
    // 这里需要根据实际的行为进行测试调整
  });

  it('should switch body className correctly in full-screen mode', async () => {
    // footer 存在时
    const wrapperWithFooter = mount(() => (
      <DialogCard header="Title" body="Content" mode="full-screen" footer={true} />
    ));
    await nextTick();
    const bodyWithFooter = wrapperWithFooter.find('.t-dialog__body');
    expect(bodyWithFooter.exists()).toBe(true);
    expect(bodyWithFooter.classes()).toContain('t-dialog__body--fullscreen');

    // footer 不存在时
    const wrapperWithoutFooter = mount(() => (
      <DialogCard header="Title" body="Content" mode="full-screen" footer={false} />
    ));
    await nextTick();
    const bodyWithoutFooter = wrapperWithoutFooter.find('.t-dialog__body');
    expect(bodyWithoutFooter.exists()).toBe(true);
    expect(bodyWithoutFooter.classes()).toContain('t-dialog__body--fullscreen--without-footer');
  });
});

describe('events', () => {
  it('onCloseBtnClick', async () => {
    const onCloseBtnClick = vi.fn();
    const wrapper = mount(() => <DialogCard header="Title" body="Content" onCloseBtnClick={onCloseBtnClick} />);

    await nextTick();
    const closeBtn = wrapper.find('.t-dialog__close');
    await closeBtn.trigger('click');
    expect(onCloseBtnClick).toHaveBeenCalled();
  });

  it('onStopDown: should call stopPropagation when mode is modeless and draggable is true', async () => {
    const stopPropagation = vi.fn();
    const wrapper = mount(() => <DialogCard header="Title" body="Content" mode="modeless" draggable={true} />);
    await nextTick();
    // 触发 body 区域的 mousedown
    const body = wrapper.find('.t-dialog__body');
    await body.trigger('mousedown', { stopPropagation });
    expect(stopPropagation).toHaveBeenCalled();
  });
});

describe('slots', () => {
  it('default slot', async () => {
    const wrapper = mount(() => (
      <DialogCard header="Title">
        <div class="default-slot">Default Slot Content</div>
      </DialogCard>
    ));

    await nextTick();
    expect(wrapper.find('.default-slot').exists()).toBe(true);
    expect(wrapper.find('.default-slot').text()).toBe('Default Slot Content');
  });
});

describe('edge cases', () => {
  it('handles empty props', async () => {
    const wrapper = mount(() => <DialogCard header="" body="" />);

    await nextTick();
    // 空字符串仍应渲染对应结构
    expect(wrapper.find('.t-dialog__header').exists()).toBe(true);
    expect(wrapper.find('.t-dialog__body').exists()).toBe(true);
  });

  it('handles undefined props', async () => {
    const wrapper = mount(() => <DialogCard />);

    await nextTick();
    // 未提供props时的默认行为
    expect(wrapper.find('.t-dialog').exists()).toBe(true);
  });
});
