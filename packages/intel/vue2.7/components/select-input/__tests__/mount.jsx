import { mount } from '@vue/test-utils';

// multiple select
export function getSelectInputMultipleMount(SelectInput, props, events) {
  const { scopedSlots } = props;
  // eslint-disable-next-line
  delete props.scopedSlots;

  const value = [
    { label: 'tdesign-vue', value: 1 },
    { label: 'tdesign-react', value: 2 },
    { label: 'tdesign-miniprogram', value: 3 },
    { label: 'tdesign-mobile-vue', value: 4 },
    { label: 'tdesign-react-vue', value: 5 },
  ];
  return mount({
    render() {
      return (
        <SelectInput value={value} multiple={true} props={props} on={events} scopedSlots={scopedSlots}></SelectInput>
      );
    },
  });
}

export default {};
