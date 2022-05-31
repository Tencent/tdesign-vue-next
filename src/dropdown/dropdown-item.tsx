import { defineComponent, ref, inject } from 'vue';
import { ChevronRightIcon } from 'tdesign-icons-vue-next';
import TDivider from '../divider';
import itemProps from './dropdown-item-props';
import useRipple from '../hooks/useRipple';
import { useCommonClassName, usePrefixClass } from '../hooks/useConfig';
import { useContent } from '../hooks/tnode';
import { injectKey } from './const';

export default defineComponent({
  name: 'TDropdownItem',
  props: {
    ...itemProps,
    path: {
      type: String,
      default: '',
    },
    hasChildren: {
      type: Boolean,
      default: false,
    },
    onHover: {
      type: Function,
    },
  },
  setup(props) {
    const renderContent = useContent();
    const itemRef = ref<HTMLElement>();
    useRipple(itemRef);

    const { STATUS } = useCommonClassName();
    const COMPONENT_NAME = usePrefixClass('dropdown__item');
    const classPrefix = usePrefixClass();

    const dropdownProvider = inject(injectKey);
    const { handleMenuClick } = dropdownProvider;

    const renderSuffix = () => {
      return props.hasChildren ? <ChevronRightIcon class={`${COMPONENT_NAME.value}__item-icon`} /> : null;
    };

    const handleItemClick = (e: MouseEvent): void => {
      e.stopPropagation();
      if (!props.hasChildren && !props.disabled) {
        const data = {
          value: props.value,
          path: props.path || `/${props.value}`,
          content: props.content,
        };
        props.onClick?.(data, { e });
        handleMenuClick(data, { e });
      }
    };

    const handleMouseover = (): void => {
      props.onHover?.(props.path);
    };

    return () => {
      const classes = [
        COMPONENT_NAME.value,
        {
          [`${classPrefix.value}-dropdown--suffix`]: props.hasChildren,
          [STATUS.value.disabled]: props.disabled,
          [STATUS.value.active]: props.active,
        },
      ];

      return (
        <div>
          <div ref={itemRef} class={classes} onClick={handleItemClick} onMouseover={handleMouseover}>
            <div class={`${COMPONENT_NAME.value}-content`}>
              <span class={`${COMPONENT_NAME.value}-text`}>{renderContent('content', 'default')}</span>
            </div>
            {renderSuffix()}
          </div>
          {props.divider ? <TDivider /> : null}
        </div>
      );
    };
  },
});
