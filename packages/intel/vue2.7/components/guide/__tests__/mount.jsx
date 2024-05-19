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
  const slots = props.scopedSlots;
  // eslint-disable-next-line
  delete props['scopedSlots'];

  return mount(
    {
      render() {
        return (
          <div>
            <GuideContent />
            <Guide current={0} steps={STEPS.slice(0, 1)} props={props} on={events} scopedSlots={slots}></Guide>
          </div>
        );
      },
    },
    { attachTo: document.body },
  );
}

// three steps
export function getGuideMultipleStepsMount(Guide, props = {}, events) {
  const slots = props.scopedSlots;
  // eslint-disable-next-line
  delete props['scopedSlots'];

  return mount(
    {
      render() {
        return (
          <div>
            <GuideContent />
            <Guide steps={STEPS} props={props} on={events} scopedSlots={slots}></Guide>
          </div>
        );
      },
    },
    { attachTo: document.body },
  );
}

// custom step props; only one step
export function getCustomGuideStepMount(Guide, props = {}) {
  const slots = props.scopedSlots;
  // eslint-disable-next-line
  delete props['scopedSlots'];

  // guide step props, instead of guide
  const steps = [{ ...STEPS[0], ...props }];
  return mount(
    {
      render() {
        return (
          <div>
            <GuideContent />
            <Guide current={0} steps={steps} scopedSlots={slots}></Guide>
          </div>
        );
      },
    },
    { attachTo: document.body },
  );
}

// custom multiple step props
export function getCustomMultipleGuideStepMount(Guide, props = {}) {
  const slots = props.scopedSlots;
  // eslint-disable-next-line
  delete props['scopedSlots'];

  // guide step props, instead of guide
  const { current = 0, ...guideStepProps } = props;
  const steps = [...STEPS];
  steps[current] = { ...STEPS[current], ...guideStepProps };
  return mount(
    {
      render() {
        return (
          <div>
            <GuideContent />
            <Guide current={current} steps={steps} scopedSlots={slots}></Guide>
          </div>
        );
      },
    },
    { attachTo: document.body },
  );
}

export default {};
