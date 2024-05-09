import { defineComponent, computed } from 'vue';

import isString from 'lodash/isString';

import { useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass, useCommonClassName } from '../hooks/useConfig';
import TLoading from '../loading';

import props from './props';
import { TdCardProps } from './type';

export default defineComponent({
  name: 'TCard',
  props,
  setup(props, { slots }) {
    const renderTNodeJSX = useTNodeJSX();
    const COMPONENT_NAME = usePrefixClass('card');
    const { SIZE } = useCommonClassName();

    const baseCls = computed(() => {
      const defaultClass = [COMPONENT_NAME.value];

      if (props.size === 'small') defaultClass.push(`${SIZE.value[props.size]}`);
      if (props.bordered) defaultClass.push(`${COMPONENT_NAME.value}--bordered`);
      if (props.shadow) defaultClass.push(`${COMPONENT_NAME.value}--shadow`);
      if (props.hoverShadow) defaultClass.push(`${COMPONENT_NAME.value}--shadow-hover`);

      return defaultClass;
    });

    const headerCls = computed(() => {
      const defaultClass = [`${COMPONENT_NAME.value}__header`];
      return props.headerBordered
        ? defaultClass.concat(`${COMPONENT_NAME.value}__title--bordered`)
        : [`${COMPONENT_NAME.value}__header`];
    });

    const headerWrapperCls = usePrefixClass('card__header-wrapper');
    const headerAvatarCls = usePrefixClass('card__avatar');
    const headerTitleCls = usePrefixClass('card__title');
    const headerSubTitleCls = usePrefixClass('card__subtitle');
    const headerDescriptionCls = usePrefixClass('card__description');
    const actionsCls = usePrefixClass('card__actions');

    const bodyCls = usePrefixClass('card__body');
    const coverCls = usePrefixClass('card__cover');
    const footerCls = usePrefixClass('card__footer');
    const footerWrapperCls = usePrefixClass('card__footer-wrapper');

    // 卡片风格：普通风格、海报风格1（操作区域在顶部）、海报风格2（操作区域在底部）。
    // 可选项：normal/poster1/poster2
    const isPoster2 = computed(() => props.theme === 'poster2');

    const showTitle = computed(() => props.title || slots.title);
    const showHeader = computed(() => props.header || slots.header);
    const showSubtitle = computed(() => props.subtitle || slots.subtitle);
    const showAvatar = computed(() => props.avatar || slots.avatar);
    const showDescription = computed(() => props.description || slots.description);
    const showStatus = computed(() => props.status || slots.status);
    const showActions = computed(() => props.actions || slots.actions);
    const showFooter = computed(() => props.footer || slots.footer);
    const showCover = computed(() => props.cover || slots.cover);
    const showLoading = computed(() => props.loading || slots.loading);
    const showContent = computed(() => props.content || slots.content || props.default || slots.default);

    // 是否展示头部区域
    const isHeaderRender = computed(
      () =>
        showHeader.value ||
        showTitle.value ||
        showSubtitle.value ||
        showDescription.value ||
        showAvatar.value ||
        (showStatus.value && isPoster2.value) ||
        (showActions.value && !isPoster2.value),
    );

    // 是否展示底部区域
    const isFooterRender = computed(() => showFooter.value || (showActions.value && isPoster2.value));

    // 头部区域渲染逻辑
    const renderHeader = () => {
      if (showHeader.value) return <div class={headerCls.value}>{renderTNodeJSX('header')}</div>;
      return (
        <div class={headerCls.value}>
          <div class={headerWrapperCls.value}>
            {showAvatar.value && <div class={headerAvatarCls.value}>{renderTNodeJSX('avatar')}</div>}
            <div>
              {showTitle.value && <div class={headerTitleCls.value}>{renderTNodeJSX('title')}</div>}
              {showSubtitle.value && <div class={headerSubTitleCls.value}>{renderTNodeJSX('subtitle')}</div>}
              {showDescription.value && <p class={headerDescriptionCls.value}>{renderTNodeJSX('description')}</p>}
            </div>
          </div>
          {showActions.value && !isPoster2.value && <div class={actionsCls.value}>{renderTNodeJSX('actions')}</div>}
          {showStatus.value && <div class={actionsCls.value}>{renderTNodeJSX('status')}</div>}
        </div>
      );
    };

    // 封面区域渲染逻辑
    const renderCover = () => {
      const textCover = isString(props.cover);
      return <div class={coverCls.value}>{textCover ? <img src={props.cover}></img> : renderTNodeJSX('cover')}</div>;
    };

    return () => {
      const content = (
        <div class={baseCls.value}>
          {isHeaderRender.value ? renderHeader() : null}
          {showCover.value ? renderCover() : null}
          {showContent.value && (
            <div class={bodyCls.value}>{renderTNodeJSX('default') || renderTNodeJSX('content')}</div>
          )}
          {isFooterRender.value && (
            <div class={footerCls.value}>
              <div class={footerWrapperCls.value}>{renderTNodeJSX('footer')}</div>
              {showActions.value && isPoster2.value && <div class={actionsCls.value}>{renderTNodeJSX('actions')}</div>}
            </div>
          )}
        </div>
      );

      if (showLoading.value) {
        return (
          renderTNodeJSX('loading') || (
            <TLoading {...(props.loadingProps as TdCardProps['loadingProps'])}>{content}</TLoading>
          )
        );
      }
      return content;
    };
  },
});
