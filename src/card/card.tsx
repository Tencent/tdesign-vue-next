import { defineComponent } from 'vue';

import { usePrefixClass, useCommonClassName } from '../hooks/useConfig';
import { useTNodeJSX } from '../hooks/tnode';
import TLoading from '../loading';
import props from './props';

export default defineComponent({
  name: 'TCard',
  props,
  emits: ['image-error', 'actions'],
  setup(props, { slots, emit }) {
    const renderTNodeJSX = useTNodeJSX();
    const COMPONENT_NAME = usePrefixClass('card');
    const { SIZE } = useCommonClassName();

    const baseCls = [`${COMPONENT_NAME.value}`];
    const headerCls = [`${COMPONENT_NAME.value}__header`];
    const headerAvatarCls = [`${COMPONENT_NAME.value}__avatar`];
    const headerTitleCls = [`${COMPONENT_NAME.value}__title`];
    const headerSubTitleCls = [`${COMPONENT_NAME.value}__subtitle`];
    const headerDescriptionCls = [`${COMPONENT_NAME.value}__description`];
    const actionsCls = [`${COMPONENT_NAME.value}__actions`];

    const bodyCls = [`${COMPONENT_NAME.value}__body`];
    const coverCls = [`${COMPONENT_NAME.value}__cover`];
    const footerCls = [`${COMPONENT_NAME.value}__footer`];

    if (props.size === 'small') baseCls.push(`${SIZE.value[props.size]}`);

    if (props.bordered) baseCls.push(`${COMPONENT_NAME.value}--bordered`);

    if (props.shadow) baseCls.push(`${COMPONENT_NAME.value}--shadow`);

    if (props.hoverShadow) baseCls.push(`${COMPONENT_NAME.value}--shadow-hover`);

    if (props.headerBordered) headerCls.push(`${COMPONENT_NAME.value}__title--bordered`);

    const handleImgLoadError = () => {
      emit('image-error');
    };

    // 卡片风格：普通风格、海报风格1（操作区域在顶部）、海报风格2（操作区域在底部）。
    // 可选项：normal/poster1/poster2
    const isPoster2 = props.theme === 'poster2';

    const showTitle = props.title || slots.title;
    const showHeader = props.header || slots.header;
    const showSubtitle = props.subtitle || slots.subtitle;
    const showAvatar = props.avatar || slots.avatar;
    const showDescription = props.description || slots.description;
    const showStatus = props.status || slots.status;
    const showActions = props.actions || slots.actions;
    const showFooter = props.footer || slots.footer;
    const showCover = props.cover || slots.cover;
    const showLoading = props.loading || slots.loading;
    const showContent = props.content || slots.content || props.default || slots.default;

    // 是否展示头部区域
    const isHeaderRender =
      showHeader ||
      showTitle ||
      showSubtitle ||
      showDescription ||
      showDescription ||
      showAvatar ||
      (showStatus && isPoster2) ||
      (showActions && !isPoster2);

    // 是否展示底部区域
    const isFooterRender = showFooter || (showActions && isPoster2);

    if (showLoading) {
      return (
        renderTNodeJSX('loading') || (
          <TLoading>
            <div class={baseCls}></div>
          </TLoading>
        )
      );
    }

    // 头部区域渲染逻辑
    const renderHeader = () => {
      if (showHeader) return <div class={headerCls}>{renderTNodeJSX('header')}</div>;
      return (
        <div class={headerCls}>
          <div class={`${COMPONENT_NAME.value}__header-wrapper`}>
            {showAvatar && <div class={headerAvatarCls}>{renderTNodeJSX('avatar')}</div>}
            <div>
              {showTitle && <span class={headerTitleCls}>{renderTNodeJSX('title')}</span>}
              {showSubtitle && <span class={headerSubTitleCls}>{renderTNodeJSX('subtitle')}</span>}
              {showDescription && <p class={headerDescriptionCls}>{renderTNodeJSX('description')}</p>}
            </div>
          </div>
          {showActions && !isPoster2 && <div class={actionsCls}>{renderTNodeJSX('actions')}</div>}
          {showStatus && <div class={actionsCls}>{renderTNodeJSX('status')}</div>}
        </div>
      );
    };

    // 封面区域渲染逻辑
    const renderCover = () => {
      const textCover = typeof props.cover === 'string';
      return (
        <div class={coverCls}>
          {textCover ? <img src={props.cover} onError={handleImgLoadError}></img> : renderTNodeJSX('cover')}
        </div>
      );
    };

    return () => (
      <div class={baseCls}>
        {isHeaderRender ? renderHeader() : null}
        {showCover ? renderCover() : null}
        {showContent && <div class={bodyCls}>{renderTNodeJSX('default') || renderTNodeJSX('content')}</div>}
        {isFooterRender && (
          <div class={footerCls}>
            <div class={`${COMPONENT_NAME.value}__footer-wrapper`}>{renderTNodeJSX('footer')}</div>
            {showActions && isPoster2 && <div class={actionsCls}>{renderTNodeJSX('actions')}</div>}
          </div>
        )}
      </div>
    );
  },
});
