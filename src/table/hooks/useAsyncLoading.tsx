import isString from 'lodash/isString';
import { computed, SetupContext } from 'vue';
import { useTNodeJSX } from '../../hooks/tnode';
import { TdPrimaryTableProps } from '../type';
import Loading from '../../loading';
import useClassName from './useClassName';
import { useConfig } from '../../hooks/useConfig';

export default function useAsyncLoading(props: TdPrimaryTableProps, context: SetupContext) {
  const renderTNode = useTNodeJSX();
  const { global } = useConfig('table');
  const { isLoadingClass, isLoadMoreClass, asyncLoadingClass } = useClassName();

  const classes = computed(() => [
    asyncLoadingClass,
    {
      [isLoadingClass]: props.asyncLoading === 'loading',
      [isLoadMoreClass]: props.asyncLoading === 'load-more',
    },
  ]);

  function onLoadClick() {
    if (typeof props.asyncLoading !== 'string') return;
    props.onAsyncLoadingClick?.({ status: props.asyncLoading });
  }

  function renderAsyncLoading() {
    const asyncLoadingNode = renderTNode('asyncLoading');
    if (isString(asyncLoadingNode)) {
      const { asyncLoading } = props;
      const loadingText = {
        'load-more': global.value.loadingMoreText,
        loading: global.value.loadingText,
      }[String(asyncLoading)];
      return (
        <div class={classes.value} onClick={onLoadClick}>
          {<Loading loading={asyncLoading === 'loading'} text={loadingText} />}
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
