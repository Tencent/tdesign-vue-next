import { expect, vi } from 'vitest';
import { getOverlay } from '../utils';
import { TdImageViewerProps } from '../type';
import { downloadImage, formatImages } from '@tdesign/common-js/image-viewer/utils';

describe('ImageViewer Utils', () => {
  describe('getOverlay', () => {
    it('showOverlay = true', () => {
      const props: TdImageViewerProps = { showOverlay: true, mode: 'modal' };
      expect(getOverlay(props)).eq(true);
    });

    it('showOverlay = false', () => {
      const props: TdImageViewerProps = { showOverlay: false, mode: 'modal' };
      expect(getOverlay(props)).eq(false);
    });

    it('showOverlay undefined, mode = modal', () => {
      const props: TdImageViewerProps = { mode: 'modal' };
      expect(getOverlay(props)).eq(true);
    });

    it('showOverlay undefined, mode = modeless', () => {
      const props: TdImageViewerProps = { mode: 'modeless' };
      expect(getOverlay(props)).eq(false);
    });

    it('showOverlay = true overrides mode = modeless', () => {
      const props: TdImageViewerProps = { showOverlay: true, mode: 'modeless' };
      expect(getOverlay(props)).eq(true);
    });

    it('showOverlay = false overrides mode = modal', () => {
      const props: TdImageViewerProps = { showOverlay: false, mode: 'modal' };
      expect(getOverlay(props)).eq(false);
    });

    it('mode undefined defaults to false', () => {
      const props: TdImageViewerProps = {};
      expect(getOverlay(props)).eq(false);
    });

    it('empty props', () => {
      const props = {} as TdImageViewerProps;
      expect(getOverlay(props)).eq(false);
    });

    it('showOverlay = undefined, mode = modal', () => {
      const props: TdImageViewerProps = { mode: 'modal', showOverlay: undefined };
      expect(getOverlay(props)).eq(true);
    });

    it('showOverlay = undefined, mode = modeless', () => {
      const props: TdImageViewerProps = { mode: 'modeless', showOverlay: undefined };
      expect(getOverlay(props)).eq(false);
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
      expect(mockAnchor.download).eq('test-image.png');
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

      expect(mockAnchor.href).eq(sameOriginUrl);
      expect(mockAnchor.download).eq('test-image.png');
      expect(mockClick).toHaveBeenCalled();
    });

    it('filename from URL with query parameters', () => {
      const mockClick = vi.fn();
      const mockRemove = vi.fn();
      const mockAnchor = { href: '', download: '', click: mockClick, remove: mockRemove };

      vi.spyOn(document, 'createElement').mockImplementation((tag) => {
        if (tag === 'a') return mockAnchor as unknown as HTMLAnchorElement;
        return mockCreateElement(tag);
      });

      const urlWithParams = `${window.location.origin}/path/image.png?sign=xxx&token=yyy`;
      downloadImage(urlWithParams);

      expect(mockAnchor.download).eq('image.png');
    });

    it('filename from URL with hash', () => {
      const mockClick = vi.fn();
      const mockRemove = vi.fn();
      const mockAnchor = { href: '', download: '', click: mockClick, remove: mockRemove };

      vi.spyOn(document, 'createElement').mockImplementation((tag) => {
        if (tag === 'a') return mockAnchor as unknown as HTMLAnchorElement;
        return mockCreateElement(tag);
      });

      const urlWithHash = `${window.location.origin}/path/image.jpg#section`;
      downloadImage(urlWithHash);

      expect(mockAnchor.download).eq('image.jpg');
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
      expect(formatImages(null as any)).toEqual([]);
      expect(formatImages(undefined as any)).toEqual([]);
      expect(formatImages('string' as any)).toEqual([]);
      expect(formatImages(123 as any)).toEqual([]);
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
      expect(result[0].download).eq(false);
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

      expect(result[0].mainImage).eq(file);
      expect(result[0].thumbnail).eq(file);
      expect(result[0].download).eq(true);
    });

    it('ImageInfo with all properties', () => {
      const images = [{ mainImage: 'main.jpg', thumbnail: 'thumb.jpg', download: true, isSvg: true }];
      const result = formatImages(images);

      expect(result[0]).toEqual({ mainImage: 'main.jpg', thumbnail: 'thumb.jpg', download: true, isSvg: true });
    });

    it('thumbnail defaults to mainImage', () => {
      const images = [{ mainImage: 'only-main.jpg' }];
      const result = formatImages(images);
      expect(result[0].thumbnail).eq('only-main.jpg');
    });
  });
});
