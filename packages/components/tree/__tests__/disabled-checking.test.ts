// @ts-nocheck
// @vitest-environment jsdom
import { describe, it, expect, afterEach, vi } from 'vitest';
import { createApp, h, nextTick, ref } from 'vue';
import AfterTree from '../tree';
const modes = ['all', 'parentFirst', 'onlyLeaf'];
const data = [
  {
    value: 'P',
    label: 'Parent',
    children: [
      { value: 'A', label: 'A' },
      { value: 'B', label: 'B' },
      { value: 'D', label: 'Disabled', disabled: true },
    ],
  },
];
const cleanup = [];
afterEach(() => {
  cleanup.splice(0).forEach((fn) => fn());
});
async function mount(Component, mode, initial = []) {
  const host = document.createElement('div');
  document.body.appendChild(host);
  const value = ref(initial),
    onChange = vi.fn();
  const app = createApp({
    setup: () => () =>
      h(Component, {
        data,
        checkable: true,
        checkAllAffectedBy: 'onlyEnabled',
        expandAll: true,
        transition: false,
        valueMode: mode,
        value: value.value,
        onChange: (next, context) => {
          onChange(next, context);
          value.value = next;
        },
      }),
  });
  app.mount(host);
  cleanup.push(() => {
    app.unmount();
    host.remove();
  });
  const input = (id) => host.querySelector(`[data-value="${id}"] input[type="checkbox"]`);
  await vi.waitFor(() => expect(input('D')).toBeTruthy());
  return {
    host,
    value,
    onChange,
    input,
    click: async (id) => {
      input(id).click();
      await nextTick();
    },
  };
}
const expected = (mode) => (mode === 'all' ? ['P', 'A', 'B'] : mode === 'parentFirst' ? ['P'] : ['A', 'B']);
const half = (host, id) =>
  host.querySelector(`[data-value="${id}"] .t-checkbox`).classList.contains('t-is-indeterminate');
describe('Tree disabled children controlled checking', () => {
  it.each(modes)('fixed parent checking and cancellation round-trip in %s', async (mode) => {
    const { host, input, value, click } = await mount(AfterTree, mode);
    await click('P');
    await vi.waitFor(() => expect(input('P').checked).toBe(true));
    expect(value.value).toEqual(expected(mode));
    expect(half(host, 'P')).toBe(false);
    expect(input('D').disabled).toBe(true);
    expect(input('D').checked).toBe(false);
    await click('P');
    await vi.waitFor(() => expect(value.value).toEqual([]));
    expect(input('P').checked).toBe(false);
    expect(half(host, 'P')).toBe(false);
  });
  it.each(modes)('enabled children derive partial and full selection in %s', async (mode) => {
    const { host, input, value, click } = await mount(AfterTree, mode);
    await click('A');
    await vi.waitFor(() => expect(half(host, 'P')).toBe(true));
    await click('B');
    await vi.waitFor(() => expect(input('P').checked).toBe(true));
    expect(half(host, 'P')).toBe(false);
    expect(value.value).toEqual(expected(mode));
    await click('A');
    await vi.waitFor(() => expect(half(host, 'P')).toBe(true));
    expect(value.value).toEqual(['B']);
  });
  it.each(['all', 'parentFirst'])('retains a selected disabled child in %s', async (mode) => {
    const { input, value, click } = await mount(AfterTree, mode, ['D']);
    await click('P');
    await vi.waitFor(() => expect(input('P').checked).toBe(true));
    expect(value.value).toEqual(mode === 'all' ? ['P', 'A', 'B', 'D'] : ['P', 'D']);
    expect(input('D').checked).toBe(true);
    await click('P');
    await vi.waitFor(() => expect(value.value).toEqual(['D']));
    expect(input('P').checked).toBe(false);
    expect(input('D').checked).toBe(true);
  });
});
