// Dependencies components 第三方依赖组件
import { defineComponent } from 'vue';

// Global components 系统全局组件
import { useCommonClassName, usePrefixClass } from '../config-provider';
import TLoading from '../loading';

// API 接口相关
import props from './props';

// Page components and constants 页面相关组件与常量配置
const COMPONENT_NAME = usePrefixClass('card');
const { SIZE } = useCommonClassName();

// output defineComponent 输出组件
export default defineComponent({
  name: 'TCard',
  props,
  emits: ['image-error', 'actions'],
  setup(props, { slots, emit }) {
    //       return () => (
    //         slots.header ? (
    //             <div>
    //                 slots.header()
    //             </div>
    //         ) : null
    // {/* <div>{slots.header({ text: props.message })}</div> */}
    //         <div>{slots.default?.()}</div>

    // {/* <div>{slots.footer({ text: props.message })}</div> */}

    //     //   <div :class="[ns.b(), ns.is(`${shadow}-shadow`)]">
    //     //   <div v-if="$slots.header || header" :class="ns.e('header')">
    //     //     <slot name="header">{{ header }}</slot>
    //     //   </div>
    //     //   <div :class="ns.e('body')" :style="bodyStyle">
    //     //     <slot></slot>
    //     //   </div>
    //     // </div>
    //     );
    const baseCls: string[] = [`${COMPONENT_NAME.value}`];
    const headerCls: string[] = [`${COMPONENT_NAME.value}__header`];
    const actionsCls: string[] = [`${COMPONENT_NAME.value}__actions`];
    const headerTitleCls: string[] = [`${COMPONENT_NAME.value}__title`];
    const headersubTitleCls: string[] = [`${COMPONENT_NAME.value}__subtitle`];
    const bodyCls: string[] = [`${COMPONENT_NAME.value}__body`];
    const coverCls: string[] = [`${COMPONENT_NAME.value}__cover`];
    const footerCls: string[] = [`${COMPONENT_NAME.value}__footer`];

    if (props.size === 'small') {
      baseCls.push(`${SIZE.value[props.size]}`);
    }
    if (props.bordered) {
      baseCls.push(`${COMPONENT_NAME.value}--bordered`);
    }
    if (props.shadow) {
      baseCls.push(`${COMPONENT_NAME.value}__shadow`);
    }
    if (props.hoverShadow) {
      baseCls.push(`${COMPONENT_NAME.value}__shadow-hover`);
    }
    if (props.headBordered) {
      headerCls.push(`${COMPONENT_NAME.value}__title-bordered`);
    }

    const handleImgLoadError = () => {
      emit('image-error');
    };

    const handleActions = () => {
      emit('actions');
    };

    const textSubtitle = props.subtitle && <div class={headersubTitleCls}>{props.subtitle} </div>;
    const textTitle = props.title && (
      <div class={headerTitleCls}>
        {props.title} {textSubtitle || ''}
      </div>
    );

    const textActions = props.actions && (
      <div class={actionsCls}>
        <t-button variant="text" theme="primary" onClick={handleActions}>
          {props.actions}
        </t-button>
      </div>
    );

    const textCover = typeof props.cover === 'string' && <img src={props.cover} onError={handleImgLoadError}></img>;

    // 卡片风格：普通风格、海报风格1（操作区域在顶部）、海报风格2（操作区域在底部）。
    // 可选项：normal/poster1/poster2
    const isPoster2 = props.theme === 'poster2';

    const showHeader = slots.header || props.title || slots.actions || props.actions;
    const showFooter = slots.footer || props.footer;
    const showCover = slots.cover || props.cover;

    if (props.loading || slots.loading) {
      return (
        slots.loading?.() || (
          <TLoading>
            <div class={baseCls}></div>
          </TLoading>
        )
      );
    }

    return () => (
      <div class={baseCls}>
        {!isPoster2 && showHeader && (
          <div class={headerCls}>
            {slots.header?.()}
            {!slots.header && (slots.title?.() || textTitle)}
            {!slots.header && (slots.actions?.() || textActions)}
          </div>
        )}
        {showCover && <div class={coverCls}>{slots.cover?.() || textCover || props.cover}</div>}
        {slots.content && <div class={bodyCls}>{slots.content?.()}</div>}
        {slots.default && <div class={bodyCls}>{slots.default?.()}</div>}
        {isPoster2 && showHeader && (
          <div class={headerCls}>
            {slots.header?.()}
            {!slots.header && (slots.title?.() || textTitle)}
            {!slots.header && (slots.actions?.() || textActions)}
          </div>
        )}
        {showFooter && (
          <div class={footerCls}>
            {slots.footer?.() || props.footer}
            {!slots.footer && (slots.actions?.() || textActions)}
          </div>
        )}
      </div>
    );
  },
});
