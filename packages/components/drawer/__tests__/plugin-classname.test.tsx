import { describe, it, expect, afterEach } from 'vitest';
import { nextTick } from 'vue';
import { DrawerPlugin } from '../plugin';

// DrawerPlugin 把 options.className 映射成 drawerClassName 传给 Drawer，
// 但同时又用 ...omit(options, 'className', 'style') 把 options 里剩下的字段
// 全部展开。用户如果自己传了 drawerClassName，展开的那份会覆盖掉映射出来的
// 那份，className 就丢了（issue #6675）。
describe('DrawerPlugin', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('keeps className when drawerClassName is also passed', async () => {
    const instance = DrawerPlugin({
      className: 'from-class-name',
      drawerClassName: 'from-drawer-class-name',
      default: 'body',
    });
    await nextTick();
    await nextTick();

    const drawer = document.querySelector('.t-drawer');
    expect(drawer).not.toBeNull();
    expect(drawer.className).toContain('from-class-name');
    expect(drawer.className).toContain('from-drawer-class-name');

    instance.hide();
  });
});
