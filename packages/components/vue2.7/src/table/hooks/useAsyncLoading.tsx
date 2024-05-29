import { isString } from 'lodash-es';
import type { CreateElement, SetupContext } from '@td/adapter-vue';
import { computed } from '@td/adapter-vue';
import { useConfig, useTNodeJSX } from '@td/adapter-hooks';
import { Loading } from '@td/component';
import type { TdPrimaryTableProps } from '@td/components/table/type';
import useClassName from './useClassName';

export default function useAsyncLoading(props: TdPrimaryTableProps, context: SetupContext) {
  const renderTNode = useTNodeJSX();
  const { global } = useConfig('table', props.locale);
  const { isLoadingClass, isLoadMoreClass, asyncLoadingClass } = useClassName();

  const classes = computed(() => [
    asyncLoadingClass,
    {
      [isLoadingClass]: props.asyncLoading === 'loading',
      [isLoadMoreClass]: props.asyncLoading === 'load-more',
    },
  ]);

  function onLoadClick() {
    if (typeof props.asyncLoading !== 'string') {
      return;
    }
    props.onAsyncLoadingClick?.({ status: props.asyncLoading });
    // Vue3 ignore next line
    context.emit('async-loading-click', { status: props.asyncLoading });
  }

  // eslint-disable-next-line
  function renderAsyncLoading(h: CreateElement) {
    const asyncLoadingNode = renderTNode('asyncLoading');
    if (isString(asyncLoadingNode)) {
      const { asyncLoading } = props;
      const loadingText = {
        'load-more': global.value.loadingMoreText,
        'loading': global.value.loadingText,
      }[String(asyncLoading)];
      return (
        <div class={classes.value} onClick={onLoadClick}>
          <Loading indicator={asyncLoading === 'loading'} loading={!!asyncLoading} size="small" text={loadingText} />
        </div>
      );
    }
    if (![null, false, undefined].includes(asyncLoadingNode)) {
      return (
        <div class={classes.value} onClick={onLoadClick}>
          {asyncLoadingNode}
        </div>
      );
    }
    return null;
  }
  return {
    renderAsyncLoading,
  };
}
