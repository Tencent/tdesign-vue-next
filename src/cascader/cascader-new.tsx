import { defineComponent, computed } from 'vue';
import { CloseCircleFilledIcon } from 'tdesign-icons-vue-next';

import Panel from './components/Panel';
import SelectInput from '../select-input';
import TLoading from '../loading';
import FakeArrow from '../common-components/fake-arrow';
import props from './props';

import { useCascaderContext } from './hooks';
import { CascaderValue } from './interface';
import { useConfig, usePrefixClass } from '../config-provider';
import { getSingleContent, getMultipleContent, closeIconClickEffect } from './utils/inputContent';

export default defineComponent({
  name: 'TCascaderNew',

  components: {
    Panel,
  },

  props: { ...props, haveInput: Boolean },

  setup(props, { slots }) {
    const COMPONENT_NAME = usePrefixClass('cascader');
    const { cascaderContext, setInnerValue } = useCascaderContext(props);

    const inputVal = computed(() => {
      return props.multiple ? getMultipleContent(cascaderContext.value) : getSingleContent(cascaderContext.value);
    });

    const renderSuffixIcon = () => {
      const { size, visible, disabled, loading } = cascaderContext.value;
      // const { closeShow, closeIconClass, fakeArrowIconClass } = this;

      const fakeArrowIconClass = 'null';
      const closeIconClass = 'null';
      const closeShow = false;

      const closeIconClick = (context: { e: MouseEvent }) => {
        context.e.stopPropagation();

        closeIconClickEffect(cascaderContext.value);
      };

      if (loading) {
        return <TLoading size="small" />;
      }
      if (closeShow) {
        return <CloseCircleFilledIcon class={closeIconClass} size={size} onClick={closeIconClick} />;
      }

      return <FakeArrow overlayClassName={fakeArrowIconClass} isActive={visible} disabled={disabled} />;
    };

    const { global } = useConfig('cascader');
    return () => (
      <SelectInput
        value={inputVal.value}
        keys={props.keys}
        placeholder={global.value.placeholder}
        multiple={props.multiple}
        popup-props={{ overlayStyle: { width: 'auto' } }}
        onTagChange={(value: CascaderValue) => {
          setInnerValue(value, {
            source: 'clear',
          });
        }}
        v-slots={{
          panel: () => (
            <panel empty={props.empty} trigger={props.trigger} cascaderContext={cascaderContext.value}>
              {{ empty: slots.empty }}
            </panel>
          ),
          suffixIcon: () => renderSuffixIcon(),
        }}
      />
    );
  },
});
