import { defineComponent } from 'vue';
import { ChevronLeftIcon, RoundIcon, ChevronRightIcon } from 'tdesign-icons-vue-next';
import props from './jumper-props';
import { usePrefixClass } from '../hooks/useConfig';
import TButton from '../button';

export default defineComponent({
  name: 'TJumper',

  components: {
    TButton,
  },

  props,

  setup(props, { slots, expose }) {
    const COMPONENT_NAME = usePrefixClass('jumper');

    return () => (
      <div className={`${COMPONENT_NAME.value}-jumper`}>
        <t-button
          title={props.prevTitle}
          variant="text"
          size={props.size}
          shape="square"
          onClick={() => props.onJumperClick?.(-1)}
          icon={() => <ChevronLeftIcon />}
          class={`${COMPONENT_NAME.value}-jumper__btn`}
        />

        <t-button
          title={props.currentTitle}
          variant="text"
          size={props.size}
          shape="square"
          onClick={() => props.onJumperClick?.(0)}
          icon={() => <RoundIcon />}
          class={`${COMPONENT_NAME.value}-jumper__btn`}
        />

        <t-button
          title={props.nextTitle}
          variant="text"
          size={props.size}
          shape="square"
          onClick={() => props.onJumperClick?.(1)}
          icon={() => <ChevronRightIcon />}
          class={`${COMPONENT_NAME.value}-jumper__btn`}
        />
      </div>
    );
  },
});
