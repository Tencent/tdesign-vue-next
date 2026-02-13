import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import GuideContent from './GuideContent';
import { Guide } from '@tdesign/components/guide';
import type { TdGuideProps, GuideStep } from '@tdesign/components/guide';

const STEPS: GuideStep[] = [
  {
    element: '.main-title-base',
    title: '新手引导标题',
    body: '新手引导的说明文案',
    placement: 'bottom-right',
  },
  {
    element: () => document.body.querySelector('.label-field-base') as HTMLElement,
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

/** 单步引导 — Guide 级别 props */
function mountSingleStep(
  guideProps: Partial<TdGuideProps> = {},
  slots?: Record<string, (...args: never[]) => JSX.Element>,
): VueWrapper {
  return mount(
    {
      render() {
        return (
          <div>
            <GuideContent />
            <Guide current={0} steps={STEPS.slice(0, 1)} {...guideProps} v-slots={slots} />
          </div>
        );
      },
    },
    { attachTo: document.body },
  );
}

/** 三步引导 — Guide 级别 props */
function mountMultiStep(
  guideProps: Partial<TdGuideProps> = {},
  slots?: Record<string, (...args: never[]) => JSX.Element>,
): VueWrapper {
  return mount(
    {
      render() {
        return (
          <div>
            <GuideContent />
            <Guide steps={STEPS} {...guideProps} v-slots={slots} />
          </div>
        );
      },
    },
    { attachTo: document.body },
  );
}

/** 单步引导 — GuideStep 级别 props */
function mountCustomStep(
  stepProps: Partial<GuideStep> = {},
  slots?: Record<string, (...args: never[]) => JSX.Element>,
): VueWrapper {
  const steps: GuideStep[] = [{ ...STEPS[0], ...stepProps }];
  return mount(
    {
      render() {
        return (
          <div>
            <GuideContent />
            <Guide current={0} steps={steps} v-slots={slots} />
          </div>
        );
      },
    },
    { attachTo: document.body },
  );
}

/** 三步引导 — 将 GuideStep 级别 props 应用到 current 步骤 */
function mountCustomMultiStep(
  options: { current?: number } & Partial<GuideStep> = {},
  slots?: Record<string, (...args: never[]) => JSX.Element>,
): VueWrapper {
  const { current = 0, ...guideStepProps } = options;
  const steps = [...STEPS];
  steps[current] = { ...STEPS[current], ...guideStepProps };
  return mount(
    {
      render() {
        return (
          <div>
            <GuideContent />
            <Guide current={current} steps={steps} v-slots={slots} />
          </div>
        );
      },
    },
    { attachTo: document.body },
  );
}

export { STEPS, mountSingleStep, mountMultiStep, mountCustomStep, mountCustomMultiStep };
