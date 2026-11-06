import { createForwardProtection } from './forward-protection';
import { createReturnProtection } from './return-protection';

type MenuProtectionOptions = {
  towardPopup: Parameters<typeof createForwardProtection>[0];
  towardTrigger: Parameters<typeof createReturnProtection>[0];
};

/** Coordinates the two directions without changing their independent release rules. */
export function createMenuProtection({ towardPopup, towardTrigger }: MenuProtectionOptions) {
  const forward = createForwardProtection(towardPopup);
  const backward = createReturnProtection(towardTrigger);

  return {
    towardPopup: forward,
    towardTrigger: backward,
    enterPopup: () => {
      backward.stop();
      forward.clear();
    },
  };
}
