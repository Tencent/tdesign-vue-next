import { mount } from '@vue/test-utils';
import { Typography } from '@tdesign/components/typography';

describe('Typography', () => {
  const longTextString = `TDesign was founded with the principles of open-source collaboration from the beginning. The collaboration scheme discussion, component design, and API design, including source code, are fully open within the company, garnering widespread attention from internal developers and designers. TDesign follows an equal, open, and strict policy, regardless of the participants' roles.`;

  describe('slot', () => {
    it('default', () => {
      const wrapper = mount(() => <Typography>{longTextString}</Typography>);

      expect(wrapper.find('.t-typography').element.innerHTML).toMatch(longTextString);
    });
  });
});
