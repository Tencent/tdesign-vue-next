import { mount } from '@vue/test-utils';
import { QRCode, TdQRCodeProps } from '@tdesign/components';
import type { VueWrapper } from '@vue/test-utils';

describe('QRCode', () => {
  describe('props', () => {
    let wrapper: VueWrapper<InstanceType<typeof QRCode>> | null = null;
    // 因单测环境下无法获取主题色，若未定义颜色，组件将由默认颜色兜底。所以单测的颜色要为默认颜色。
    // 颜色优先级如下：
    // bgColor：自定义颜色 > 主题色适配 > 透明[transparent]
    // color[fgColor]：自定义颜色 > 主题色适配 > 默认颜色[#000000]
    const defaultBgColor = 'transparent'; // 实际使用时为 rgb(255, 255, 255)
    const defaultFgColor = '#000000'; // 实际使用时为 rgba(0, 0, 0, .9)
    const defaultSize = 160;
    beforeEach(() => {
      wrapper = mount(<QRCode value="https://tdesign.tencent.com/"></QRCode>) as VueWrapper<
        InstanceType<typeof QRCode>
      >;
    });

    it(':bgColor[string]', async () => {
      expect(wrapper.find('.t-qrcode').attributes('style')).eq(
        `background-color: ${defaultBgColor}; width: 160px; height: 160px;`,
      );
      const bgColor = 'rgb(7, 193, 96)';
      await wrapper.setProps({ bgColor: bgColor });
      expect(wrapper.find('.t-qrcode').attributes('style')).eq(
        `background-color: ${bgColor}; width: 160px; height: 160px;`,
      );
    });

    it(':borderless[boolean]', async () => {
      expect(wrapper.find('.t-qrcode').classes('t-borderless')).eq(false);
      await wrapper.setProps({ borderless: true });
      expect(wrapper.find('.t-qrcode').classes('t-borderless')).eq(true);
    });

    // color只能测试svg模式下
    it(':color[string]', async () => {
      await wrapper.setProps({ type: 'svg' });
      // [0] 是背景
      expect(wrapper.find('.t-qrcode').findAll('path')[1].attributes('fill')).eq(defaultFgColor);
      const color = 'rgb(7, 193, 96)';
      await wrapper.setProps({ color });
      expect(wrapper.find('.t-qrcode').findAll('path')[1].attributes('fill')).eq(color);
    });

    it(':icon[string]-canvas', async () => {
      const iconSrc = 'https://tdesign.gtimg.com/site/tdesign-logo.png';
      await wrapper.setProps({ icon: iconSrc });
      expect(wrapper.find('.t-qrcode').find('img').attributes('src')).eq(iconSrc);
    });

    it(':icon[string]-svg', async () => {
      const iconSrc = 'https://tdesign.gtimg.com/site/tdesign-logo.png';
      await wrapper.setProps({ icon: iconSrc, type: 'svg' });
      expect(wrapper.find('.t-qrcode').find('image').attributes('href')).eq(iconSrc);
    });

    it(':iconSize[number|object]-svg', async () => {});

    const level: TdQRCodeProps['level'][] = ['L', 'M', 'Q', 'H'];
    level.forEach((item) => {
      it(`:level[string]-[${item}]`, async () => {
        await wrapper.setProps({ level: item });
        expect(wrapper.find('.t-qrcode').attributes('level')).eq(item);
      });
    });

    it(':size[number]', async () => {
      expect(wrapper.find('.t-qrcode').attributes('style')).eq(
        `background-color: ${defaultBgColor}; width: ${defaultSize}px; height: ${defaultSize}px;`,
      );
      const size = 380;
      await wrapper.setProps({ size });
      expect(wrapper.find('.t-qrcode').attributes('style')).eq(
        `background-color: ${defaultBgColor}; width: ${size}px; height: ${size}px;`,
      );
    });

    const status: TdQRCodeProps['status'][] = ['expired', 'loading', 'scanned'];
    status.forEach((item) => {
      it(`:status[string]-[${item}]`, async () => {
        await wrapper.setProps({ status: item });
        expect(wrapper.find('.t-qrcode').find('.t-mask').exists()).eq(true);
        expect(wrapper.find('.t-qrcode').find(`.t-${item}`).exists()).eq(true);
      });
    });

    it(':statusRender[Function]', async () => {
      const statusRender = vi.fn();
      await wrapper.setProps({ status: 'expired', statusRender });
      expect(statusRender).toBeCalled();
    });

    it(':value[string] changes - canvas mode', async () => {
      await wrapper.setProps({ type: 'canvas' });
      const initialValue = 'https://tdesign.tencent.com/';
      const newValue = 'https://github.com/Tencent/tdesign-vue-next';
      expect(wrapper.vm.value).eq(initialValue);

      await wrapper.setProps({ value: newValue });

      expect(wrapper.vm.value).eq(newValue);
      expect(wrapper.find('.t-qrcode').find('canvas').exists()).eq(true);
    });

    it(':value[string] changes - svg mode', async () => {
      await wrapper.setProps({ type: 'svg' });

      const initialValue = 'https://tdesign.tencent.com/';
      const newValue = 'https://github.com/Tencent/tdesign-vue-next';

      expect(wrapper.vm.value).eq(initialValue);

      const initialSvg = wrapper.find('.t-qrcode').find('svg');
      expect(initialSvg.exists()).eq(true);
      const initialPaths = initialSvg.findAll('path');
      const initialFgPath = initialPaths[1].attributes('d');
      await wrapper.setProps({ value: newValue });

      expect(wrapper.vm.value).eq(newValue);
      const updatedSvg = wrapper.find('.t-qrcode').find('svg');
      expect(updatedSvg.exists()).eq(true);
      const updatedPaths = updatedSvg.findAll('path');
      const updatedFgPath = updatedPaths[1].attributes('d');

      // 验证前景路径已改变（不同的 value 应该生成不同的二维码图案）
      expect(updatedFgPath).not.eq(initialFgPath);
    });
  });
});
