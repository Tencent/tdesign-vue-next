import { mount } from '@vue/test-utils';
import { expect, it } from 'vitest';
import Tooltip from '@tdesign/components/tooltip';

const text = '这是一段内容';
const tootipClass = '.t-popup';

describe('Tooltip', () => {
  it('', async () => {
    mount(() => (
      <Tooltip content={text} defaultVisible>
        <button>按钮</button>
      </Tooltip>
    ));
    let timer;
    await new Promise((resolve) => {
      timer = setTimeout(resolve, 250);
    });
    const tooltipContent = document.querySelector(tootipClass);
    expect(tooltipContent).toBeTruthy();
    clearTimeout(timer);
  });

  it('showArrow', async () => {
    mount(() => (
      <Tooltip content={text} defaultVisible>
        <button>按钮</button>
      </Tooltip>
    ));
    let timer;
    await new Promise((resolve) => {
      timer = setTimeout(resolve, 250);
    });
    const arrow = document.querySelector(`${tootipClass} .t-popup__arrow`);
    expect(arrow).toBeTruthy();
    clearTimeout(timer);
  });

  it('theme', async () => {
    mount(() => (
      <Tooltip content={text} defaultVisible theme="success">
        <button>按钮</button>
      </Tooltip>
    ));
    let timer;
    await new Promise((resolve) => {
      timer = setTimeout(resolve, 250);
    });
    const tooltipContent = document.querySelector(`.t-tooltip--success`);
    expect(tooltipContent).toBeTruthy();
    clearTimeout(timer);
  });
});
