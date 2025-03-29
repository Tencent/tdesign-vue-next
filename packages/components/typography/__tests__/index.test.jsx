import { mount } from '@vue/test-utils';
import { Text, Title, Paragraph } from '@tdesign/components/typography/index.ts';
import { nextTick } from 'vue';

describe('Typography', () => {
  const longTextString = `TDesign was founded with the principles of open-source collaboration from the beginning. The collaboration scheme discussion, component design, and API design, including source code, are fully open within the company, garnering widespread attention from internal developers and designers. TDesign follows an equal, open, and strict policy, regardless of the participants' roles.`;

  const shortText = 'TDesign was founded with the principles of open-source collaboration from the beginning.';

  const ellipsisText = new RegExp('...');

  it('title 测试', () => {
    const wrapper = mount(() => <Title>{shortText}</Title>);

    expect(wrapper.find('h1.t-typography').element.innerHTML).toBe(shortText);
  });

  it('paragraph 测试', () => {
    const wrapper = mount(() => <Paragraph>{shortText}</Paragraph>);

    expect(wrapper.find('.t-typography').element.innerHTML).toBe(shortText);
  });

  it('text 测试', () => {
    const wrapper = mount(() => <Text>{shortText}</Text>);

    expect(wrapper.find('.t-typography').element.innerHTML).toMatch(new RegExp(shortText));
  });

  it('text code 测试', () => {
    const wrapper = mount(() => <Text code>{shortText}</Text>);

    expect(wrapper.find('code').element.innerHTML).toMatch(new RegExp(shortText));
  });

  window.innerWidth = 480;
  it('ellipsis 测试', () => {
    const wrapper = mount(() => <Paragraph ellipsis>{longTextString}</Paragraph>);

    expect(wrapper.find('.t-typography').element.innerHTML).toMatch(ellipsisText);
  });

  it('text ellipsis 测试', () => {
    const wrapper = mount(() => <Text ellipsis>{longTextString}</Text>);

    expect(wrapper.find('.t-typography').element.innerHTML).toMatch(ellipsisText);
  });

  it('title ellipsis 测试', () => {
    const wrapper = mount(() => <Title ellipsis>{longTextString}</Title>);

    expect(wrapper.find('.t-typography').element.innerHTML).toMatch(ellipsisText);
  });

  it('ellipsis expand 测试', async () => {
    const wrapper = await mount(() => (
      <Paragraph
        ellipsis={{
          expandable: true,
          collapsible: true,
        }}
      >
        {longTextString}
      </Paragraph>
    ));

    // 模拟鼠标进入
    wrapper.find('.t-typography-ellipsis-symbol').trigger('click');
    await nextTick();
    expect(wrapper.find('.t-typography-ellipsis-symbol').element.innerHTML).toBe('收起');
  });

  it('text copyable 测试', () => {
    const handleCopy = vi.fn();
    const wrapper = mount(() => <Text copyable={{ onCopy: handleCopy }}>{shortText}</Text>);

    wrapper.find('.t-button').trigger('click');

    expect(handleCopy).toHaveBeenCalled();
  });
});
