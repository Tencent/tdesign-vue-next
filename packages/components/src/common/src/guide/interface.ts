import { GuideStep } from './type';

export type GuideCrossProps = Pick<
  GuideStep,
  'mode' | 'skipButtonProps' | 'prevButtonProps' | 'nextButtonProps' | 'showOverlay' | 'highlightPadding'
>;
