import { mount } from '@vue/test-utils';

export function getNormalAutoCompleteMount(AutoComplete, props, events) {
  const options = ['FirstKeyword', 'SecondKeyword', 'ThirdKeyword'];
  return mount(<AutoComplete value="" options={options} {...props} {...events} />);
}
