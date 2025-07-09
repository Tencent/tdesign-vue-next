import { QrCode, QrSegment } from '@tdesign/common-js/qrcode/qrcodegen';
import type { CrossOrigin, ErrorCorrectionLevel, Excavation, ImageSettings } from '@tdesign/common-js/qrcode/types';
import { ERROR_LEVEL_MAP, getImageSettings, getMarginSize } from '@tdesign/common-js/qrcode/utils';
import { computed, ComputedRef } from 'vue';

interface Options {
  value: string;
  level: ErrorCorrectionLevel;
  minVersion: number;
  includeMargin: boolean;
  marginSize?: number;
  imageSettings?: ImageSettings;
  size: number;
}

interface QRCodeResult {
  cells: ComputedRef<boolean[][]>;
  margin: ComputedRef<number>;
  numCells: ComputedRef<number>;
  calculatedImageSettings: ComputedRef<{
    x: number;
    y: number;
    h: number;
    w: number;
    excavation: Excavation | null;
    opacity: number;
    crossOrigin: CrossOrigin;
  }>;
  qrcode: ComputedRef<QrCode>;
}

export const useQRCode = (opt: Options): QRCodeResult => {
  const { value, level, minVersion, includeMargin, marginSize, imageSettings, size } = opt;

  const memoizedQrcode = computed(() => {
    const segments = QrSegment.makeSegments(value);
    return QrCode.encodeSegments(segments, ERROR_LEVEL_MAP[level], minVersion);
  });

  const cs = computed(() => memoizedQrcode.value.getModules());
  const mg = computed(() => getMarginSize(includeMargin, marginSize));
  const cis = computed(() => getImageSettings(cs.value, size, mg.value, imageSettings));

  return {
    cells: cs,
    margin: mg,
    numCells: computed(() => cs.value.length + mg.value * 2),
    calculatedImageSettings: cis,
    qrcode: memoizedQrcode,
  };
};
