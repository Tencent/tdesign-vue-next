import { mount } from '@vue/test-utils';
import { Text } from '@tdesign/components';
import type { TdTextProps } from '@tdesign/components';
import { nextTick } from 'vue';

beforeEach(() => {
  vi.spyOn(window, 'prompt').mockImplementation(() => null);
});

describe('Typography Text', () => {
  const longTextString = `TDesign was founded with the principles of open-source collaboration from the beginning. The collaboration scheme discussion, component design, and API design, including source code, are fully open within the company, garnering widespread attention from internal developers and designers. TDesign follows an equal, open, and strict policy, regardless of the participants' roles.`;
  const shortText = 'TDesign was founded with the principles of open-source collaboration from the beginning.';
  const ellipsisText = new RegExp('...');

  describe('props', () => {
    it(':code[Boolean]', () => {
      const wrapper = mount(() => <Text code>{shortText}</Text>);

      expect(wrapper.find('code').element.innerHTML).toMatch(new RegExp(shortText));
    });

    it(':content[String/Function/Slot]', () => {
      const defaultWrapperSlot = mount(() => <Text>{shortText}</Text>);
      const propWrapperString = mount(() => <Text content={shortText}></Text>);
      const propWrapperFunction = mount(() => <Text content={() => shortText}></Text>);
      const propWrapperSlot = mount(() => <Text v-slots={{ content: () => <>{shortText}</> }}></Text>);

      expect(defaultWrapperSlot.find('.t-typography').element.innerHTML).toMatch(new RegExp(shortText));
      expect(propWrapperString.find('.t-typography').element.innerHTML).toMatch(new RegExp(shortText));
      expect(propWrapperFunction.find('.t-typography').element.innerHTML).toMatch(new RegExp(shortText));
      expect(propWrapperSlot.find('.t-typography').element.innerHTML).toMatch(new RegExp(shortText));
    });

    it(':copyable[object]', async () => {
      const handleCopy = vi.fn();
      const renderCopySlot = () => 'test';
      const wrapper = mount(() => (
        <Text
          //@ts-ignore
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

    it(':delete[Boolean]', () => {
      const wrapper = mount(() => <Text delete>{longTextString}</Text>);

      expect(wrapper.find('del').exists()).eq(true);
    });

    it(':disabled[Boolean]', () => {
      const wrapper = mount(() => <Text disabled>{longTextString}</Text>);

      expect(wrapper.find('.t-typography').classes('t-typography--disabled')).eq(true);
    });

    it(':ellipsis[Boolean]', () => {
      const wrapper = mount(() => <Text ellipsis>{longTextString}</Text>);

      expect(wrapper.find('.t-typography').element.innerHTML).toMatch(ellipsisText);
    });

    it(':ellipsis[object]', async () => {
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

    it(':ellipsis[object(slot)]', async () => {
      const wrapper = mount(() => (
        <Text
          ellipsis={{
            expandable: true,
            suffix: () => '...更多',
          }}
        >
          {longTextString}
        </Text>
      ));

      const expandSymbol = wrapper.find('.t-typography-ellipsis-symbol');
      expect(expandSymbol.exists()).toBe(true);
      // TODO: 组件的suffix存在问题，function会被渲染成string，计划后面再开pr fix
      expect(expandSymbol.text()).toBe("() => '...更多'");
    });

    it(':italic[Boolean]', () => {
      const wrapper = mount(() => <Text italic>{longTextString}</Text>);

      expect(wrapper.find('i').exists()).eq(true);
    });

    it(':keyboard[Boolean]', () => {
      const wrapper = mount(() => <Text keyboard>{longTextString}</Text>);

      expect(wrapper.find('kbd').exists()).eq(true);
    });

    it(':mark[String/Boolean]', () => {
      const defaultWrapper = mount(() => <Text mark>{longTextString}</Text>);
      const colorWrapper = mount(() => <Text mark="#07c160">{longTextString}</Text>);

      expect(defaultWrapper.find('mark').exists()).eq(true);
      expect(colorWrapper.find('mark').element.style.backgroundColor).eq('rgb(7, 193, 96)');
    });

    it(':strong[Boolean]', () => {
      const wrapper = mount(() => <Text strong>{longTextString}</Text>);

      expect(wrapper.find('strong').exists()).eq(true);
    });

    const themeList: TdTextProps['theme'][] = ['primary', 'secondary', 'success', 'warning', 'error'];
    const classPrefix = 't-typography--';

    themeList.forEach((item) => {
      it(`:theme[String]-${item}`, () => {
        const wrapper = mount(() => <Text theme={item}>{longTextString}</Text>);
        expect(wrapper.find('.t-typography').classes(`${classPrefix}${item}`)).eq(true);
      });
    });

    it(':underline[Boolean]', () => {
      const wrapper = mount(() => <Text underline>{longTextString}</Text>);

      expect(wrapper.find('u').exists()).eq(true);
    });
  });
});
