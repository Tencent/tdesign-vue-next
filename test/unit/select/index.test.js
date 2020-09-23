import { mount } from '@vue/test-utils';
import Vue from 'vue';
import { Select, OptionGroup, Option } from '@/src/select/index.ts';

// every component needs four parts: props/events/slots/functions.
describe('Select', () => {
  // test props api
  describe(':props', () => {
    it(':disabled', () => {
      const wrapper = mount({
        render() {
          return <Select disabled={true}></Select>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
    it(':size', () => {
      const wrapper = mount({
        render() {
          return <Select size="large"></Select>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
    it(':clearable', () => {
      const wrapper = mount({
        render() {
          return <Select clearable={true}></Select>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
    it(':multiple', () => {
      const wrapper = mount({
        render() {
          return <Select multiple={true}></Select>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
    it(':placeholder', () => {
      const wrapper = mount({
        render() {
          return <Select placeholder="please select"></Select>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
    it(':creatable', () => {
      const wrapper = mount({
        render() {
          return <Select creatable={true}></Select>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
    it(':remote', () => {
      const wrapper = mount({
        render() {
          return <Select remote={true}></Select>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
    it(':loading', () => {
      const wrapper = mount({
        render() {
          return <Select loading={true}></Select>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
    it(':labelInValue', () => {
      const wrapper = mount({
        render() {
          return <Select labelInValue={false}></Select>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
    it(':reserveKeyword', () => {
      const wrapper = mount({
        render() {
          return <Select reserveKeyword={false}></Select>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
    it(':bordered', () => {      
      const wrapper = mount({
        render() {
          return <Select bordered={true}></Select>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
  });

  // test events
  describe('@event', () => {
    // it('visible-change', async () => {
    //   const fn = jest.fn();
    //   const value = 'apple';
    //   const options = [{
    //     label: '苹果apple~~~~',
    //     value: 'apple',
    //   }, {
    //     label: '香蕉banana~~~',
    //     value: 'banana',
    //     disabled: true,
    //   }, {
    //     label: '橘子orange~~~',
    //     value: 'orange',
    //   }]
    //   const wrapper = mount ({
    //     render() {
    //       return <Select onVisibleChange={fn} value={value} options={options}></Select>;
    //     }
    //   });
    //   const selectWrapper = wrapper.find(Select);
    //   selectWrapper.trigger('click');
    //   await Vue.nextTick();
    //   expect(fn).toHaveBeenCalled();
    // });

    it('blur', async () => {
      const fn = jest.fn();
      const wrapper = mount({
        render() {
          return (
            <Select onBlur={fn} filterable={true}>
              <Option value={1} label={1}>1</Option>
            </Select>
          );
        },
      });
      const selectWrapper = wrapper.find(Select);
      const inputElemWrapper = wrapper.find('input');
      selectWrapper.vm.focus();
      selectWrapper.vm.blur();
      inputElemWrapper.trigger('blur');
      await Vue.nextTick();
      expect(selectWrapper.emitted().blur).toBeTruthy();
    });

    it('focus', async () => {
      const fn = jest.fn();
      const wrapper = mount({
        render() {
          return (
            <Select onFocus={fn} filterable={true}>
              <Option value={1} label={1}>1</Option>
            </Select>
          );
        },
      });
      const selectWrapper = wrapper.find(Select);
      const inputElemWrapper = wrapper.find('input');
      selectWrapper.vm.focus();
      inputElemWrapper.trigger('focus');
      await Vue.nextTick();
      expect(selectWrapper.emitted().focus).toBeTruthy();
    });

    it('clear', async () => {
        const fn = jest.fn();
        let value = 'apple';
        const options = [{
          label: '苹果apple~~~~',
          value: 'apple',
        }, {
          label: '香蕉banana~~~',
          value: 'banana',
          disabled: true,
        }, {
          label: '橘子orange~~~',
          value: 'orange',
        }]
        const wrapper = mount ({
          render() {
            return <Select clearable={true} v-model={value} options={options}></Select>;
          }
        });
        const selectWrapper = wrapper.find(Select);
        const closeIconWrapper = wrapper.find('.t-icon-close')
        closeIconWrapper.trigger('click')
        await Vue.nextTick();
        expect(selectWrapper.emitted().clear).toBeTruthy();    
      });

      it('remove', async () => {
        const fn = jest.fn();
        let value = ['apple'];
        const options = [{
          label: '苹果apple~~~~',
          value: 'apple',
        }, {
          label: '香蕉banana~~~',
          value: 'banana',
          disabled: true,
        }, {
          label: '橘子orange~~~',
          value: 'orange',
        }]
        const wrapper = mount ({
          render() {
            return <Select multiple={true} v-model={value} options={options}></Select>;
          }
        });
        const selectWrapper = wrapper.find(Select);
        const closeIconWrapper = wrapper.find('.t-icon-close')
        closeIconWrapper.trigger('click')
        await Vue.nextTick();
        expect(selectWrapper.emitted().remove).toBeTruthy();
      });
  });
});

describe('Select Option', () => {
  // test props api
  describe(':props', () => {
    it(':value', () => {
      let value = '1'
      const wrapper = mount({
        render() {
          return (
            <Select v-model={value}>
              <Option value={'1'} label={'1'}></Option>
            </Select>          
          );
        },
      });
      expect(wrapper).toMatchSnapshot();
    });   
    it(':label', () => {
      let value = '1'
      const wrapper = mount({
        render() {
          return (
            <Select v-model={value}>
              <Option value={'1'} label={'1'}></Option>
            </Select>          
          );
        },
      });
      expect(wrapper).toMatchSnapshot();
    });   
    it(':disabled', () => {
      let value = '1'
      const wrapper = mount({
        render() {
          return (
            <Select v-model={value}>
              <Option value={'1'} label={'1'} disabled={true}></Option>
            </Select>          
          );
        },
      });
      expect(wrapper).toMatchSnapshot();
    });   
  });
});

describe('Select OptionGroup', () => {
  // test props api
  describe(':props', () => {
    it(':value', () => {
      let value = '1'
      const wrapper = mount({
        render() {
          return (
            <Select v-model={value}>
              <OptionGroup label={'num'}>
                <Option value={'1'} label={'1'}></Option>
              </OptionGroup>
              <OptionGroup label={'abc'}>
                <Option value={'a'} label={'a'}></Option>
              </OptionGroup>
            </Select>          
          );
        },
      });
      expect(wrapper).toMatchSnapshot();
    }); 
  });
});

