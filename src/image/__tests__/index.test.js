import { mount } from '@vue/test-utils';
import Image from '@/src/image/index.ts';

describe('Image 组件测试', () => {
  test('Image 测试', () => {
    const wrapper = mount({
      render() {
        return <Image src="https://tdesign.gtimg.com/demo/demo-image-1.png" />;
      },
    });

    expect(wrapper.exists()).toBe(true);
  });
});
