import { mount } from '@vue/test-utils';

export function getOverlayImageMount(Image, props, events) {
  return mount({
    render() {
      return (
        <Image
          src="https://tdesign.gtimg.com/demo/demo-image-1.png"
          // @typescript-eslint/no-unused-vars
          overlayContent={(h) => <div className="custom-preview-node">预览</div>}
          props={props}
          on={events}
        ></Image>
      );
    },
  });
}

export default {};
