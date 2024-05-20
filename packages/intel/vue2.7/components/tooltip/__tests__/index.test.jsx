import { mount } from '@vue/test-utils';
import Tooltip from '@/src/tooltip/index.ts';
import { prefix } from '@/src/config.ts';

const text = '这是一段内容';
const POPUP_ClASS = `.${prefix}-popup`;
const TOOLTIP_CLASS = `.${prefix}-tooltip`;
describe('Tooltip', () => {
  describe('props', () => {
    /** 是否在关闭浮层时销毁浮层 (暂时没有用到) */
    it(':destroyOnClose', () => {});
    /** 用于设置提示默认显示多长时间之后消失，初始第一次有效，单位：毫秒 */
    it(':duration', async () => {
      const time = 2000;
      const wrapper = mount({
        render() {
          return (
            <Tooltip content={text} duration={time} defaultVisible trigger="click">
              <button>按钮</button>
            </Tooltip>
          );
        },
      });
      let timer;
      await new Promise((resolve) => {
        timer = setTimeout(resolve, 100);
      });

      wrapper.findComponent(Tooltip).trigger('click');
      await new Promise((resolve) => {
        setTimeout(resolve, time + 100);
      });
      const tooltipContent = document.querySelector(`${TOOLTIP_CLASS} `);
      expect(tooltipContent).toBeNull();
      clearTimeout(timer);
    });
    const position = 'bottom-left';
    /** 浮层出现位置 */
    it(`:placement is ${position}`, async () => {
      const wrapper = mount({
        render() {
          return (
            <div>
              <p>占位</p>
              <p>占位</p>
              <p>占位</p>
              <p>占位</p>
              <p>占位</p>
              <p>占位</p>
              <p>占位</p>
              <p>占位</p>
              <p>占位</p>
              <Tooltip content={text} defaultVisible trigger="click" placement={position}>
                <button>按钮</button>
              </Tooltip>
            </div>
          );
        },
      });
      let timer;
      await new Promise((resolve) => {
        timer = setTimeout(resolve, 100);
      });
      wrapper.findComponent(Tooltip).trigger('click');
      const tooltipContent = document.querySelector(`${TOOLTIP_CLASS}`);
      expect(tooltipContent.attributes['data-popper-placement'].value).toBe(
        position.replace(/-(left|top)$/, '-start').replace(/-(right|bottom)$/, '-end'),
      );
      clearTimeout(timer);
    });
    /** 是否显示浮层箭头 */
    it(':showArrow is false, is toBeNull', async () => {
      mount({
        render() {
          return (
            <Tooltip content={text} showArrow={false} defaultVisible trigger="click">
              <button>按钮</button>
            </Tooltip>
          );
        },
      });
      let timer;
      await new Promise((resolve) => {
        timer = setTimeout(resolve, 100);
      });
      const tooltipContent = document.querySelector(`${POPUP_ClASS} ${POPUP_ClASS}__arrow`);
      expect(tooltipContent).toBeNull();
      clearTimeout(timer);
    });
    it(':showArrow is default true, is toBeTruthy', async () => {
      mount({
        render() {
          return (
            <Tooltip content={text} defaultVisible trigger="click">
              <button>按钮</button>
            </Tooltip>
          );
        },
      });
      let timer;
      await new Promise((resolve) => {
        timer = setTimeout(resolve, 100);
      });
      const tooltipContent = document.querySelector(`${POPUP_ClASS} ${POPUP_ClASS}__arrow`);
      expect(tooltipContent).toBeTruthy();
      clearTimeout(timer);
    });
    /** 文字提示风格 */
    it(':theme be default', async () => {
      mount({
        render() {
          return (
            <Tooltip content={text} defaultVisible>
              <button>按钮</button>
            </Tooltip>
          );
        },
      });
      let timer;
      await new Promise((resolve) => {
        timer = setTimeout(resolve, 100);
      });
      const tooltipContent = document.querySelector(`${POPUP_ClASS}${TOOLTIP_CLASS}${TOOLTIP_CLASS}--default`); // <div class="t-popup t-tooltip t-tooltip--default"></div>
      expect(tooltipContent).toBeTruthy();
      clearTimeout(timer);
    });
    it(':theme be `light`', async () => {
      mount({
        render() {
          return (
            <Tooltip content={text} defaultVisible theme={'light'}>
              <button>按钮</button>
            </Tooltip>
          );
        },
      });
      let timer;
      await new Promise((resolve) => {
        timer = setTimeout(resolve, 100);
      });
      const tooltipContent = document.querySelector(`${POPUP_ClASS}${TOOLTIP_CLASS}${TOOLTIP_CLASS}--light`); // <div class="t-popup t-tooltip t-tooltip--info"></div>
      expect(tooltipContent).toBeTruthy();
      clearTimeout(timer);
    });
  });
});
