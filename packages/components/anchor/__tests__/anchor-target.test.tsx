import { mount } from '@vue/test-utils';
import { AnchorTarget } from '@tdesign/components/anchor';
import { vi } from 'vitest';
import { FileCopyIcon } from 'tdesign-icons-vue-next';

// Mock utils
vi.mock('../utils', () => ({
  copyText: vi.fn(),
}));

// Mock Message
vi.mock('@tdesign/components/message/plugin', () => ({
  default: {
    success: vi.fn(),
  },
}));

import { copyText } from '../utils';
import Message from '@tdesign/components/message/plugin';

describe('AnchorTarget', () => {
  it('props: id', () => {
    const wrapper = mount(AnchorTarget, {
      props: {
        id: 'test-id',
      },
    });
    expect(wrapper.attributes('id')).toBe('test-id');
  });

  it('props: tag', () => {
    const wrapper = mount(AnchorTarget, {
      props: {
        id: 'test-id',
        tag: 'span',
      },
    });
    expect(wrapper.element.tagName).toBe('SPAN');
  });

  it('props: tag default', () => {
    const wrapper = mount(AnchorTarget, {
      props: {
        id: 'test-id',
      },
    });
    expect(wrapper.element.tagName).toBe('DIV');
  });

  it('slots: default', () => {
    const wrapper = mount(AnchorTarget, {
      props: { id: 'test-id' },
      slots: { default: '<div>Slot Content</div>' },
    });
    expect(wrapper.text()).toBe('Slot Content');
  });

  it('copy text', async () => {
    const wrapper = mount(AnchorTarget, {
      props: {
        id: 'test-id',
      },
      global: {
        stubs: {
          Popup: {
            template: '<div><slot /></div>',
          },
        },
      },
    });

    const icon = wrapper.findComponent(FileCopyIcon);
    await icon.trigger('click');

    expect(copyText).toHaveBeenCalledWith('#test-id');
    expect(Message.success).toHaveBeenCalled();
  });
});
