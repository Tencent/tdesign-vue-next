import { mount } from '@vue/test-utils';
import { it, expect } from 'vitest';
import Card from '@src/card';

// every component needs four parts: props/events/slots/functions.
describe('Card', () => {
  // test props api
  describe(':props', () => {
    it('', () => {
      const wrapper = mount({
        render() {
          return <Card></Card>;
        },
      });
      expect(wrapper.exists()).toBe(true);
    });

    it(':bordered', () => {
      const wrapper = mount(() => <Card bordered />);
      expect(wrapper.classes()).toContain('t-card--bordered');
    });

    it(':shadow', () => {
      const wrapper = mount(() => <Card shadow />);
      expect(wrapper.classes()).toContain('t-card--shadow');
    });

    it(':size:medium', () => {
      const wrapper = mount(() => <Card size="medium" />);
      expect(wrapper.classes()).toContain('t-card');
    });

    it(':size:small', () => {
      const wrapper = mount(() => <Card size="small" />);
      expect(wrapper.classes()).toContain('t-size-s');
    });

    it(':hoverShadow', () => {
      const wrapper = mount(() => <Card hoverShadow>卡片内容</Card>);
      expect(wrapper.classes()).toContain('t-card--shadow-hover');
    });

    it(':default', () => {
      const wrapper = mount(() => <Card>卡片内容</Card>);
      const body = wrapper.find('.t-card__body');
      expect(body.text()).toBe('卡片内容');
    });

    it(':content', () => {
      const wrapper = mount(() => <Card content="卡片内容" />);
      const body = wrapper.find('.t-card__body');
      expect(body.text()).toBe('卡片内容');
    });

    it(':header', () => {
      const wrapper = mount(() => <Card header="header">卡片内容</Card>);
      const header = wrapper.find('.t-card__header');
      expect(header.exists()).toBeTruthy();
      expect(header.text()).toBe('header');
    });

    it(':headerBordered', () => {
      const wrapper = mount(() => (
        <Card header="header" headerBordered>
          卡片内容
        </Card>
      ));
      const header = wrapper.find('.t-card__header');
      expect(header.exists()).toBeTruthy();
      expect(header.text()).toBe('header');
      expect(header.classes()).toContain('t-card__title--bordered');
    });

    it(':footer', () => {
      const wrapper = mount(() => <Card footer="footer">卡片内容</Card>);
      const footer = wrapper.find('.t-card__footer');
      expect(footer.exists()).toBeTruthy();
      expect(footer.text()).toBe('footer');
    });

    it(':title', () => {
      const wrapper = mount(() => <Card title="title">卡片内容</Card>);
      const title = wrapper.find('.t-card__title');
      expect(title.exists()).toBeTruthy();
      expect(title.text()).toBe('title');
    });

    it(':subtitle', () => {
      const wrapper = mount(() => <Card subtitle="subtitle">卡片内容</Card>);
      const subtitle = wrapper.find('.t-card__subtitle');
      expect(subtitle.exists()).toBeTruthy();
      expect(subtitle.text()).toBe('subtitle');
    });

    it(':description', () => {
      const wrapper = mount(() => <Card description="description">卡片内容</Card>);
      const description = wrapper.find('.t-card__description');
      expect(description.exists()).toBeTruthy();
      expect(description.text()).toBe('description');
    });

    it(':avatar', () => {
      const wrapper = mount(() => <Card avatar="avatar">卡片内容</Card>);
      const avatar = wrapper.find('.t-card__avatar');
      expect(avatar.exists()).toBeTruthy();
      expect(avatar.text()).toBe('avatar');
    });

    it(':cover', () => {
      const src = 'https://tdesign.gtimg.com/site/source/card-demo.png';
      const wrapper = mount(() => <Card cover={src}>卡片内容</Card>);
      const cover = wrapper.find('.t-card__cover img');
      expect(cover.exists()).toBeTruthy();
      expect(cover.element.getAttribute('src')).toBe(src);
    });

    it(':actions', () => {
      const wrapper = mount(() => <Card actions="actions">卡片内容</Card>);
      const actions = wrapper.find('.t-card__actions');
      expect(actions.exists()).toBeTruthy();
      expect(actions.text()).toBe('actions');
    });

    it(':loading', () => {
      const wrapper = mount(() => <Card loading>卡片内容</Card>);
      const loading = wrapper.find('.t-loading');
      const svg = loading.find('svg');
      expect(loading.exists()).toBeTruthy();
      expect(svg.exists()).toBeTruthy();
      expect(svg.classes()).toContain('t-icon-loading');
    });

    it(':loadingProps', () => {
      const loadingProps = {
        text: 'TDesign努力加载中...',
      };
      const wrapper = mount(() => (
        <Card loading loadingProps={loadingProps}>
          卡片内容
        </Card>
      ));
      const loading = wrapper.find('.t-loading');
      const loadingText = wrapper.find('.t-loading__text');
      expect(loading.exists()).toBeTruthy();
      expect(loadingText.exists()).toBeTruthy();
      expect(loadingText.text()).toBe('TDesign努力加载中...');
    });

    it(':theme:poster1', () => {
      const wrapper = mount(() => (
        <Card actions="actions" theme="poster1">
          卡片内容
        </Card>
      ));
      const header = wrapper.find('.t-card__header');
      const actions = header.find('.t-card__actions');
      expect(header.exists()).toBeTruthy();
      expect(actions.exists()).toBeTruthy();
    });

    it(':theme:poster2', () => {
      const wrapper = mount(() => (
        <Card actions="actions" theme="poster2">
          卡片内容
        </Card>
      ));
      const footer = wrapper.find('.t-card__footer');
      const actions = footer.find('.t-card__actions');
      expect(footer.exists()).toBeTruthy();
      expect(actions.exists()).toBeTruthy();
    });

    it(':status', () => {
      const wrapper = mount(() => (
        <Card actions="actions" theme="poster2" status="status">
          卡片内容
        </Card>
      ));
      const header = wrapper.find('.t-card__header');
      const actions = header.find('.t-card__actions');
      expect(header.exists()).toBeTruthy();
      expect(actions.exists()).toBeTruthy();
      expect(actions.text()).toBe('status');
    });
  });
});
