import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { expect, describe, it, beforeEach, afterEach } from 'vitest';
import { vLoading } from '../directive';

describe('Loading Directive', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    const div = document.createElement('div');
    div.id = 'app';
    document.body.appendChild(div);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('directive:v-loading', async () => {
    const wrapper = mount({
      template: '<div v-loading="true"></div>',
      directives: { loading: vLoading },
    });

    await nextTick();

    expect(wrapper.classes()).toContain('t-loading__parent--relative');
    expect(wrapper.find('.t-loading').exists()).eq(true);
  });

  it('directive:v-loading[false]', async () => {
    const wrapper = mount({
      template: '<div v-loading="false"></div>',
      directives: { loading: vLoading },
    });

    await nextTick();

    expect(wrapper.classes()).not.toContain('t-loading__parent--relative');
    expect(wrapper.find('.t-loading').exists()).eq(false);
  });

  it('directive:dynamic v-loading', async () => {
    const wrapper = mount({
      template: '<div v-loading="loading"></div>',
      directives: { loading: vLoading },
      data() {
        return {
          loading: false,
        };
      },
    });

    await nextTick();
    expect(wrapper.find('.t-loading').exists()).eq(false);

    await wrapper.setData({ loading: true });
    await nextTick();
    expect(wrapper.find('.t-loading').exists()).eq(true);

    await wrapper.setData({ loading: false });
    await nextTick();
    expect(wrapper.find('.t-loading').exists()).eq(false);
  });

  it('directive:modifiers', async () => {
    const wrapper = mount({
      template: '<div v-loading.fullscreen="true"></div>',
      directives: { loading: vLoading },
    });

    await nextTick();

    expect(wrapper.find('.t-loading').exists()).eq(true);
  });

  it('directive:modifiers[inheritColor]', async () => {
    const wrapper = mount({
      template: '<div v-loading.inheritColor="true"></div>',
      directives: { loading: vLoading },
    });

    await nextTick();

    expect(wrapper.find('.t-loading--inherit-color').exists()).eq(true);
  });

  it('directive:modifiers[more]', async () => {
    const wrapper = mount({
      template: '<div v-loading.fullscreen.inheritColor="true"></div>',
      directives: { loading: vLoading },
    });

    await nextTick();

    expect(wrapper.find('.t-loading').exists()).eq(true);
    expect(wrapper.find('.t-loading').classes()).toContain('t-loading--inherit-color');
  });

  it('directive:object value', async () => {
    const wrapper = mount({
      template: '<div v-loading="loadingOptions"></div>',
      directives: { loading: vLoading },
      data() {
        return {
          loadingOptions: {
            loading: true,
            text: '加载中...',
            size: 'large',
          },
        };
      },
    });

    await nextTick();

    expect(wrapper.find('.t-loading').exists()).eq(true);
    expect(wrapper.find('.t-loading__text').text()).toBe('加载中...');
    expect(wrapper.find('.t-loading').classes()).toContain('t-size-l');
  });

  it('directive:object-dynamic', async () => {
    const wrapper = mount({
      template: '<div id="test" v-loading="loadingOptions"></div>',
      directives: { loading: vLoading },
      data() {
        return {
          loadingOptions: {
            loading: true,
            text: '加载中...',
          },
        };
      },
    });

    await nextTick();
    expect(wrapper.find('.t-loading__text').text()).toBe('加载中...');

    await wrapper.setData({
      loadingOptions: {
        loading: false,
      },
    });
    await nextTick();
    expect(wrapper.find('.t-loading').exists()).eq(false);
  });

  it('directive:object value [cover modifiers]', async () => {
    const wrapper = mount({
      template: '<div v-loading.inheritColor="loadingOptions"></div>',
      directives: { loading: vLoading },
      data() {
        return {
          loadingOptions: {
            loading: true,
            inheritColor: false,
          },
        };
      },
    });

    await nextTick();

    expect(wrapper.find('.t-loading--inherit-color').exists()).eq(false);
  });

  it('directive:lifecycle', async () => {
    const wrapper = mount({
      template: '<div v-if="show"><div v-loading="true"></div></div>',
      directives: { loading: vLoading },
      data() {
        return {
          show: true,
        };
      },
    });

    await nextTick();
    expect(wrapper.find('.t-loading').exists()).eq(true);

    await wrapper.setData({ show: false });
    await nextTick();
    expect(wrapper.find('.t-loading').exists()).eq(false);
  });
});
