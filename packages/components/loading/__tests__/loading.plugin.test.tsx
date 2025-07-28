import { nextTick, createApp } from 'vue';
import { expect, vi, describe, it, beforeEach, afterEach } from 'vitest';
import { LoadingPlugin } from '@tdesign/components';

// 模拟DOM元素
const mockElement = document.createElement('div');
document.body.appendChild(mockElement);

describe('LoadingPlugin', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    const div = document.createElement('div');
    div.id = 'app';
    document.body.appendChild(div);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('plugin:install', () => {
    const app = createApp({});
    app.use(LoadingPlugin);

    expect(app.config.globalProperties.$loading).toBeDefined();
  });

  it('plugin:methods-fullscreen', async () => {
    const loadingInstance = LoadingPlugin(true);

    await nextTick();

    expect(document.body.classList.contains('t-loading__parent--relative')).eq(true);
    expect(document.body.classList.contains('t-loading--lock')).eq(true);
    expect(document.querySelector('body > .t-loading') !== null).eq(true);

    loadingInstance.hide();
  });

  it('plugin:methods-fullscreen-close', async () => {
    LoadingPlugin(true);

    LoadingPlugin(false);

    await nextTick();

    expect(document.body.classList.contains('t-loading__parent--relative')).eq(false);
    expect(document.body.classList.contains('t-loading--lock')).eq(false);
  });

  it('plugin:methods-custom', async () => {
    const customText = '自定义加载文本';
    LoadingPlugin({
      fullscreen: true,
      text: customText,
    });

    await nextTick();

    const loadingText = document.querySelector('.t-loading__text');
    expect(loadingText).not.toBeNull();
    expect(loadingText.textContent).toBe(customText);
  });

  it('plugin:methods-attach', () => {
    const attachEl = document.createElement('div');
    attachEl.id = 'attach-test';
    document.body.appendChild(attachEl);

    LoadingPlugin({
      attach: '#attach-test',
      loading: true,
    });

    expect(attachEl.classList.contains('t-loading__parent--relative')).eq(true);
  });

  it('plugin:methods-preventScrollThrough', () => {
    LoadingPlugin({
      fullscreen: true,
      preventScrollThrough: true,
    });

    expect(document.body.classList.contains('t-loading--lock')).eq(true);
  });

  it('plugin:methods-hide', () => {
    const attachEl = document.createElement('div');
    attachEl.id = 'hide-test';
    document.body.appendChild(attachEl);

    const loadingInstance = LoadingPlugin({
      attach: '#hide-test',
      loading: true,
    });

    loadingInstance.hide();

    expect(attachEl.classList.contains('t-loading__parent--relative')).eq(false);
  });

  it('plugin:multiple instances', () => {
    const instance1 = LoadingPlugin(true);
    const instance2 = LoadingPlugin(true);

    expect(instance1).toBe(instance2);
  });

  it('plugin:multiple fullscreen instances', () => {
    const el1 = document.createElement('div');
    el1.id = 'test1';
    document.body.appendChild(el1);

    const el2 = document.createElement('div');
    el2.id = 'test2';
    document.body.appendChild(el2);

    const instance1 = LoadingPlugin({
      attach: '#test1',
      loading: true,
    });

    const instance2 = LoadingPlugin({
      attach: '#test2',
      loading: true,
    });

    expect(instance1).not.toBe(instance2);
  });

  it('plugin:error handling', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    LoadingPlugin({
      attach: '#non-existent-element',
      loading: true,
    });

    expect(consoleSpy).toHaveBeenCalledWith('attach is not exist');
  });
});
