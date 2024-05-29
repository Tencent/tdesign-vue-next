import type { GuideStep } from '@td/components/guide/type';

export type GuideCrossProps = Pick<
  GuideStep,
  'mode' | 'skipButtonProps' | 'prevButtonProps' | 'nextButtonProps' | 'showOverlay' | 'highlightPadding'
>;
