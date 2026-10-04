import { describe, expect, it } from 'vitest';
import { webcModules } from '../test/helpers/webc';

describe('webc 模块扫描边界', () => {
  it('覆盖静态、类型、重导出、动态 import 与 require', () => {
    expect(
      webcModules(
        `import type { A } from 'tdesign-web-components';
         export { B } from 'tdesign-web-components/lib/chat-engine';
         const c = import('omi-vueify');
         const d = require('@tdesign/web-components-chat');
         type E = import('@tdesign/web-components').E;
         const f = import(\`tdesign-web-components/lib/chat-loading\`);`,
        'fixture.ts',
      ),
    ).toEqual([
      '@tdesign/web-components',
      '@tdesign/web-components-chat',
      'omi-vueify',
      'tdesign-web-components',
      'tdesign-web-components/lib/chat-engine',
      'tdesign-web-components/lib/chat-loading',
    ]);
  });

  it('Vue SFC 的普通 script 与 script setup 都纳入清零检查', () => {
    expect(
      webcModules(
        `<template><div>tdesign-web-components</div></template>
         <script lang="ts">export { A } from 'tdesign-web-components';</script>
         <script setup lang="ts">import { B } from 'omi-vueify';</script>`,
        'fixture.vue',
      ),
    ).toEqual(['omi-vueify', 'tdesign-web-components']);
  });

  it('注释与普通字符串不算依赖', () => {
    expect(
      webcModules(
        `// import 'tdesign-web-components';
         const text = 'omi-vueify';
         import x from 'tdesign-web-components-alternative';`,
        'fixture.ts',
      ),
    ).toEqual([]);
  });
});
