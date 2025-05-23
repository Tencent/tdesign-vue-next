import { isString } from 'lodash-es';
import { computed } from 'vue';
import { useTNodeJSX } from '@tdesign/hooks';
import { TdPrimaryTableProps } from '../type';
import Loading from '../../loading';
import useClassName from './useClassName';
import { useConfig } from '@tdesign/hooks';

export default function useAsyncLoading(props: TdPrimaryTableProps) {
  const renderTNode = useTNodeJSX();
  const { globalConfig } = useConfig('table', props.locale);
  const { isLoadingClass, isLoadMoreClass, asyncLoadingClass } = useClassName();

  const classes = computed(() => [
    asyncLoadingClass,
    {
      [isLoadingClass]: props.asyncLoading === 'loading',
      [isLoadMoreClass]: props.asyncLoading === 'load-more',
    },
  ]);

  function onLoadClick() {
    if (!isString(props.asyncLoading)) return;
    props.onAsyncLoadingClick?.({ status: props.asyncLoading });
  }

  function renderAsyncLoading() {
    const asyncLoadingNode = renderTNode('asyncLoading');
    if (isString(asyncLoadingNode)) {
      const { asyncLoading } = props;
      const loadingText = {
        'load-more': globalConfig.value.loadingMoreText,
        loading: globalConfig.value.loadingText,
      }[String(asyncLoading)];
      return (
        <div class={classes.value} onClick={onLoadClick}>
          {<Loading indicator={asyncLoading === 'loading'} loading={!!asyncLoading} size="small" text={loadingText} />}
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
