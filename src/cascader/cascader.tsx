import { defineComponent, computed } from 'vue';

import Panel from './components/Panel';
import SelectInput from '../select-input';
import FakeArrow from '../common-components/fake-arrow';
import props from './props';
import { getPanels } from './utils/panel';

import { useCascaderContext } from './hooks';
import { CascaderValue } from './interface';
import { useConfig, usePrefixClass, useCommonClassName } from '../hooks/useConfig';

import {
  getSingleContent,
  getMultipleContent,
  closeIconClickEffect,
  getFakeArrowIconClass,
  innerContentClickEffect,
  handleRemoveTagEffect,
} from './utils/cascader';

export default defineComponent({
  name: 'TCascader',

  props: { ...props },

  setup(props, { slots }) {
    const COMPONENT_NAME = usePrefixClass('cascader');
    const classPrefix = usePrefixClass();
    const { STATUS } = useCommonClassName();
    const overlayClassName = usePrefixClass('cascader__popup');
    const { global } = useConfig('cascader');

    const { cascaderContext } = useCascaderContext(props);

    const selectVal = computed(() => {
      return props.multiple ? getMultipleContent(cascaderContext.value) : getSingleContent(cascaderContext.value);
    });

    const renderSuffixIcon = () => {
      const { visible, disabled } = cascaderContext.value;

      return (
        <FakeArrow
          overlayClassName={getFakeArrowIconClass(classPrefix.value, STATUS.value, cascaderContext.value)}
          isActive={visible}
          disabled={disabled}
        />
      );
    };

    const panels = computed(() => getPanels(cascaderContext.value.treeNodes));

    return () => {
      const { setVisible, visible, inputVal, setInputVal, setFilterActive } = cascaderContext.value;
      return (
        <SelectInput
          class={COMPONENT_NAME.value}
          value={selectVal.value}
          inputVal={inputVal}
          popupVisible={visible}
          keys={props.keys}
          allowInput={props.filterable}
          min-collapsed-num={props.minCollapsedNum}
          collapsed-items={props.collapsedItems}
          disabled={props.disabled}
          clearable={props.clearable}
          placeholder={global.value.placeholder}
          multiple={props.multiple}
          loading={props.loading}
          overlayClassName={overlayClassName.value}
          popup-props={{ overlayStyle: { width: !panels.value.length ? '1000px' : '' } }}
          onInputChange={(value) => {
            setInputVal(value);
            setFilterActive(!!value);
          }}
          onClick={(e: MouseEvent) => {
            e.stopPropagation();
            innerContentClickEffect(cascaderContext.value);
          }}
          onTagChange={(val: CascaderValue, ctx) => {
            handleRemoveTagEffect(cascaderContext.value, ctx.index, props.onRemove);
          }}
          onPopupVisibleChange={(val: boolean, context) => {
            if (context.trigger === 'trigger-element-click' && visible !== val) return;
            setVisible(val);
          }}
          onClear={() => {
            closeIconClickEffect(cascaderContext.value);
          }}
          v-slots={{
            panel: () => (
              <Panel
                empty={props.empty}
                visible={visible}
                trigger={props.trigger}
                cascaderContext={cascaderContext.value}
              >
                {{ empty: slots.empty }}
              </Panel>
            ),
            suffixIcon: () => renderSuffixIcon(),
            collapsedItems: slots.collapsedItems,
          }}
        />
      );
    };
  },
});
