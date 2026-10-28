import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { parse } from 'vue/compiler-sfc';
import { joinComponentsRoot } from '@tdesign/internal-utils';
import { babelrcContent, htmlContent, packageJSONContent, prepareDemoCode, sandboxConfigContent } from '../content';

const readExample = (name: string) => readFileSync(joinComponentsRoot(name), 'utf8');

describe('CodeSandbox export', () => {
  it('keeps plain template examples unchanged', async () => {
    const source = '<template><div>Hello</div></template><style scoped>div { color: red; }</style>';
    expect(await prepareDemoCode(source)).toBe(source);
  });

  it('ignores script tags in comments', async () => {
    const source = '<!-- <script lang="tsx">ignored</script> --><template><div /></template>';
    expect(await prepareDemoCode(source)).toBe(source);
  });

  it.each(['ts', 'tsx', 'jsx'])('converts an ordinary %s script while preserving template and styles', async (lang) => {
    const body =
      lang === 'ts'
        ? 'const message: string = "hello"; export default { data: () => ({ message }) };'
        : 'export default { setup() { return () => <div>hello</div>; } };';
    const source = `<template><div>hello</div></template><script lang="${lang}">${body}</script><style scoped lang="less">div { color: red; }</style>`;
    const result = await prepareDemoCode(source);
    const { descriptor, errors } = parse(result);
    expect(errors).toEqual([]);
    expect(descriptor.script.lang).toBeUndefined();
    expect(descriptor.script.content).not.toContain(': string');
    expect(descriptor.script.content).not.toContain('<div>');
    expect(descriptor.template.content).toBe('<div>hello</div>');
    expect(descriptor.styles[0].content).toBe('div { color: red; }');
    expect(descriptor.styles[0].scoped).toBe(true);
    expect(descriptor.styles[0].lang).toBe('less');
  });

  it.each(['', ' lang="ts"', ' lang="tsx"'])('compiles setup%s and its reactive event handlers', async (lang) => {
    const source = `<template><button @click="count++">{{ count }}</button></template><script setup${lang}>import { ref } from 'vue'; const count = ref(0);</script>`;
    const { descriptor, errors } = parse(await prepareDemoCode(source));
    expect(errors).toEqual([]);
    expect(descriptor.scriptSetup).toBeNull();
    expect(descriptor.template).toBeNull();
    expect(descriptor.script.content).toContain('setup(');
    expect(descriptor.script.content).toContain('onClick');
    expect(descriptor.script.content).toContain('count.value++');
  });

  it('keeps template-only icon imports and converts the TSX icon callback', async () => {
    const { descriptor } = parse(await prepareDemoCode(readExample('button/_example/icon.vue')));
    expect(descriptor.scriptSetup).toBeNull();
    expect(descriptor.script.content).not.toContain('import type');
    expect(descriptor.script.content).not.toContain('<SearchIcon');
    for (const icon of ['AddIcon', 'CloudUploadIcon', 'SearchIcon', 'CloudDownloadIcon', 'DiscountIcon']) {
      expect(descriptor.script.content.split(icon).length).toBeGreaterThan(2);
    }
  });

  it('merges the normal script and script setup without losing options', async () => {
    const source = `<script lang="ts">export default { name: 'BothScripts' };</script><template><div>{{ count }}</div></template><script lang="ts" setup>const count: number = 1;</script>`;
    const result = await prepareDemoCode(source);
    const { descriptor, errors } = parse(result);
    expect(errors).toEqual([]);
    expect(result.match(/<script>/g)).toHaveLength(1);
    expect(descriptor.scriptSetup).toBeNull();
    expect(descriptor.script.content).toContain('BothScripts');
    expect(descriptor.script.content).toContain('count');
  });

  it('compiles type-based props before erasing TypeScript', async () => {
    const source =
      '<template><div>{{ label }}</div></template><script setup lang="ts">defineProps<{ label: string }>();</script>';
    const { descriptor } = parse(await prepareDemoCode(source));
    expect(descriptor.script.content).toContain('props:');
    expect(descriptor.script.content).toContain('label:');
    expect(descriptor.script.content).toContain('type: String');
    expect(descriptor.script.content).not.toContain('defineProps');
  });

  it('preserves scoped styles without baking a mismatched scope id into the render', async () => {
    const source =
      '<template><div>scoped</div></template><script setup>const x = 1;</script><style scoped>div { color: red; }</style>';
    const { descriptor } = parse(await prepareDemoCode(source));
    expect(descriptor.styles[0].scoped).toBe(true);
    expect(descriptor.styles[0].content).toBe('div { color: red; }');
    expect(descriptor.script.content).not.toContain('data-v-codesandbox-demo');
  });

  it('reports invalid SFC input instead of submitting it', async () => {
    await expect(prepareDemoCode('<script setup>const x =</script>')).rejects.toThrow();
  });

  it('sets a real browser entry and overrides the default JSX plugins', () => {
    const pkg = JSON.parse(packageJSONContent('sandbox-demo'));
    expect(pkg.main).toBe('src/main.js');
    expect(pkg.dependencies.vue).toBeTruthy();
    expect(pkg.devDependencies).toBeUndefined();
    expect(JSON.parse(sandboxConfigContent)).toEqual({ template: 'vue-cli' });
    expect(JSON.parse(babelrcContent)).toEqual({ presets: ['env'], plugins: [] });
    expect(htmlContent).not.toContain('<script');
  });
});
