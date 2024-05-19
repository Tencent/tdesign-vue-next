import { mount } from '@vue/test-utils';
import GuideContent from './GuideContent';

const STEPS = [
  {
    element: '.main-title-base',
    title: '新手引导标题',
    body: '新手引导的说明文案',
    placement: 'bottom-right',
  },
  {
    element: () => document.body.querySelector('.label-field-base'),
    title: '新手引导标题',
    body: '新手引导的说明文案',
    placement: 'bottom',
  },
  {
    element: '.action-base',
    title: '新手引导标题',
    body: '新手引导的说明文案',
    placement: 'right',
  },
];

// only one step
export function getGuideDefaultMount(Guide, props = {}, events) {
  const slots = props['v-slots'];
  delete props['v-slots'];

  return mount(
    {
      render() {
        return (
          <div>
            <GuideContent />
            <Guide current={0} steps={STEPS.slice(0, 1)} {...props} {...events} v-slots={slots}></Guide>
          </div>
        );
      },
    },
    { attachTo: document.body },
  );
}

// three steps
export function getGuideMultipleStepsMount(Guide, props = {}, events) {
  const slots = props['v-slots'];
  delete props['v-slots'];

  return mount(
    {
      render() {
        return (
          <div>
            <GuideContent />
            <Guide steps={STEPS} {...props} {...events} v-slots={slots}></Guide>
          </div>
        );
      },
    },
    { attachTo: document.body },
  );
}

// custom step props; only one step
export function getCustomGuideStepMount(Guide, props = {}) {
  const slots = props['v-slots'];
  delete props['v-slots'];

  // guide step props, instead of guide
  const steps = [{ ...STEPS[0], ...props }];
  return mount(
    {
      render() {
        return (
          <div>
            <GuideContent />
            <Guide current={0} steps={steps} v-slots={slots}></Guide>
          </div>
        );
      },
    },
    { attachTo: document.body },
  );
}

// custom multiple step props
export function getCustomMultipleGuideStepMount(Guide, props = {}) {
  const slots = props['v-slots'];
  delete props['v-slots'];

  // guide step props, instead of guide
  const { current = 0, ...guideStepProps } = props;
  let steps = [...STEPS];
  steps[current] = { ...STEPS[current], ...guideStepProps };
  return mount(
    {
      render() {
        return (
          <div>
            <GuideContent />
            <Guide current={current} steps={steps} v-slots={slots}></Guide>
          </div>
        );
      },
    },
    { attachTo: document.body },
  );
}

export default {};
