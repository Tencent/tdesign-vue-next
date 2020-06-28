import { mount } from '@vue/test-utils';
import Tag from '@/src/tag/index.ts';
import CheckTag from '@/src/tag/check-tag.tsx';

describe('Tag', () => {
  describe(':props', () => {
    it(':theme', () => {
      const wrapper = mount({
        render() {
          return <Tag></Tag>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
    it(':theme', () => {
      const wrapper = mount({
        render() {
          return <Tag theme={'primary'}></Tag>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });

    it(':size', () => {
      const wrapper = mount({
        render() {
          return <Tag size={'large'}></Tag>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });

    it(':closable', () => {
      const fn = jest.fn();
      const wrapper = mount({
        render() {
          return <Tag closable onClose={fn}></Tag>;
        },
      });
      expect(wrapper).toMatchSnapshot();
      wrapper.find('.t-icon-close').trigger('click');
      expect(fn).toHaveBeenCalled();
    });

    it(':checked', () => {
      const wrapper = mount({
        render() {
          return <Tag checked></Tag>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });

    it(':checked', () => {
      const wrapper = mount({
        render() {
          return <CheckTag checked></CheckTag>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });

    it(':disabled', () => {
      const fn = jest.fn();
      const wrapper = mount({
        render() {
          return <Tag disabled onClick={fn}></Tag>;
        },
      });
      expect(fn).not.toHaveBeenCalled();
      expect(wrapper).toMatchSnapshot();
    });

    it(':disabled', () => {
      const fn = jest.fn();
      const wrapper = mount({
        render() {
          return <CheckTag disabled onClick={fn}></CheckTag>;
        },
      });
      expect(fn).not.toHaveBeenCalled();
      expect(wrapper).toMatchSnapshot();
    });

    it(':plain', () => {
      const wrapper = mount({
        render() {
          return <Tag effect="plain" theme={'primary'}></Tag>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });

    it(':shape', () => {
      const wrapper = mount({
        render() {
          return <Tag shape={'round'}></Tag>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });

    it(':maxWidth', () => {
      const wrapper = mount({
        render() {
          return <Tag max-width={100}></Tag>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });

    it(':icon', () => {
      const wrapper = mount({
        render() {
          return <Tag icon={'search'}></Tag>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('slot', () => {
    it('<icon>', () => {
      const wrapper = mount(Tag, {
        scopedSlots: {
          icon: '<div></div>',
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('@event', () => {
    it('Event passthrough ', () => {
      const fn = jest.fn();
      const wrapper = mount({
        render() {
          return <Tag onClick={fn}>text</Tag>;
        },
      });
      wrapper.find(Tag).trigger('click');
      expect(fn).toHaveBeenCalled();
    });
  });
});
