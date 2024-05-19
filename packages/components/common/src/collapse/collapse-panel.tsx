import type { Ref } from '@td/adapter-vue';
import { Transition, computed, defineComponent, inject, ref, toRefs } from '@td/adapter-vue';
import props from '@td/intel/collapse/collapse-panel-props';
import type { CollapseValue, TdCollapsePanelProps } from '@td/intel/collapse/type';
import { useCollapseAnimation, useContent, usePrefixClass, useTNodeJSX } from '@td/adapter-hooks';
import FakeArrow from '../common-components/fake-arrow';

export default defineComponent({
  name: 'TCollapsePanel',
  props,
  setup(props: TdCollapsePanelProps, { slots }) {
    const renderTNodeJSX = useTNodeJSX();
    const renderContent = useContent();
    const componentName = usePrefixClass('collapse-panel');
    const disableClass = usePrefixClass('is-disabled');
    const clickableClass = usePrefixClass('is-clickable');
    const transitionClass = usePrefixClass('slide-down');
    const { value, disabled, destroyOnCollapse } = toRefs(props);
    const collapseValue: Ref<CollapseValue> = inject('collapseValue');
    const updateCollapseValue: Function = inject('updateCollapseValue');
    const getUniqId: Function = inject('getUniqId', () => undefined, false);
    const {
      defaultExpandAll,
      disabled: disableAll,
      expandIconPlacement,
      expandOnRowClick,
    } = inject<any>('collapseProps');
    const renderParentTNode: Function = inject('renderParentTNode');
    const innerValue = value.value || getUniqId();
    if (defaultExpandAll.value) {
      updateCollapseValue(innerValue);
    }
    const { beforeEnter, enter, afterEnter, beforeLeave, leave, afterLeave } = useCollapseAnimation();
    const iconRef = ref<HTMLElement>();
    const isDisabled = computed(() => disabled.value || disableAll.value);
    const isActive = computed(() =>
      Array.isArray(collapseValue.value)
        ? collapseValue.value.includes(innerValue)
        : collapseValue.value === innerValue,
    );
    const classes = computed(() => {
      return [componentName.value, { [disableClass.value]: isDisabled.value }];
    });
    const panelExpandIcon = computed(() => slots.expandIcon || props.expandIcon);
    const handleClick = (e: MouseEvent) => {
      const canExpand = expandOnRowClick.value || e.currentTarget === iconRef.value;
      if (canExpand && !isDisabled.value) {
        updateCollapseValue(innerValue);
      }
      e.stopPropagation();
    };
    const handleHeaderRightContentClick = (e: MouseEvent) => {
      e.stopPropagation();
    };
    const renderDefaultIcon = () => {
      return <FakeArrow overlayClassName={`${componentName.value}__icon--default`} />;
    };
    const renderIcon = () => {
      const tNodeRender = panelExpandIcon.value === undefined ? renderParentTNode : renderTNodeJSX;
      return (
        <div
          ref={iconRef}
          class={`${componentName.value}__icon ${componentName.value}__icon--${expandIconPlacement.value} ${
            isActive.value ? `${componentName.value}__icon--active` : ''
          }`}
          onClick={handleClick}
        >
          {tNodeRender('expandIcon', renderDefaultIcon())}
        </div>
      );
    };
    const renderBlank = () => {
      return <div class={`${componentName.value}__header--blank`}></div>;
    };
    const renderHeaderRightContent = () => {
      const headerRightContent = renderTNodeJSX('headerRightContent');

      return headerRightContent ? <div onClick={handleHeaderRightContentClick}>{headerRightContent}</div> : null;
    };
    const renderHeader = () => {
      const cls = [
        `${componentName.value}__header`,
        {
          [clickableClass.value]: expandOnRowClick.value && !isDisabled.value,
        },
      ];

      return (
        <div class={cls} onClick={handleClick}>
          {expandIconPlacement.value === 'left' && renderIcon()}
          {renderTNodeJSX('header')}
          {renderBlank()}
          {renderHeaderRightContent()}
          {expandIconPlacement.value === 'right' && renderIcon()}
        </div>
      );
    };
    const renderBodyByNormal = () => {
      return (
        <div v-show={isActive.value} class={`${componentName.value}__body`}>
          <div class={`${componentName.value}__content`}>{renderContent('default', 'content')}</div>
        </div>
      );
    };
    const renderBodyDestroyOnCollapse = () => {
      return isActive.value
        ? (
          <div class={`${componentName.value}__body`}>
            <div class={`${componentName.value}__content`}>{renderContent('default', 'content')}</div>
          </div>
          )
        : null;
    };
    const renderBody = () => {
      return destroyOnCollapse.value ? renderBodyDestroyOnCollapse() : renderBodyByNormal();
    };
    return () => {
      return (
        <div class={classes.value}>
          <div class={`${componentName.value}__wrapper`}>
            {renderHeader()}
            <Transition
              name={transitionClass.value}
              onBeforeEnter={beforeEnter}
              onEnter={enter}
              onAfterEnter={afterEnter}
              onBeforeLeave={beforeLeave}
              onLeave={leave}
              onAfterLeave={afterLeave}
            >
              {renderBody()}
            </Transition>
          </div>
        </div>
      );
    };
  },
});
