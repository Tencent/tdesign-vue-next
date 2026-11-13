import { mount } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import { Form, FormItem } from '@tdesign/components/form';
import { Input } from '@tdesign/components/input';

describe('Form', () => {
  describe('scrollToFirstError', () => {
    it('scrolls the nearest container instead of the whole page', async () => {
      const rules = { name: [{ required: true, message: 'name is required' }] };
      const formData = { name: '' };
      const scrollIntoViewMock = vi.fn();
      const original = Element.prototype.scrollIntoView;
      Element.prototype.scrollIntoView = scrollIntoViewMock;

      const wrapper = mount(
        <Form rules={rules} data={formData} scrollToFirstError="smooth">
          <FormItem label="name" name="name">
            <Input v-model={formData.name} />
          </FormItem>
        </Form>,
      );

      await (wrapper.findComponent(Form).vm as any).$.exposed.validate();

      expect(scrollIntoViewMock).toHaveBeenCalled();
      // block: 'nearest' 只滚动最小距离，不会把整页顶上去。
      // 默认的 block: 'start' 会滚动所有可滚动祖先，body 带 transform 时整页上移。
      expect(scrollIntoViewMock.mock.calls[0][0]).toEqual(
        expect.objectContaining({ behavior: 'smooth', block: 'nearest' }),
      );

      Element.prototype.scrollIntoView = original;
      wrapper.unmount();
    });
  });
});
