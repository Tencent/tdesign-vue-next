import { defineComponent } from 'vue';
import { ChevronLeftIcon, RoundIcon, ChevronRightIcon } from 'tdesign-icons-vue-next';
import props from './jumper-props';
import { usePrefixClass } from '../hooks/useConfig';
import TButton from '../button';

export default defineComponent({
  name: 'TJumper',

  props,

  setup(props) {
    const COMPONENT_NAME = usePrefixClass('jumper');

    return () => (
      <div class={`${COMPONENT_NAME.value}-jumper`}>
        <TButton
          title={props.prevTitle}
          variant="text"
          size={props.size}
          shape="square"
          onClick={() => props.onJumperClick?.(-1)}
          icon={() => <ChevronLeftIcon />}
          class={`${COMPONENT_NAME.value}-jumper__btn`}
        />

        <TButton
          title={props.currentTitle}
          variant="text"
          size={props.size}
          shape="square"
          onClick={() => props.onJumperClick?.(0)}
          icon={() => <RoundIcon />}
          class={`${COMPONENT_NAME.value}-jumper__btn`}
        />

        <TButton
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
