import { defineComponent } from 'vue';
import { ChevronLeftIcon, RoundIcon, ChevronRightIcon } from 'tdesign-icons-vue-next';
import props from './jumper-props';
import { usePrefixClass } from '../hooks/useConfig';
import Button from '../button';

export default defineComponent({
  name: 'TJumper',

  props,

  setup(props, { slots, expose }) {
    const COMPONENT_NAME = usePrefixClass('jumper');

    return () => (
      <div className={`${COMPONENT_NAME.value}-jumper`}>
        <Button
          title={props.prevTitle}
          variant="text"
          size={props.size}
          shape="square"
          onClick={() => props.onJumperClick?.(-1)}
          icon={() => <ChevronLeftIcon />}
          className={`${COMPONENT_NAME.value}-jumper__btn`}
        />

        <Button
          title={props.currentTitle}
          variant="text"
          size={props.size}
          shape="square"
          onClick={() => props.onJumperClick?.(0)}
          icon={() => <RoundIcon />}
          className={`${COMPONENT_NAME.value}-jumper__btn`}
        />

        <Button
          title={props.nextTitle}
          variant="text"
          size={props.size}
          shape="square"
          onClick={() => props.onJumperClick?.(1)}
          icon={() => <ChevronRightIcon />}
          className={`${COMPONENT_NAME.value}-jumper__btn`}
        />
      </div>
    );
  },
});
