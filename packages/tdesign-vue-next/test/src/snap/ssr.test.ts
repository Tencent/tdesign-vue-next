import { globSync } from 'glob';
import MockDate from 'mockdate';
import { vi, describe, it, expect } from 'vitest';
import { joinComponentsRoot, getRelativeWorkspaceRootPath } from '@tdesign/internal-utils';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { renderToString } from 'vue/server-renderer';
import TDesign from '@tdesign/components';

// 固定时间，当使用 new Date() 时，返回固定时间，防止“当前时间”的副作用影响，导致 snapshot 变更，mockdate 插件见 https://github.com/boblauer/MockDate
MockDate.set('2020-12-28 00:00:00');

const router = createRouter({
  history: createWebHistory(),
  routes: [],
});

const createSSRApp = (comp: any) => {
  const app = createApp(comp);
  // TODO: paopao 从代码上看，这句应该是没有用的
  app.config.globalProperties.$route = undefined;
  app.use(TDesign);
  app.use(router);
  return renderToString(app);
};

function runTest() {
  const files = globSync(joinComponentsRoot('**/_example/*.vue'), {
    ignore: [joinComponentsRoot('chat/_example/*.vue')],
  });

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
