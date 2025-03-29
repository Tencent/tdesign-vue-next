import { globSync } from 'glob';
import MockDate from 'mockdate';
import { vi, describe, it, expect } from 'vitest';
import { config } from '@vue/test-utils';
import { resolveComponentsRoot, getRelativeWorkspaceRootPath } from '@tdesign/internal-utils';

// 固定时间，当使用 new Date() 时，返回固定时间，防止“当前时间”的副作用影响，导致 snapshot 变更，mockdate 插件见 https://github.com/boblauer/MockDate
MockDate.set('2020-12-28 00:00:00');

function runTest() {
  const files = globSync(resolveComponentsRoot('**/_example/*.vue'));
  const { createSSRApp } = config.global;

  describe('ssr snapshot test', () => {
    HTMLCanvasElement.prototype.getContext = vi.fn();

    files.forEach((file) => {
      it(`ssr test ${getRelativeWorkspaceRootPath(file)}`, async () => {
        const demo = await import(file);
        const realDemoComp = demo.default ? demo.default : demo;
        realDemoComp.name = `test-ssr-${realDemoComp.name}`;
        const html = await createSSRApp(realDemoComp);
        expect(html).toMatchSnapshot();
      });
    });
  });
}

runTest();
