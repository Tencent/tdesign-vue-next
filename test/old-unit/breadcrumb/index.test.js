import { mount } from '@vue/test-utils';
import Breadcrumb from '@/src/breadcrumb/index.ts';
import BreadcrumbItem from '@/src/breadcrumb/breadcrumb-item.tsx';

describe('Breadcrumb', () => {
  describe(':props', () => {
    it(':size', () => {
      const wrapper = mount({
        render() {
          return (
            <Breadcrumb size={'large'}>
              <BreadcrumbItem>面包屑1</BreadcrumbItem>
              <BreadcrumbItem>面包屑2</BreadcrumbItem>
            </Breadcrumb>
          );
        },
      });
      expect(wrapper.exists()).toBe(true);
    });
    it(':theme', () => {
      const wrapper = mount({
        render() {
          return (
            <Breadcrumb theme={'light'}>
              <BreadcrumbItem>面包屑1</BreadcrumbItem>
              <BreadcrumbItem>面包屑2</BreadcrumbItem>
            </Breadcrumb>
          );
        },
      });
      expect(wrapper.exists()).toBe(true);
    });
    it(':separator:string', () => {
      const wrapper = mount({
        render() {
          return (
            <Breadcrumb separator={'>'}>
              <BreadcrumbItem>面包屑1</BreadcrumbItem>
              <BreadcrumbItem>面包屑2</BreadcrumbItem>
            </Breadcrumb>
          );
        },
      });
      expect(wrapper.exists()).toBe(true);
    });
    it(':to', () => {
      const wrapper = mount({
        render() {
          return (
            <Breadcrumb>
              <BreadcrumbItem to={{ path: '/' }}>首页</BreadcrumbItem>
              <BreadcrumbItem>面包屑2</BreadcrumbItem>
            </Breadcrumb>
          );
        },
      });
      expect(wrapper.exists()).toBe(true);
    });
    it(':replace', () => {
      const wrapper = mount({
        render() {
          return (
            <Breadcrumb>
              <BreadcrumbItem to={{ path: '/' }} replace={true}>
                首页
              </BreadcrumbItem>
              <BreadcrumbItem>面包屑2</BreadcrumbItem>
            </Breadcrumb>
          );
        },
      });
      expect(wrapper.exists()).toBe(true);
    });
    it(':href', () => {
      const wrapper = mount({
        render() {
          return (
            <Breadcrumb separator={'/'}>
              <BreadcrumbItem href={'http://www.tencent.com/'}>面包屑1</BreadcrumbItem>
              <BreadcrumbItem>面包屑2</BreadcrumbItem>
            </Breadcrumb>
          );
        },
      });
    });
    it(':options', () => {
      const options = [{ content: '页面1' }, { content: '页面2' }];
      const wrapper = mount({
        render() {
          return <Breadcrumb options={options}></Breadcrumb>;
        },
      });
      expect(wrapper.exists()).toBe(true);
    });
  });
  // test events
  describe('@event', () => {
    it('Event passthrough ', () => {
      const fn = jest.fn();
      const wrapper = mount({
        render() {
          return (
            <Breadcrumb>
              <BreadcrumbItem onClick={fn}>面包屑</BreadcrumbItem>
            </Breadcrumb>
          );
        },
      });
      wrapper.findComponent(BreadcrumbItem).trigger('click');
    });
  });

  // test slots
  describe('<slot>', () => {
    it('<separator>', () => {
      const wrapper = mount(Breadcrumb, {
        render() {
          return (
            <Breadcrumb size={'large'}>
              <BreadcrumbItem>面包屑1</BreadcrumbItem>
              <BreadcrumbItem>面包屑2</BreadcrumbItem>
            </Breadcrumb>
          );
        },
        slots: {
          separator: '<i>-</i>',
        },
        provide: {
          tBreadcrumb: this,
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
