import { vi } from 'vitest';
import { getOverlay } from '../utils';
import { TdImageViewerProps } from '../type';
import { downloadImage, formatImages } from '@tdesign/common-js/image-viewer/utils';

describe('ImageViewer Utils', () => {
  describe('getOverlay', () => {
    it('showOverlay explicit boolean', () => {
      expect(getOverlay({ showOverlay: true, mode: 'modal' } as TdImageViewerProps)).toBeTruthy();
      expect(getOverlay({ showOverlay: false, mode: 'modal' } as TdImageViewerProps)).toBeFalsy();
    });

    it('showOverlay undefined defaults to mode behavior', () => {
      expect(getOverlay({ mode: 'modal' } as TdImageViewerProps)).toBeTruthy();
      expect(getOverlay({ mode: 'modeless' } as TdImageViewerProps)).toBeFalsy();
      expect(getOverlay({} as TdImageViewerProps)).toBeFalsy();
    });

    it('showOverlay overrides mode', () => {
      expect(getOverlay({ showOverlay: true, mode: 'modeless' } as TdImageViewerProps)).toBeTruthy();
      expect(getOverlay({ showOverlay: false, mode: 'modal' } as TdImageViewerProps)).toBeFalsy();
    });

    it('showOverlay = undefined with explicit mode', () => {
      expect(getOverlay({ mode: 'modal', showOverlay: undefined } as TdImageViewerProps)).toBeTruthy();
      expect(getOverlay({ mode: 'modeless', showOverlay: undefined } as TdImageViewerProps)).toBeFalsy();
    });
  });

  describe('downloadImage', () => {
    let mockCreateObjectURL: ReturnType<typeof vi.fn>;
    let mockRevokeObjectURL: ReturnType<typeof vi.fn>;
    let mockCreateElement: typeof document.createElement;

    beforeEach(() => {
      vi.clearAllMocks();
      mockCreateObjectURL = vi.fn().mockReturnValue('blob:test');
      mockRevokeObjectURL = vi.fn();
      window.URL.createObjectURL = mockCreateObjectURL;
      window.URL.revokeObjectURL = mockRevokeObjectURL;
      mockCreateElement = document.createElement.bind(document);
    });

    it('File input', () => {
      const mockClick = vi.fn();
      const mockRemove = vi.fn();
      const mockAnchor = { href: '', download: '', click: mockClick, remove: mockRemove };

      vi.spyOn(document, 'createElement').mockImplementation((tag) => {
        if (tag === 'a') return mockAnchor as unknown as HTMLAnchorElement;
        return mockCreateElement(tag);
      });

      const file = new File(['test'], 'test-image.png', { type: 'image/png' });
      downloadImage(file);

      expect(mockCreateObjectURL).toHaveBeenCalledWith(file);
      expect(mockAnchor.download).toBe('test-image.png');
      expect(mockClick).toHaveBeenCalled();
    });

    it('same-origin URL download', () => {
      const mockClick = vi.fn();
      const mockRemove = vi.fn();
      const mockAnchor = { href: '', download: '', click: mockClick, remove: mockRemove };

      vi.spyOn(document, 'createElement').mockImplementation((tag) => {
        if (tag === 'a') return mockAnchor as unknown as HTMLAnchorElement;
        return mockCreateElement(tag);
      });

      const sameOriginUrl = `${window.location.origin}/test-image.png`;
      downloadImage(sameOriginUrl);

      expect(mockAnchor.href).toBe(sameOriginUrl);
      expect(mockAnchor.download).toBe('test-image.png');
      expect(mockClick).toHaveBeenCalled();
    });

    it('filename from URL with query/hash', () => {
      const mockClick = vi.fn();
      const mockRemove = vi.fn();
      const mockAnchor = { href: '', download: '', click: mockClick, remove: mockRemove };

      vi.spyOn(document, 'createElement').mockImplementation((tag) => {
        if (tag === 'a') return mockAnchor as unknown as HTMLAnchorElement;
        return mockCreateElement(tag);
      });

      // query parameters
      const urlWithParams = `${window.location.origin}/path/image.png?sign=xxx&token=yyy`;
      downloadImage(urlWithParams);
      expect(mockAnchor.download).toBe('image.png');

      // hash
      const urlWithHash = `${window.location.origin}/path/image.jpg#section`;
      downloadImage(urlWithHash);
      expect(mockAnchor.download).toBe('image.jpg');
    });

    it('random name when URL has no filename', () => {
      const mockClick = vi.fn();
      const mockRemove = vi.fn();
      const mockAnchor = { href: '', download: '', click: mockClick, remove: mockRemove };

      vi.spyOn(document, 'createElement').mockImplementation((tag) => {
        if (tag === 'a') return mockAnchor as unknown as HTMLAnchorElement;
        return mockCreateElement(tag);
      });

      const urlNoFilename = `${window.location.origin}/`;
      downloadImage(urlNoFilename);
      expect(mockAnchor.download).toBeTruthy();
    });
  });

  describe('formatImages', () => {
    it('non-array input returns empty array', () => {
      expect(formatImages(null)).toEqual([]);
      expect(formatImages(undefined)).toEqual([]);
      // @ts-expect-error testing invalid input
      expect(formatImages('string')).toEqual([]);
      // @ts-expect-error testing invalid input
      expect(formatImages(123)).toEqual([]);
    });

    it('empty array', () => {
      expect(formatImages([])).toEqual([]);
    });

    it('string images with default properties', () => {
      const images = ['image1.jpg', 'image2.png'];
      const result = formatImages(images);

      expect(result).toEqual([
        { mainImage: 'image1.jpg', thumbnail: 'image1.jpg', download: true },
        { mainImage: 'image2.png', thumbnail: 'image2.png', download: true },
      ]);
    });

    it('ImageInfo objects with defaults', () => {
      const images = [{ mainImage: 'main1.jpg' }, { mainImage: 'main2.jpg', thumbnail: 'thumb2.jpg' }];
      const result = formatImages(images);

      expect(result[0]).toEqual({ mainImage: 'main1.jpg', thumbnail: 'main1.jpg', download: true });
      expect(result[1]).toEqual({ mainImage: 'main2.jpg', thumbnail: 'thumb2.jpg', download: true });
    });

    it('custom download setting preserved', () => {
      const images = [{ mainImage: 'main.jpg', download: false }];
      const result = formatImages(images);
      expect(result[0].download).toBeFalsy();
    });

    it('mixed string and ImageInfo array', () => {
      const images = ['string-image.jpg', { mainImage: 'object-main.jpg', thumbnail: 'object-thumb.jpg' }];
      const result = formatImages(images);

      expect(result).toEqual([
        { mainImage: 'string-image.jpg', thumbnail: 'string-image.jpg', download: true },
        { mainImage: 'object-main.jpg', thumbnail: 'object-thumb.jpg', download: true },
      ]);
    });

    it('File objects in images', () => {
      const file = new File(['test'], 'test.png', { type: 'image/png' });
      const result = formatImages([file]);

      expect(result[0].mainImage).toBe(file);
      expect(result[0].thumbnail).toBe(file);
      expect(result[0].download).toBeTruthy();
    });

    it('ImageInfo with all properties', () => {
      const images = [{ mainImage: 'main.jpg', thumbnail: 'thumb.jpg', download: true, isSvg: true }];
      const result = formatImages(images);

      expect(result[0]).toEqual({ mainImage: 'main.jpg', thumbnail: 'thumb.jpg', download: true, isSvg: true });
    });

    it('thumbnail defaults to mainImage', () => {
      const images = [{ mainImage: 'only-main.jpg' }];
      const result = formatImages(images);
      expect(result[0].thumbnail).toBe('only-main.jpg');
    });
  });
});
