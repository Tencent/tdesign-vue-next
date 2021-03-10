import { mount } from '@vue/test-utils';
import { List } from '@/src/list/index.ts';

describe('List', () => {
  let cmp;

  beforeEach(() => {
    cmp = mount(List, {
      propsData: {
        header: 'header',
        footer: 'footer',
        asyncLoading: 'asyncLoading',
        size: 'large',
      },
    });
  });

  it('equals header to "header"', () => {
    expect(cmp.vm.header).toEqual('header');
  });
  it('equals footer to "footer"', () => {
    expect(cmp.vm.footer).toEqual('footer');
  });
  it('equals asyncLoading to "asyncLoading"', () => {
    expect(cmp.vm.asyncLoading).toEqual('asyncLoading');
  });
  it('equals size to "large"', () => {
    expect(cmp.vm.size).toEqual('large');
  });
  it('equals layout to "horizontal"', () => {
    expect(cmp.vm.layout).toEqual('horizontal');
  });
});
