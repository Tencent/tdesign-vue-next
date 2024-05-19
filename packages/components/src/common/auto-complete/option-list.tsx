import type { PropType } from '@td/adapter-vue';
import { computed, defineComponent, h, onBeforeUnmount, ref, watch } from '@td/adapter-vue';
import { escapeRegExp, isFunction, isString } from 'lodash-es';
import type { AutoCompleteOptionObj, TdAutoCompleteProps } from '@td/intel/components/auto-complete/type';
import type { CommonClassNameType } from '@td/adapter-hooks';
import log from '@td/shared/_common/js/log';
import { ARROW_DOWN_REG, ARROW_UP_REG, ENTER_REG } from '@td/shared/_common/js/common';
import { usePrefixClass } from '@td/adapter-hooks';
import { off, on } from '@td/adapter-utils';
import HighlightOption from './highlight-option';

export default defineComponent({
  name: 'AutoCompleteOptionList',

  props: {
    sizeClassNames: Object as PropType<CommonClassNameType['sizeClassNames']>,
    value: String,
    size: String as PropType<TdAutoCompleteProps['size']>,
    options: Array as PropType<TdAutoCompleteProps['options']>,
    popupVisible: Boolean,
    highlightKeyword: Boolean,
    filterable: Boolean,
    filter: Function as PropType<TdAutoCompleteProps['filter']>,
  },

  emits: ['select'],

  setup(props, { emit, slots, expose }) {
    const active = ref('');
    const classPrefix = usePrefixClass();

    const classes = computed(() => `${classPrefix.value}-select__list`);
    const optionClasses = computed(() => [
      `${classPrefix.value}-select-option`,
      {
        [props.sizeClassNames[props.size]]: props.size,
      },
    ]);

    // 整理数据格式
    const tOptions = computed<AutoCompleteOptionObj[]>(() => {
      let options = (props.options || []).map((item) => {
        let option: AutoCompleteOptionObj = {};
        if (isString(item)) {
          option = { text: item, label: item };
        } else {
          if (item.text && !isString(item.text)) {
            log.warn('AutoComplete', '`text` must be a string.');
          }
          if (!item.text) {
            if (isString(item.label)) {
              option = { ...item, text: item.label };
            } else {
              log.warn('AutoComplete', 'one of `label` and `text` must be a existed string.');
            }
          } else {
            option = item;
          }
        }
        return option;
      });
      // 自定义过滤规则
      if (props.filter) {
        options = options.filter(option => props.filter(props.value, option));
      } else if (props.filterable) {
        // 默认过滤规则
        const regExp = new RegExp(escapeRegExp(props.value), 'i');
        options = options.filter(item => regExp.test(item.text));
      }
      return options;
    });

    const onOptionClick = (e: MouseEvent) => {
      let liNode = e.target as HTMLElement;
      while (liNode && liNode.tagName !== 'LI') {
        liNode = liNode.parentNode as HTMLElement;
      }
      const keyword = liNode.getAttribute('title');
      active.value = keyword;
      emit('select', keyword, { e });
    };

    // 键盘事件，上下选择
    const onKeyInnerPress = (e: KeyboardEvent) => {
      if (ARROW_UP_REG.test(e.code) || ARROW_UP_REG.test(e.key)) {
        const index = tOptions.value.findIndex(item => item.text === active.value);
        const newIndex = index - 1 < 0 ? tOptions.value.length - 1 : index - 1;
        active.value = tOptions.value[newIndex]?.text;
      } else if (ARROW_DOWN_REG.test(e.code) || ARROW_DOWN_REG.test(e.key)) {
        const index = tOptions.value.findIndex(item => item.text === active.value);
        const newIndex = index + 1 >= tOptions.value.length ? 0 : index + 1;
        active.value = tOptions.value[newIndex]?.text;
      } else if (ENTER_REG.test(e.code) || ENTER_REG.test(e.key)) {
        if (active.value) {
          emit('select', active.value, { e });
        }
      }
    };

    const addKeyboardListener = () => {
      on(document, 'keydown', onKeyInnerPress);
    };

    const removeKeyboardListener = () => {
      off(document, 'keydown', onKeyInnerPress);
    };

    expose({
      addKeyboardListener,
      removeKeyboardListener,
    });

    watch(
      () => props.popupVisible,
      () => {
        if (props.popupVisible) {
          addKeyboardListener();
        } else {
          removeKeyboardListener();
        }
      },
      { immediate: true },
    );

    watch(
      () => props.value,
      () => {
        if (!props.value) {
          active.value = '';
        }
      },
      { immediate: true },
    );

    onBeforeUnmount(() => {
      removeKeyboardListener();
    });

    return () => {
      if (!tOptions.value.length) {
        return null;
      }
      return (
        <ul class={classes.value}>
          {tOptions.value.map((item) => {
            const cls = [...optionClasses.value];
            if (item.text === active.value) {
              cls.push(`${classPrefix.value}-select-option--hover`);
            }
            let labelNode: any = item.label;
            if (isFunction(item.label)) {
              labelNode = item.label(h);
            } else if (slots.option) {
              labelNode = slots.option?.({ option: item });
            }
            const content = labelNode || item.text;
            return (
              <li key={item.text} class={cls} title={item.text} onClick={onOptionClick}>
                {isString(content) && props.highlightKeyword
                  ? (
                    <HighlightOption content={content} keyword={props.value} />
                    )
                  : (
                      content
                    )}
              </li>
            );
          })}
        </ul>
      );
    };
  },
});
