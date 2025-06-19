// @ts-nocheck
import { mount } from '@vue/test-utils';
import Image from '@tdesign/components/image';

export function getOverlayImageMount(props, events) {
  return mount(
    <Image
      src="https://tdesign.gtimg.com/demo/demo-image-1.png"
      overlayContent={() => <div class="custom-preview-node">预览</div>}
      {...props}
      {...events}
    ></Image>,
  );
}

export default {};
