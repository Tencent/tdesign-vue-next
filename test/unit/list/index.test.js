import { mount } from '@vue/test-utils';
import { List } from '@/src/list/index.ts';

describe('List', () => {
  let cmp;

  beforeEach(() => {
    cmp = mount(List, {
      propsData: {
        header: 'header',
        footer: 'footer',
        loading: 'loading',
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
  it('equals loading to "loading"', () => {
    expect(cmp.vm.loading).toEqual('loading');
  });
  it('equals size to "large"', () => {
    expect(cmp.vm.size).toEqual('large');
  });
  it('equals actionLayout to "horizontal"', () => {
    expect(cmp.vm.actionLayout).toEqual('horizontal');
  });
});
