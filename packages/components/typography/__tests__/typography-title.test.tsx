import { mount } from '@vue/test-utils';
import { Title } from '@tdesign/components/typography';
import type { TdTitleProps } from '@tdesign/components/typography';

describe('Typography Title', () => {
  const longTextString = `TDesign was founded with the principles of open-source collaboration from the beginning. The collaboration scheme discussion, component design, and API design, including source code, are fully open within the company, garnering widespread attention from internal developers and designers. TDesign follows an equal, open, and strict policy, regardless of the participants' roles.`;
  const shortText = 'TDesign was founded with the principles of open-source collaboration from the beginning.';
  const ellipsisText = new RegExp('...');

  describe('props', () => {
    it(':', () => {
      const defaultWrapper = mount(() => <Title>{shortText}</Title>);
      const propWrapper = mount(() => <Title content={shortText}></Title>);

      expect(defaultWrapper.find('h1.t-typography').element.innerHTML).toMatch(new RegExp(shortText));
      expect(propWrapper.find('h1.t-typography').element.innerHTML).toMatch(new RegExp(shortText));
    });

    it(':ellipsis', () => {
      const wrapper = mount(() => <Title ellipsis>{longTextString}</Title>);

      expect(wrapper.find('.t-typography').element.innerHTML).toMatch(ellipsisText);
    });

    const levelList: TdTitleProps['level'][] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

    levelList.forEach((item) => {
      it(`:level-${item}`, () => {
        const wrapper = mount(() => <Title level={item}>{longTextString}</Title>);

        expect(wrapper.find(`${item}.t-typography`).exists()).eq(true);
      });
    });
  });
});
