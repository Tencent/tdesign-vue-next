import { defineComponent, nextTick, ref, watch } from 'vue';
import props from './props';
import { usePrefixClass } from '../hooks/useConfig';
import { Suggestion } from './type';

export default defineComponent({
  name: 'TSearch',
  props: {
    ...props,
  },
  emits: ['clickIcon', 'clickText', 'search'],
  setup(props, { slots, emit }) {
    const COMPONENT_NAME = usePrefixClass('search');
    const batch = ref<boolean>(false);
    const inputValue = ref<string>('');
    const inputTagValue = ref<string[]>([]);
    const isConfirm = ref<boolean>(false);
    const suggestions = ref<Suggestion[]>([]);
    const result = ref<Suggestion[]>([]);
    const visible = ref<boolean>(false);
    const historyList = ref<string[]>([]);

    const handleFocus = () => {
      if (props.batch) {
        batch.value = true;
        nextTick(() => {
          const dom = document.getElementsByClassName('t-textarea__inner')[0];
          (dom as HTMLTextAreaElement).focus();
        });
      }
      if (props.suggestions.length) {
        visible.value = true;
      }
    };
    const handleBlur = () => {
      if (props.batch) {
        batch.value = false;
      }
      if (props.suggestions.length) {
        visible.value = false;
      }
    };

    const handleChange = (val: string) => {
      if (props.batch) {
        inputValue.value = val;
      }
    };

    const handleClear = (e: MouseEvent) => {
      if (props.batch) {
        e.preventDefault();
        batch.value = false;
        isConfirm.value = false;
        inputValue.value = '';
        inputTagValue.value = [];
      }
    };

    const handleConfirm = (e: MouseEvent) => {
      if (props.batch) {
        e.preventDefault();
        batch.value = false;
        isConfirm.value = true;
        const arr = inputValue.value.split('\n');
        inputTagValue.value = arr;
        emit('search');
      }
    };

    const handleTagInputFocus = () => {
      if (props.batch) {
        inputValue.value = inputTagValue.value.join('\n');
        batch.value = true;
        isConfirm.value = false;
        nextTick(() => {
          const dom = document.getElementsByClassName('t-textarea__inner')[0];
          (dom as HTMLTextAreaElement).focus();
        });
      }
    };

    const handleClickIcon = (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      emit('search');
      emit('clickIcon', e);
    };
    const handleClickTagInputIcon = (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      emit('search');
    };

    const handleClickText = (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      emit('search');
      emit('clickText', e);
    };

    const handleClickSuggestionItem = (item: string | Suggestion) => {
      if (typeof item === 'string') {
        if (props.history) {
          historyList.value.push(item);
        }
        inputValue.value = item;
      } else {
        if (props.history) {
          historyList.value.push(item.value);
        }
        inputValue.value = item.value;
      }
      visible.value = false;
    };

    const handleSuggestionInputChange = (val: string) => {
      inputValue.value = val;
      result.value = suggestions.value.filter((item: string | Suggestion) => {
        if (typeof item === 'string') {
          return item.includes(val);
        }
        return item.value.includes(val);
      });
    };

    const handleSuggestionClear = (context: { e: MouseEvent }) => {
      context.e.stopPropagation();
      visible.value = false;
    };
    const inputSlot = {
      suffix: () => {
        if (props.showIcon && slots.suffix) {
          return (
            <>
              <t-icon
                class={`${COMPONENT_NAME.value}-suffix-icon`}
                size="18px"
                name="search"
                onMousedown={(e: MouseEvent) => handleClickIcon(e)}
              ></t-icon>
              <div style={{ cursor: 'default' }} onMousedown={(e: MouseEvent) => handleClickText(e)}>
                {slots.suffix?.()}
              </div>
            </>
          );
        }
        if (!props.showIcon && slots.suffix) {
          return (
            <div style={{ cursor: 'default' }} onMousedown={(e: MouseEvent) => handleClickText(e)}>
              {slots.suffix?.()}
            </div>
          );
        }
        if (props.showIcon && !slots.suffix) {
          return (
            <t-icon
              class={`${COMPONENT_NAME.value}-suffix-icon`}
              size="18px"
              name="search"
              onMousedown={(e: MouseEvent) => handleClickIcon(e)}
            ></t-icon>
          );
        }
        return null;
      },
    };

    const renderContent = () => {
      if (props.suggestions.length) {
        const slot = {
          content: () => {
            return (
              <div class={`${COMPONENT_NAME.value}-suggestion`}>
                {historyList.value.length ? (
                  <div>
                    <t-divider>历史记录</t-divider>
                    {historyList.value.map((item) => {
                      return (
                        <div
                          class={`${COMPONENT_NAME.value}-suggestion-item`}
                          onClick={() => handleClickSuggestionItem(item)}
                        >
                          {item}
                        </div>
                      );
                    })}
                    <t-divider>其他搜索内容</t-divider>
                  </div>
                ) : null}
                {inputValue.value
                  ? result.value.map((item) => {
                      if (typeof item === 'string') {
                        return (
                          <div
                            class={`${COMPONENT_NAME.value}-suggestion-item`}
                            onClick={() => handleClickSuggestionItem(item)}
                          >
                            {slots.item ? slots.item({ item }) : item}
                          </div>
                        );
                      }
                      return (
                        <div
                          class={`${COMPONENT_NAME.value}-suggestion-item`}
                          onClick={() => handleClickSuggestionItem(item)}
                        >
                          {slots.item ? slots.item({ item }) : (item as Suggestion).value}
                        </div>
                      );
                    })
                  : null}
              </div>
            );
          },
        };
        return (
          <t-popup
            placement="bottom"
            trigger="click"
            v-slots={slot}
            visible={visible.value}
            overlayStyle={(triggerElem: HTMLElement) => ({ width: `${triggerElem.offsetWidth}px` })}
          >
            <t-input
              {...props}
              clearable
              v-model={inputValue.value}
              v-slots={inputSlot}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleSuggestionInputChange}
              onClear={handleSuggestionClear}
            ></t-input>
          </t-popup>
        );
      }
      if (props.batch) {
        if (batch.value) {
          return (
            <div class={`${COMPONENT_NAME.value}-textarea`}>
              <t-textarea
                placeholder="可批量搜索，一行一个，回车执行"
                v-model={inputValue.value}
                style={{ minHeight: '78px' }}
                autofocus
                onBlur={handleBlur}
                onChange={handleChange}
              ></t-textarea>
              <div class={`${COMPONENT_NAME.value}-textarea-btn`}>
                <t-button
                  style={{ marginRight: '8px' }}
                  theme="default"
                  onMousedown={(e: MouseEvent) => handleClear(e)}
                >
                  清空
                </t-button>
                <t-button theme="primary" onMousedown={(e: MouseEvent) => handleConfirm(e)}>
                  确定
                </t-button>
              </div>
            </div>
          );
        }
        if (!isConfirm.value) {
          return (
            <t-input {...props} defaultValue={inputValue.value} v-slots={inputSlot} onClick={handleFocus}></t-input>
          );
        }
        return (
          <div class={`${COMPONENT_NAME.value}-tag-input`}>
            <div
              class={`${COMPONENT_NAME.value}-tag-input-icon`}
              onClick={(e: MouseEvent) => handleClickTagInputIcon(e)}
            >
              <t-icon name="search" size="18px"></t-icon>
            </div>
            <t-tag-Input v-model={inputTagValue.value} onClick={handleTagInputFocus}></t-tag-Input>
          </div>
        );
      }
      return <t-input {...props} v-slots={inputSlot}></t-input>;
    };

    watch(
      () => props.suggestions,
      (val) => {
        suggestions.value = [...(val as Suggestion[])];
      },
      { immediate: true, deep: true },
    );

    return () => <div class={COMPONENT_NAME.value}>{renderContent()}</div>;
  },
});
