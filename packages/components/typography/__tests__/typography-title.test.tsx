import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { Title } from '@tdesign/components/typography';
import type { TdTitleProps } from '@tdesign/components/typography';

describe('Typography Title', () => {
  const longTextString = `TDesign was founded with the principles of open-source collaboration from the beginning. The collaboration scheme discussion, component design, and API design, including source code, are fully open within the company, garnering widespread attention from internal developers and designers. TDesign follows an equal, open, and strict policy, regardless of the participants' roles.`;
  const shortText = 'TDesign was founded with the principles of open-source collaboration from the beginning.';
  const ellipsisText = new RegExp('...');

  describe('props', () => {
    it(':default[content/default slot]', () => {
      const defaultWrapper = mount(() => <Title>{shortText}</Title>);
      const propWrapper = mount(() => <Title content={shortText}></Title>);

      expect(defaultWrapper.find('h1.t-typography').element.innerHTML).toMatch(new RegExp(shortText));
      expect(propWrapper.find('h1.t-typography').element.innerHTML).toMatch(new RegExp(shortText));
    });

    it(':ellipsis[Boolean/object]', async () => {
      const wrapper = mount(() => <Title ellipsis>{longTextString}</Title>);

      expect(wrapper.find('.t-typography').element.innerHTML).toMatch(ellipsisText);

      const onExpand = vi.fn();
      const objectWrapper = mount(() => (
        <Title
          ellipsis={{
            row: 1,
            onExpand,
            expandable: true,
            collapsible: true,
            tooltipProps: { content: 'tooltip content' },
          }}
        >
          {longTextString}
        </Title>
      ));

      await nextTick();

      const expandSymbol = objectWrapper.find('.t-typography-ellipsis-symbol');
      expect(expandSymbol.exists()).toBe(true);

      await expandSymbol.trigger('click');
      expect(onExpand).toHaveBeenCalledWith(true);

      const collapseSymbol = objectWrapper.find('.t-typography-ellipsis-symbol');
      expect(collapseSymbol.exists()).toBe(true);
    });

    const levelList: TdTitleProps['level'][] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

    levelList.forEach((item) => {
      it(`:level[String]-${item}`, () => {
        const wrapper = mount(() => <Title level={item}>{longTextString}</Title>);

        expect(wrapper.find(`${item}.t-typography`).exists()).eq(true);
      });
    });
  });
});
