// @ts-nocheck
import { mount } from '@vue/test-utils';
import { describe, it, beforeEach, afterEach, expect, vi } from 'vitest';
import { usePrefixClass } from '@tdesign/shared-hooks';
import Popup from '@tdesign/components/popup';

const POPUPClASS = `.${usePrefixClass('popup').value}`;

function createShadowDomMountPoint() {
  const host = document.createElement('div');
  const shadowRoot = host.attachShadow({ mode: 'open' });
  const mountPoint = document.createElement('div');
  const popupContainer = document.createElement('div');

  shadowRoot.appendChild(mountPoint);
  shadowRoot.appendChild(popupContainer);
  document.body.appendChild(host);

  return { shadowRoot, mountPoint, popupContainer };
}

function wait(ms = 0) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe('Popup', () => {
  beforeEach(() => {
    // create teleport target
    const el = document.createElement('div');
    el.id = 'container';
    document.body.appendChild(el);
  });
  afterEach(() => {
    // clean up
    document.body.outerHTML = '';
  });
  const content = '这里是弹出内容';
  const visible = true;
  describe(':props', () => {
    /** 制定挂载节点  */
    it(':attach into div#container', async () => {
      const wrapper = await mount(Popup, {
        props: {
          visible: false,
          content,
          attach: '#container',
        },
        slots: {
          default: <button id="btn">触发器</button>,
        },
      });
      await wrapper.setProps({
        visible: true,
      });
      // 该组件不能用wrapper.html()来判断,本身组件不会有内容, 只是会插入到其他容器里
      expect(document.querySelector('#container').innerHTML.includes(content)).toEqual(true);
    });

    /** 浮层里面的内容 */
    it(':content from props', async () => {
      const wrapper = await mount(Popup, {
        props: {
          visible: false,
          content,
        },
        slots: {
          default: <button id="btn">触发器</button>,
        },
      });
      await wrapper.setProps({
        visible,
      });
      expect(document.querySelector(`${POPUPClASS}__content`).textContent).toEqual(content);
    });
    /** 触发元素，同 triggerElement */
    it(':default ', async () => {
      const wrapper = await mount(Popup, {
        props: {
          visible: false,
        },
        slots: {
          default: <button id="btn">触发器</button>,
        },
      });
      await wrapper.setProps({
        trigger: 'click',
      });
      const btn = wrapper.find('#btn');
      expect(document.querySelector(POPUPClASS)).toBeNull();
      await btn.trigger('click');
      expect(document.querySelector(POPUPClASS)).toBeDefined();
    });
    /** 延时显示或隐藏覆层，[延迟显示的时间，延迟隐藏的时间]，单位：毫秒。如果只有一个时间，则表示显示和隐藏的延迟时间相同。示例 `'300'` 或者 `[200, 200]`。默认为：[250, 150] */
    it.skip(':delay', async () => {});

    /** 是否在关闭浮层时销毁浮层 */
    it.skip(':destroyOnClose', () => {
      // hover没实现 先跳过
    });
    /** 是否禁用组件 */
    it(':disabled be true', async () => {
      const wrapper = await mount(Popup, {
        props: {
          visible: false,
        },
        slots: {
          default: <button id="btn">btn</button>,
        },
      });
      await wrapper.setProps({
        trigger: 'click',
      });
      const btn = wrapper.find('#btn');
      btn.element.setAttribute('disabled', 'disabled');
      await btn.trigger('click');
      expect(document.body.textContent).toEqual('');
    });
    /** 浮层内容部分类名，示例：'name1 name2 name3' 或 `['name1', 'name2']` 或 `[{ 'name1': true }]` */
    it(':overlayInnerClassName', async () => {
      const wrapper = await mount(Popup, {
        props: {
          visible: false,
          content,
        },
        slots: {
          default: <button>触发器</button>,
        },
      });
      const overlayInnerClassName = 'a-custom-class';
      await wrapper.setProps({
        overlayInnerClassName,
        visible,
      });
      expect(document.querySelector(`${POPUPClASS}__content`).className.includes(overlayInnerClassName)).toEqual(true);
    });
    /** 浮层内容部分样式，第一个参数 `triggerElement` 表示触发元素 DOM 节点，第二个参数 `popupElement` 表示浮层元素 DOM 节点 */
    it(':overlayInnerStyle', async () => {
      const wrapper = await mount(Popup, {
        props: {
          visible: false,
          content,
        },
        slots: {
          default: <button>触发器</button>,
        },
      });
      const overlayInnerStyle = {
        height: '666px',
      };
      await wrapper.setProps({
        overlayInnerStyle,
        visible,
      });
      expect(document.querySelector(`${POPUPClASS}__content`).style.cssText.includes('666px')).toEqual(true);
    });
    /** 浮层样式，第一个参数 `triggerElement` 表示触发元素 DOM 节点，第二个参数 `popupElement` 表示浮层元素 DOM 节点 */
    it(':overlayStyle', async () => {
      // 有bug跳过, 会被覆盖
      const wrapper = await mount(Popup, {
        props: {
          visible: false,
          content,
        },
        slots: {
          default: <button>触发器</button>,
        },
      });
      const overlayStyle = {
        height: '666px',
      };
      await wrapper.setProps({
        overlayStyle,
        content,
        visible,
      });
      expect(document.body.innerHTML.includes('666px')).toEqual(true);
      // typeof overlayStyle === 'function'
      await wrapper.setProps({
        overlayStyle(_triggerEl, _overlayEl) {
          overlayStyle.height = '233px';
          return overlayStyle;
        },
      });
      expect(document.body.innerHTML.includes('233px')).toEqual(true);
    });
    /** 浮层出现位置 */
    const position = 'top';
    it(`:placement be ${position}`, async () => {
      const wrapper = await mount(Popup, {
        props: {
          visible: false,
        },
        slots: {
          default: <button id="btn">btn</button>,
        },
      });

      await wrapper.setProps({
        content,
        visible,
        placement: 'top',
      });

      // 涉及插件popperjs,先用data属性判断
      expect(document.querySelector(`${POPUPClASS}`).attributes['data-popper-placement'].value).toBe(
        position.replace(/-(left|top)$/, '-start').replace(/-(right|bottom)$/, '-end'),
      );
    });
    /** 是否显示浮层箭头 */
    it(':showArrow be true', async () => {
      const wrapper = await mount(Popup, {
        props: {
          visible: false,
        },
        slots: {
          default: <button>触发器</button>,
        },
      });

      await wrapper.setProps({
        content,
        visible,
        showArrow: true,
      });
      expect(document.querySelector(`${POPUPClASS}__content`).className.includes('content--arrow')).toEqual(true); // <div class="t-popup__content t-popup__content--arrow">这
    });
    /** 触发浮层出现的方式 */
    it(':trigger is click', async () => {
      const wrapper = await mount(Popup, {
        props: {
          visible: false,
        },
        slots: {
          default: <button id="btn">btn</button>,
        },
      });
      await wrapper.setProps({
        trigger: 'click',
      });
      const btn = wrapper.find('#btn');
      expect(document.querySelector(POPUPClASS)).toBeNull();
      await btn.trigger('click');
      expect(document.querySelector(POPUPClASS)).toBeDefined();
    });
    /** 触发元素 */
    it(':triggerElement is `click`', async () => {
      const wrapper = await mount(Popup, {
        props: {
          visible: false,
        },

        slots: {
          default: <button id="btn">btn</button>,
        },
      });
      await wrapper.setProps({
        content,
        trigger: 'click',
      });
      const btn = wrapper.find('#btn');
      expect(document.querySelector(POPUPClASS)).toBeNull();
      await btn.trigger('click');
      expect(document.querySelector(POPUPClASS)).toBeDefined();
    });
    it(':triggerElement is `context-menu`', async () => {
      const wrapper = await mount(Popup, {
        props: {
          visible: false,
        },
        slots: {
          default: <button id="btn">btn</button>,
        },
      });
      await wrapper.setProps({
        content,
        trigger: 'context-menu',
      });
      const btn = wrapper.find('#btn');
      expect(document.querySelector(POPUPClASS)).toBeNull();
      await btn.trigger('contextmenu');
      expect(document.querySelector(POPUPClASS)).toBeDefined();
    });
    it(':triggerElement is `focusin`', async () => {
      const wrapper = await mount(Popup, {
        props: {
          visible: false,
        },
        slots: {
          default: <button id="btn">btn</button>,
        },
      });
      await wrapper.setProps({
        content,
        trigger: 'focus',
      });
      const btn = wrapper.find('#btn');
      expect(document.querySelector(POPUPClASS)).toBeNull();
      await btn.trigger('focus');
      expect(document.querySelector(POPUPClASS)).toBeDefined();
    });
    /** 是否显示浮层 */
    it(':visible', async () => {
      const wrapper = await mount(Popup, {
        props: {
          visible: false,
          content,
        },
        slots: {
          default: <button>触发器</button>,
        },
      });
      expect(document.body.textContent).toEqual('');
      await wrapper.setProps({
        visible,
      });
      expect(document.body.textContent).toEqual(content);
    });

    /** 组件层级，Web 侧样式默认为 5500，移动端和小程序样式默认为 1500 */
    it(':zIndex', async () => {
      const wrapper = await mount(Popup, {
        props: {
          visible: false,
        },
        slots: {
          default: <button id="btn">btn</button>,
        },
      });
      const zIndex = 1213;
      await wrapper.setProps({
        zIndex,
        visible,
      });
      expect(document.querySelector(`${POPUPClASS}`).style.cssText.includes(String(zIndex))).toEqual(true);
    });
  });
  describe('@event', () => {
    /** 下拉选项滚动事件 */
    it('onScroll', () => {});
    /** 当浮层隐藏或显示时触发，`trigger=document` 表示点击非浮层元素触发；`trigger=context-menu` 表示右击触发 */
    it('onVisibleChange', () => {});
    it('keeps popup open when clicking overlay in shadow DOM', async () => {
      const { shadowRoot, mountPoint, popupContainer } = createShadowDomMountPoint();
      const onVisibleChange = vi.fn();

      await mount(Popup, {
        attachTo: mountPoint,
        props: {
          defaultVisible: true,
          trigger: 'click',
          delay: [0, 0],
          content,
          attach: () => popupContainer,
          onVisibleChange,
        },
        slots: {
          default: <button id="btn">btn</button>,
        },
      });

      await wait();

      const popupContent = shadowRoot.querySelector(`${POPUPClASS}__content`) as HTMLElement;
      popupContent.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, composed: true }));

      await wait();

      const popup = shadowRoot.querySelector(POPUPClASS) as HTMLElement;
      expect(popup.style.display).not.toBe('none');
      expect(onVisibleChange).not.toHaveBeenCalledWith(false, expect.anything());
    });

    it('keeps parent popup open when moving to child popup in shadow DOM', async () => {
      const { shadowRoot, mountPoint, popupContainer } = createShadowDomMountPoint();
      const onParentVisibleChange = vi.fn();

      await mount(Popup, {
        attachTo: mountPoint,
        props: {
          defaultVisible: true,
          trigger: 'hover',
          delay: [0, 0],
          attach: () => popupContainer,
          onVisibleChange: onParentVisibleChange,
        },
        slots: {
          default: <button id="parent-btn">parent</button>,
          content: () => (
            <div>
              parent content
              <Popup trigger="click" delay={[0, 0]} content="child content" attach={() => popupContainer}>
                <button id="child-btn">child</button>
              </Popup>
            </div>
          ),
        },
      });

      await wait(20);

      const childButton = shadowRoot.querySelector('#child-btn') as HTMLElement;
      childButton.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));

      await wait(20);

      const popups = shadowRoot.querySelectorAll(POPUPClASS);
      expect(popups.length).toBe(2);
      const parentPopup = popups[0] as HTMLElement;
      const childPopup = popups[1] as HTMLElement;

      childPopup.getBoundingClientRect = vi.fn(
        () =>
          ({
            x: 50,
            y: 50,
            width: 100,
            height: 100,
            top: 50,
            left: 50,
            right: 150,
            bottom: 150,
            toJSON: () => ({}),
          } as DOMRect),
      );

      const mouseleaveEvent = new MouseEvent('mouseleave', { bubbles: true, composed: true, clientX: 80, clientY: 80 });
      Object.defineProperties(mouseleaveEvent, {
        x: { value: 80 },
        y: { value: 80 },
      });

      parentPopup.dispatchEvent(mouseleaveEvent);

      await wait();

      expect(parentPopup.style.display).not.toBe('none');
      expect(onParentVisibleChange).not.toHaveBeenCalledWith(false, expect.anything());
    });

    it('keydown-esc hide popup', async () => {
      const wrapper = await mount(Popup, {
        props: {
          visible: false,
          attach: '#container',
        },
        slots: {
          default: <button id="btn">btn</button>,
        },
        global: {
          stubs: { teleport: false },
        },
      });
      await wrapper.setProps({
        content,
        visible,
        trigger: 'focus',
      });
      const btn = wrapper.find('#btn');
      await btn.trigger('keydown.esc');
      await wait();
      expect(wrapper.emitted()['update:visible'][0]).toEqual([false]);
    });
  });
});
