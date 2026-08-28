import { beforeAll, describe, expect, it, vi } from 'vitest';

vi.mock('@tdesign/common-js/components', () => ({
  WEB_COMPONENT_MAP: {
    button: ['Button'],
    loading: ['Loading'],
  },
  MOBILE_COMPONENT_MAP: {},
  CHAT_COMPONENT_MAP: {},
}));

describe('TDesignResolver', () => {
  let TDesignResolver: typeof import('../../../auto-import-resolver/src').TDesignResolver;

  beforeAll(async () => {
    ({ TDesignResolver } = await import('../../../auto-import-resolver/src'));
  });

  it('should resolve loading directive for vue-next', async () => {
    const resolvers = TDesignResolver({ library: 'vue-next' });
    const directiveResolver = resolvers.find(
      (resolver) => typeof resolver !== 'function' && resolver.type === 'directive',
    );

    expect(directiveResolver).toBeTruthy();
    if (!directiveResolver || typeof directiveResolver === 'function') throw new Error('directive resolver not found');
    expect(directiveResolver.resolve('Loading')).toEqual({
      name: 'LoadingDirective',
      from: 'tdesign-vue-next',
    });
  });

  it('should keep component resolution working with directive support', async () => {
    const resolvers = TDesignResolver({ library: 'vue-next' });
    const componentResolver = resolvers.find(
      (resolver) => typeof resolver !== 'function' && resolver.type === 'component',
    );

    expect(componentResolver).toBeTruthy();
    if (!componentResolver || typeof componentResolver === 'function') throw new Error('component resolver not found');
    expect(componentResolver.resolve('TButton')).toEqual({
      name: 'Button',
      from: 'tdesign-vue-next',
    });
  });
});
