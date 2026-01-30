import { mount } from '@vue/test-utils';
import { Paragraph } from '@tdesign/components/typography';
import { nextTick } from 'vue';

describe('Typography Paragraph', () => {
  const longTextString = `TDesign was founded with the principles of open-source collaboration from the beginning. The collaboration scheme discussion, component design, and API design, including source code, are fully open within the company, garnering widespread attention from internal developers and designers. TDesign follows an equal, open, and strict policy, regardless of the participants' roles.`;
  const shortText = 'TDesign was founded with the principles of open-source collaboration from the beginning.';
  const ellipsisText = new RegExp('...');

  describe('props', () => {
    it(':content[String/Function]', () => {
      const defaultWrapperSlot = mount(() => <Paragraph>{shortText}</Paragraph>);
      const propWrapperString = mount(() => <Paragraph content={shortText}></Paragraph>);

      expect(defaultWrapperSlot.find('.t-typography').element.innerHTML).toMatch(new RegExp(shortText));
      expect(propWrapperString.find('.t-typography').element.innerHTML).toMatch(new RegExp(shortText));
    });

    it(':ellipsis[boolean]', () => {
      const wrapper = mount(() => <Paragraph ellipsis>{longTextString}</Paragraph>);

      expect(wrapper.find('.t-typography').element.innerHTML).toMatch(ellipsisText);
    });

    it(':ellipsis[object]', async () => {
      const wrapper = mount(() => (
        <Paragraph
          ellipsis={{
            expandable: true,
            collapsible: true,
          }}
        >
          {longTextString}
        </Paragraph>
      ));

      wrapper.find('.t-typography-ellipsis-symbol').trigger('click');
      await nextTick();
      expect(wrapper.find('.t-typography-ellipsis-symbol').element.innerHTML).toBe('收起');
    });
  });
});
