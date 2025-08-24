import { computed, defineComponent, ref, PropType } from 'vue';
import { CloseIcon as TdCloseIcon } from 'tdesign-icons-vue-next';
import tabProps from './props';
import tabPanelProps from './tab-panel-props';
import { TdTabsProps, TdTabPanelProps } from './type';

// hooks
import { useRipple, useGlobalIcon, usePrefixClass, useCommonClassName } from '@tdesign/shared-hooks';

export default defineComponent({
  name: 'TTabNavItem',
  props: {
    index: Number,
    active: {
      type: Boolean,
    },
    theme: tabProps.theme,
    size: tabProps.size,
    placement: tabProps.placement,
    label: {
      type: null,
    },
    disabled: tabPanelProps.disabled,
    removable: tabPanelProps.removable,
    value: tabPanelProps.value,
    onClick: Function as PropType<Function>,
    onTabRemove: Function as PropType<TdTabsProps['onRemove']>,
    onTabPanelRemove: Function as PropType<TdTabPanelProps['onRemove']>,
  },

  setup(props) {
    const itemRef = ref<HTMLElement>();
    useRipple(itemRef);

    const COMPONENT_NAME = usePrefixClass('tabs__nav-item');
    const { CloseIcon } = useGlobalIcon({ CloseIcon: TdCloseIcon });
    const classPrefix = usePrefixClass();
    const { STATUS, SIZE } = useCommonClassName();

    const removeBtnClick = ({ e }: { e: MouseEvent }) => {
      if (e) e.stopPropagation();
      props.onTabRemove({ e, value: props.value, index: props.index });
      props.onTabPanelRemove({ e, value: props.value });
    };
    const onClickNav = (e: MouseEvent) => {
      if (props.disabled) return;
      props.onClick(e);
    };

    const navItemClass = computed(() => {
      return {
        [COMPONENT_NAME.value]: true,
        [`${classPrefix.value}-tabs__nav--card`]: props.theme === 'card',
        [STATUS.value.disabled]: props.disabled,
        [STATUS.value.active]: props.active,
        [`${classPrefix.value}-is-left`]: props.placement === 'left',
        [`${classPrefix.value}-is-right`]: props.placement === 'right',
        [SIZE.value.medium]: props.size === 'medium',
        [SIZE.value.large]: props.size === 'large',
      };
    });

    const removeBtn = () =>
      props.removable && !props.disabled ? (
        <span onClick={(e) => removeBtnClick({ e })} class="remove-btn">
          <CloseIcon />
        </span>
      ) : null;

    const renderCardItem = () => {
      return (
        <div class={navItemClass.value} onClick={onClickNav} ref={itemRef}>
          <span class={`${COMPONENT_NAME.value}-text-wrapper`}>{props.label}</span>
          {removeBtn()}
        </div>
      );
    };
    const renderNormalItem = () => {
      return (
        <div class={navItemClass.value} onClick={onClickNav}>
          <div
            class={[
              `${COMPONENT_NAME.value}-wrapper`,
              {
                [STATUS.value.disabled]: props.disabled,
                [STATUS.value.active]: props.active,
              },
            ]}
            ref={itemRef}
          >
            <span class={`${COMPONENT_NAME.value}-text-wrapper`}>{props.label}</span>
          </div>
          {removeBtn()}
        </div>
      );
    };

    return () => {
      return props.theme === 'card' ? renderCardItem() : renderNormalItem();
    };
  },
});
