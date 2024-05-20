import type { GuideStep } from '@td/intel/guide/type';

export type GuideCrossProps = Pick<
  GuideStep,
  'mode' | 'skipButtonProps' | 'prevButtonProps' | 'nextButtonProps' | 'showOverlay' | 'highlightPadding'
>;
