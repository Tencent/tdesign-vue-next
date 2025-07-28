import { mount } from '@vue/test-utils';
import { Tooltip, Text } from '@tdesign/components';
import type { TdTextProps } from '@tdesign/components';
import { nextTick } from 'vue';
import { sleep } from '@tdesign/internal-utils';

describe('Typography Text', () => {
  const longTextString = `TDesign was founded with the principles of open-source collaboration from the beginning. The collaboration scheme discussion, component design, and API design, including source code, are fully open within the company, garnering widespread attention from internal developers and designers. TDesign follows an equal, open, and strict policy, regardless of the participants' roles.`;
  const shortText = 'TDesign was founded with the principles of open-source collaboration from the beginning.';
  const ellipsisText = new RegExp('...');

  describe('props', () => {
    it(':code', () => {
      const wrapper = mount(() => <Text code>{shortText}</Text>);

      expect(wrapper.find('code').element.innerHTML).toMatch(new RegExp(shortText));
    });

    it(':', () => {
      const defaultWrapper = mount(() => <Text>{shortText}</Text>);
      const propWrapper = mount(() => <Text content={shortText}></Text>);

      expect(defaultWrapper.find('.t-typography').element.innerHTML).toMatch(new RegExp(shortText));
      expect(propWrapper.find('.t-typography').element.innerHTML).toMatch(new RegExp(shortText));
    });

    it(':copyable', async () => {
      const handleCopy = vi.fn();
      const renderCopySlot = () => 'test';
      const wrapper = mount(() => (
        <Text
          id="test"
          copyable={{
            onCopy: handleCopy,
            suffix: renderCopySlot,
            tooltipProps: { trigger: 'click', attach: '#test' },
          }}
        >
          {shortText}
        </Text>
      ));

      expect(wrapper.find('.t-button').element.innerHTML).toMatch(new RegExp('test'));

      wrapper.find('.t-button').trigger('click');

      expect(handleCopy).toHaveBeenCalled();
    });

    it(':delete', () => {
      const wrapper = mount(() => <Text delete>{longTextString}</Text>);

      expect(wrapper.find('del').exists()).eq(true);
    });

    it(':disabled', () => {
      const wrapper = mount(() => <Text disabled>{longTextString}</Text>);

      expect(wrapper.find('.t-typography').classes('t-typography--disabled')).eq(true);
    });

    it(':ellipsis', () => {
      const wrapper = mount(() => <Text ellipsis>{longTextString}</Text>);

      expect(wrapper.find('.t-typography').element.innerHTML).toMatch(ellipsisText);
    });

    it(':ellipsis with object config', async () => {
      // 测试可展开的省略
      const onExpand = vi.fn();
      const wrapper = mount(() => (
        <Text
          ellipsis={{
            row: 1,
            onExpand,
            expandable: true,
            collapsible: true,
            tooltipProps: { content: 'tooltip content' },
          }}
        >
          {longTextString}
        </Text>
      ));

      await nextTick();

      const expandSymbol = wrapper.find('.t-typography-ellipsis-symbol');
      expect(expandSymbol.exists()).toBe(true);

      await expandSymbol.trigger('click');
      expect(onExpand).toHaveBeenCalledWith(true);

      const collapseSymbol = wrapper.find('.t-typography-ellipsis-symbol');
      expect(collapseSymbol.exists()).toBe(true);

      const collapsibleWrapper = mount(() => (
        <Text
          ellipsis={{
            row: 2,
            expandable: true,
            collapsible: false,
            onExpand,
          }}
        >
          {longTextString}
        </Text>
      ));

      await nextTick();

      const expandBtn = collapsibleWrapper.find('.t-typography-ellipsis-symbol');
      await expandBtn.trigger('click');

      expect(collapsibleWrapper.find('.t-typography-ellipsis-symbol').exists()).toBe(false);
    });

    it(':ellipsis with custom suffix', async () => {
      const wrapper = mount(() => (
        <Text
          ellipsis={{
            expandable: true,
            suffix: '...更多',
          }}
        >
          {longTextString}
        </Text>
      ));

      await nextTick();

      const expandSymbol = wrapper.find('.t-typography-ellipsis-symbol');
      expect(expandSymbol.exists()).toBe(true);
      expect(expandSymbol.text()).toBe('...更多');
    });

    it(':italic', () => {
      const wrapper = mount(() => <Text italic>{longTextString}</Text>);

      expect(wrapper.find('i').exists()).eq(true);
    });

    it(':keyboard', () => {
      const wrapper = mount(() => <Text keyboard>{longTextString}</Text>);

      expect(wrapper.find('kbd').exists()).eq(true);
    });

    it(':mark', () => {
      const defaultWrapper = mount(() => <Text mark>{longTextString}</Text>);
      const colorWrapper = mount(() => <Text mark="#07c160">{longTextString}</Text>);

      expect(defaultWrapper.find('mark').exists()).eq(true);
      expect(colorWrapper.find('mark').element.style.backgroundColor).eq('rgb(7, 193, 96)');
    });

    it(':strong', () => {
      const wrapper = mount(() => <Text strong>{longTextString}</Text>);

      expect(wrapper.find('strong').exists()).eq(true);
    });

    const themeList: TdTextProps['theme'][] = ['primary', 'secondary', 'success', 'warning', 'error'];
    const classPrefix = 't-typography--';

    themeList.forEach((item) => {
      it(`:theme-${item}`, () => {
        const wrapper = mount(() => <Text theme={item}>{longTextString}</Text>);
        expect(wrapper.find('.t-typography').classes(`${classPrefix}${item}`)).eq(true);
      });
    });

    it(':underline', () => {
      const wrapper = mount(() => <Text underline>{longTextString}</Text>);

      expect(wrapper.find('u').exists()).eq(true);
    });
  });
});
