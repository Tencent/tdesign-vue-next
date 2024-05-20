import { mount } from '@vue/test-utils';
import Card from '@/src/card';
import Avatar from '@/src/avatar';

const cover = 'https://tdesign.gtimg.com/site/source/card-demo.png';
const avatar = 'https://tdesign.gtimg.com/site/avatar.jpg';

// every component needs four parts: props/events/slots/functions.
describe('Card', () => {
  // test props api
  describe(':props', () => {
    it('title', () => {
      const wrapper = mount({
        render() {
          return <Card title="标题"></Card>;
        },
      });
      expect(wrapper.find('.t-card__title').exists()).toBe(true);
      expect(wrapper.find('.t-card__title').text()).toBe('标题');
    });
    it('subtitle', () => {
      const wrapper = mount({
        render() {
          return <Card title="标题" subtitle="副标题"></Card>;
        },
      });
      expect(wrapper.find('.t-card__subtitle').exists()).toBe(true);
      expect(wrapper.find('.t-card__subtitle').text()).toBe('副标题');
    });
    it('description', () => {
      const wrapper = mount({
        render() {
          return <Card description="这是一段描述"></Card>;
        },
      });
      expect(wrapper.find('.t-card__description').exists()).toBe(true);
      expect(wrapper.find('.t-card__description').text()).toBe('这是一段描述');
    });
    it('avatar', () => {
      const wrapper = mount({
        render() {
          return <Card avatar={<Avatar image={avatar} />} cover={cover}></Card>;
        },
      });
      expect(wrapper.find('.t-avatar').exists()).toBe(true);
      expect(wrapper.find('.t-card__avatar').exists()).toBe(true);
    });
    it('cover', () => {
      const wrapper = mount({
        render() {
          return <Card cover={cover}></Card>;
        },
      });
      expect(wrapper.find('.t-card__cover').exists()).toBe(true);
      expect(wrapper.find('img').attributes('src')).toBe(cover);
    });
    it('header', () => {
      const wrapper = mount({
        render() {
          return <Card header={<div>头部</div>}></Card>;
        },
      });
      expect(wrapper.find('.t-card__header').exists()).toBe(true);
      expect(wrapper.find('.t-card__header').text()).toBe('头部');
    });
    it('footer', () => {
      const wrapper = mount({
        render() {
          return <Card footer={<div>底部</div>}></Card>;
        },
      });
      expect(wrapper.find('.t-card__footer').exists()).toBe(true);
      expect(wrapper.find('.t-card__footer').text()).toBe('底部');
    });
    it('actions', () => {
      const wrapper = mount({
        render() {
          return <Card actions={<div>操作</div>}></Card>;
        },
      });
      expect(wrapper.find('.t-card__actions').exists()).toBe(true);
      expect(wrapper.find('.t-card__actions').text()).toBe('操作');
    });
    it('loading', () => {
      const wrapper = mount({
        render() {
          return <Card loading></Card>;
        },
      });
      // 写入快照
      expect(wrapper.find('.t-loading').exists()).toBe(true);
    });
  });
});
