import { Card, Button, Loading } from '@tdesign/components';
import { mount } from '@vue/test-utils';
import { expect, it } from 'vitest';
import cardProps from '@tdesign/components/card/props';

describe('Card', () => {
  describe('props', () => {
    it(':actions[string/function]', () => {
      const wrapper = mount(() => <Card actions="actions">卡片内容</Card>);
      const actions = wrapper.find('.t-card__actions');
      expect(actions.exists()).toBeTruthy();
      expect(actions.text()).toBe('actions');

      const wrapper2 = mount(() => <Card actions={() => <Button>按钮</Button>}>卡片内容</Card>);
      expect(wrapper2.findComponent(Button).exists()).eq(true);
      expect(wrapper2.find('.t-card__actions').text()).toBe('按钮');
    });

    it(':actions[slot]', () => {
      const wrapper = mount(() => <Card v-slots={{ actions: () => <Button>按钮</Button> }}>卡片内容</Card>);
      expect(wrapper.findComponent(Button).exists()).eq(true);
      expect(wrapper.find('.t-card__actions').text()).toBe('按钮');
    });

    it(':avatar[string/function]', () => {
      const wrapper = mount(() => <Card avatar="avatar">卡片内容</Card>);
      const avatar = wrapper.find('.t-card__avatar');
      expect(avatar.exists()).toBeTruthy();
      expect(avatar.text()).toBe('avatar');

      const wrapper2 = mount(() => <Card avatar={() => <Button>按钮</Button>}>卡片内容</Card>);
      expect(wrapper2.findComponent(Button).exists()).eq(true);
      expect(wrapper2.find('.t-card__avatar').text()).toBe('按钮');
    });

    it(':avatar[slot]', () => {
      const wrapper = mount(() => <Card v-slots={{ avatar: () => <Button>按钮</Button> }}>卡片内容</Card>);
      expect(wrapper.findComponent(Button).exists()).eq(true);
      expect(wrapper.find('.t-card__avatar').text()).toBe('按钮');
    });

    it(':bordered[boolean]', () => {
      const wrapper = mount(() => <Card bordered />);
      expect(wrapper.classes()).toContain('t-card--bordered');

      const wrapper2 = mount(() => <Card bordered={false} />);
      expect(wrapper2.classes()).not.toContain('t-card--bordered');
    });

    it(':content[string/function]', () => {
      const wrapper = mount(() => <Card content="卡片内容" />);
      const body = wrapper.find('.t-card__body');
      expect(body.text()).toBe('卡片内容');

      const wrapper2 = mount(() => <Card content={() => <Button>按钮</Button>}></Card>);
      expect(wrapper2.findComponent(Button).exists()).eq(true);
      expect(wrapper2.find('.t-card__body').text()).toBe('按钮');

      // default is higher than content prop
      const wrapper3 = mount(() => <Card content="按钮">卡片内容</Card>);
      expect(wrapper3.find('.t-card__body').text()).toBe('卡片内容');
    });

    it(':content[slot]', () => {
      const wrapper = mount(() => <Card v-slots={{ content: () => <Button>按钮</Button> }}></Card>);
      expect(wrapper.findComponent(Button).exists()).eq(true);
      expect(wrapper.find('.t-card__body').text()).toBe('按钮');
    });

    it(':cover[string/function]', () => {
      const src = 'https://tdesign.gtimg.com/site/source/card-demo.png';
      const wrapper = mount(() => <Card cover={src}>卡片内容</Card>);
      const cover = wrapper.find('.t-card__cover img');
      expect(cover.exists()).toBeTruthy();
      expect(cover.element.getAttribute('src')).toBe(src);

      const wrapper2 = mount(() => <Card cover={() => <Button>按钮</Button>}>卡片内容</Card>);
      expect(wrapper2.findComponent(Button).exists()).eq(true);
      expect(wrapper2.find('.t-card__cover').text()).toBe('按钮');
    });

    it(':cover:slot', () => {
      const wrapper = mount(() => <Card v-slots={{ cover: () => <span class="custom-node" /> }} />);
      expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    });

    it(':default[string/function]', () => {
      const wrapper = mount(() => <Card>卡片内容</Card>);
      const body = wrapper.find('.t-card__body');
      expect(body.text()).toBe('卡片内容');

      const wrapper2 = mount(() => <Card default={() => <Button>按钮</Button>}>卡片内容</Card>);
      expect(wrapper2.findComponent(Button).exists()).eq(true);
      expect(wrapper2.find('.t-card__body').text()).toBe('按钮');
    });

    it(':default[slot]', () => {
      const wrapper = mount(() => <Card v-slots={{ default: () => <Button>按钮</Button> }}></Card>);
      expect(wrapper.findComponent(Button).exists()).eq(true);
      expect(wrapper.find('.t-card__body').text()).toBe('按钮');
    });

    it(':description[string/function]', () => {
      const wrapper = mount(() => <Card description="description">卡片内容</Card>);
      const description = wrapper.find('.t-card__description');
      expect(description.exists()).toBeTruthy();
      expect(description.text()).toBe('description');

      const wrapper2 = mount(() => <Card description={() => <Button>按钮</Button>}>卡片内容</Card>);
      expect(wrapper2.findComponent(Button).exists()).eq(true);
      expect(wrapper2.find('.t-card__description').text()).toBe('按钮');
    });

    it(':description[slot]', () => {
      const wrapper = mount(() => <Card v-slots={{ description: () => <Button>按钮</Button> }}></Card>);
      expect(wrapper.findComponent(Button).exists()).eq(true);
      expect(wrapper.find('.t-card__description').text()).toBe('按钮');
    });

    it(':footer[string/function]', () => {
      const wrapper = mount(() => <Card footer="footer">卡片内容</Card>);
      const footer = wrapper.find('.t-card__footer');
      expect(footer.exists()).toBeTruthy();
      expect(footer.text()).toBe('footer');

      const wrapper2 = mount(() => <Card footer={() => <Button>按钮</Button>}>卡片内容</Card>);
      expect(wrapper2.findComponent(Button).exists()).eq(true);
      expect(wrapper2.find('.t-card__footer').text()).toBe('按钮');
    });

    it(':footer[slot]', () => {
      const wrapper = mount(() => <Card v-slots={{ footer: () => <Button>按钮</Button> }}></Card>);
      expect(wrapper.findComponent(Button).exists()).eq(true);
      expect(wrapper.find('.t-card__footer').text()).toBe('按钮');
    });

    it(':header[string/function]', () => {
      const wrapper = mount(() => <Card header="header">卡片内容</Card>);
      const header = wrapper.find('.t-card__header');
      expect(header.exists()).toBeTruthy();
      expect(header.text()).toBe('header');

      const wrapper2 = mount(() => <Card header={() => <Button>按钮</Button>}>卡片内容</Card>);
      expect(wrapper2.findComponent(Button).exists()).eq(true);
      expect(wrapper2.find('.t-card__header').text()).toBe('按钮');
    });

    it(':header[slot]', () => {
      const wrapper = mount(() => <Card v-slots={{ header: () => <Button>按钮</Button> }}></Card>);
      expect(wrapper.findComponent(Button).exists()).eq(true);
      expect(wrapper.find('.t-card__header').text()).toBe('按钮');
    });

    it(':headerBordered[boolean]', () => {
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

    it(':hoverShadow[boolean]', () => {
      const wrapper = mount(() => <Card hoverShadow>卡片内容</Card>);
      expect(wrapper.classes()).toContain('t-card--shadow-hover');
    });

    it(':loading[string/function]', () => {
      const wrapper = mount(() => <Card loading>卡片内容</Card>);
      const loading = wrapper.find('.t-loading');
      const svg = loading.find('svg');
      expect(wrapper.findComponent(Loading).exists()).toBeTruthy();
      expect(loading.exists()).toBeTruthy();
      expect(svg.exists()).toBeTruthy();
      expect(svg.classes()).toContain('t-icon-loading');

      const wrapper2 = mount(() => <Card loading={() => <Button>按钮</Button>}>卡片内容</Card>);
      expect(wrapper2.findComponent(Button).exists()).eq(true);
    });

    it(':loading[slot]', () => {
      const wrapper = mount(() => <Card v-slots={{ loading: () => <span class="custom-node" /> }} />);
      expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    });

    it(':loadingProps[object]', () => {
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

    it(':shadow[boolean]', () => {
      const wrapper = mount(() => <Card shadow />);
      expect(wrapper.classes()).toContain('t-card--shadow');
    });

    it(':size[medium/small]', () => {
      const wrapper = mount(() => <Card size="medium" />);
      expect(wrapper.classes()).toContain('t-card');

      const wrapper2 = mount(() => <Card size="small" />);
      expect(wrapper2.classes()).toContain('t-size-s');

      const validator = cardProps.size.validator;
      expect(validator('medium')).toBeTruthy();
      expect(validator('small')).toBeTruthy();
      // @ts-expect-error types error
      expect(validator('large')).toBeFalsy();
      // @ts-expect-error types error
      expect(validator()).toBeTruthy();
    });

    it(':status[string]', () => {
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

    it(':subtitle[string/function]', () => {
      const wrapper = mount(() => <Card subtitle="subtitle">卡片内容</Card>);
      const subtitle = wrapper.find('.t-card__subtitle');
      expect(subtitle.exists()).toBeTruthy();
      expect(subtitle.text()).toBe('subtitle');

      const wrapper2 = mount(() => <Card subtitle={() => <Button>按钮</Button>}>卡片内容</Card>);
      expect(wrapper2.findComponent(Button).exists()).eq(true);
      expect(wrapper2.find('.t-card__subtitle').text()).toBe('按钮');
    });

    it(':subtitle[slot]', () => {
      const wrapper = mount(() => <Card v-slots={{ subtitle: () => <Button>按钮</Button> }}></Card>);
      expect(wrapper.findComponent(Button).exists()).eq(true);
      expect(wrapper.find('.t-card__subtitle').text()).toBe('按钮');
    });

    it(':theme[normal/poster1/poster2]', async () => {
      const wrapper1 = mount(() => (
        <Card actions="actions" theme="poster1">
          卡片内容
        </Card>
      ));
      const header = wrapper1.find('.t-card__header');
      expect(header.exists()).toBeTruthy();
      const actions = header.find('.t-card__actions');
      expect(actions.exists()).toBeTruthy();

      const wrapper2 = mount(() => (
        <Card actions="actions" theme="poster2">
          卡片内容
        </Card>
      ));

      const footer = wrapper2.find('.t-card__footer');
      expect(footer.exists()).toBeTruthy();
      const actions2 = footer.find('.t-card__actions');
      expect(actions2.exists()).toBeTruthy();

      const validator = cardProps.theme.validator;
      expect(validator('normal')).toBeTruthy();
      expect(validator('poster1')).toBeTruthy();
      expect(validator('poster2')).toBeTruthy();
      // @ts-expect-error types error
      expect(validator('poster3')).toBeFalsy();
      // @ts-expect-error types error
      expect(validator()).toBeTruthy();
    });

    it(':title[string/function]', () => {
      const wrapper = mount(() => <Card title="title">卡片内容</Card>);
      const title = wrapper.find('.t-card__title');
      expect(title.exists()).toBeTruthy();
      expect(title.text()).toBe('title');

      const wrapper2 = mount(() => <Card title={() => <Button>按钮</Button>}>卡片内容</Card>);
      expect(wrapper2.findComponent(Button).exists()).eq(true);
      expect(wrapper2.find('.t-card__title').text()).toBe('按钮');
    });

    it(':title[slot]', () => {
      const wrapper = mount(() => <Card v-slots={{ title: () => <Button>按钮</Button> }}></Card>);
      expect(wrapper.findComponent(Button).exists()).eq(true);
      expect(wrapper.find('.t-card__title').text()).toBe('按钮');
    });
  });
});
