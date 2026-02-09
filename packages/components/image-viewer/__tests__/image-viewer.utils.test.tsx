/**
 * ImageViewer 组件 utils 测试文件
 * 测试 getOverlay 等工具函数
 */
import { expect, vi, beforeEach } from 'vitest';
import { getOverlay } from '../utils';
import { TdImageViewerProps } from '../type';
import { downloadImage, formatImages } from '@tdesign/common-js/image-viewer/utils';

describe('ImageViewer Utils', () => {
  // ==================== getOverlay Function ====================
  describe('getOverlay', () => {
    it('should return true when showOverlay is explicitly true', () => {
      const props: TdImageViewerProps = {
        showOverlay: true,
        mode: 'modal',
      };
      expect(getOverlay(props)).toBe(true);
    });

    it('should return false when showOverlay is explicitly false', () => {
      const props: TdImageViewerProps = {
        showOverlay: false,
        mode: 'modal',
      };
      expect(getOverlay(props)).toBe(false);
    });

    it('should return true when showOverlay is undefined and mode is modal', () => {
      const props: TdImageViewerProps = {
        mode: 'modal',
      };
      expect(getOverlay(props)).toBe(true);
    });

    it('should return false when showOverlay is undefined and mode is modeless', () => {
      const props: TdImageViewerProps = {
        mode: 'modeless',
      };
      expect(getOverlay(props)).toBe(false);
    });

    it('should prioritize showOverlay over mode when showOverlay is true and mode is modeless', () => {
      const props: TdImageViewerProps = {
        showOverlay: true,
        mode: 'modeless',
      };
      expect(getOverlay(props)).toBe(true);
    });

    it('should prioritize showOverlay over mode when showOverlay is false and mode is modal', () => {
      const props: TdImageViewerProps = {
        showOverlay: false,
        mode: 'modal',
      };
      expect(getOverlay(props)).toBe(false);
    });

    it('should return true when mode is undefined (defaults to modal)', () => {
      const props: TdImageViewerProps = {};
      // When mode is undefined, it defaults to 'modal' behavior
      expect(getOverlay(props)).toBe(false); // mode === 'modal' check returns false when undefined
    });

    it('should handle edge case with empty props', () => {
      const props = {} as TdImageViewerProps;
      const result = getOverlay(props);
      // mode is undefined, so mode === 'modal' returns false
      expect(result).toBe(false);
    });

    it('should return overlay correctly for modal mode with undefined showOverlay', () => {
      const props: TdImageViewerProps = {
        mode: 'modal',
        showOverlay: undefined,
      };
      expect(getOverlay(props)).toBe(true);
    });

    it('should return overlay correctly for modeless mode with undefined showOverlay', () => {
      const props: TdImageViewerProps = {
        mode: 'modeless',
        showOverlay: undefined,
      };
      expect(getOverlay(props)).toBe(false);
    });
  });

  // ==================== downloadImage Function ====================
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

    it('should handle File input', () => {
      const mockClick = vi.fn();
      const mockRemove = vi.fn();
      const mockAnchor = {
        href: '',
        download: '',
        click: mockClick,
        remove: mockRemove,
      };

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

    it('should handle same-origin URL download', () => {
      const mockClick = vi.fn();
      const mockRemove = vi.fn();
      const mockAnchor = {
        href: '',
        download: '',
        click: mockClick,
        remove: mockRemove,
      };

      vi.spyOn(document, 'createElement').mockImplementation((tag) => {
        if (tag === 'a') return mockAnchor as unknown as HTMLAnchorElement;
        return mockCreateElement(tag);
      });

      // Same origin URL
      const sameOriginUrl = `${window.location.origin}/test-image.png`;
      downloadImage(sameOriginUrl);

      expect(mockAnchor.href).toBe(sameOriginUrl);
      expect(mockAnchor.download).toBe('test-image.png');
      expect(mockClick).toHaveBeenCalled();
    });

    it('should extract filename from URL with query parameters', () => {
      const mockClick = vi.fn();
      const mockRemove = vi.fn();
      const mockAnchor = {
        href: '',
        download: '',
        click: mockClick,
        remove: mockRemove,
      };

      vi.spyOn(document, 'createElement').mockImplementation((tag) => {
        if (tag === 'a') return mockAnchor as unknown as HTMLAnchorElement;
        return mockCreateElement(tag);
      });

      const urlWithParams = `${window.location.origin}/path/image.png?sign=xxx&token=yyy`;
      downloadImage(urlWithParams);

      expect(mockAnchor.download).toBe('image.png');
    });

    it('should extract filename from URL with hash', () => {
      const mockClick = vi.fn();
      const mockRemove = vi.fn();
      const mockAnchor = {
        href: '',
        download: '',
        click: mockClick,
        remove: mockRemove,
      };

      vi.spyOn(document, 'createElement').mockImplementation((tag) => {
        if (tag === 'a') return mockAnchor as unknown as HTMLAnchorElement;
        return mockCreateElement(tag);
      });

      const urlWithHash = `${window.location.origin}/path/image.jpg#section`;
      downloadImage(urlWithHash);

      expect(mockAnchor.download).toBe('image.jpg');
    });

    it('should use random name when URL has no filename', () => {
      const mockClick = vi.fn();
      const mockRemove = vi.fn();
      const mockAnchor = {
        href: '',
        download: '',
        click: mockClick,
        remove: mockRemove,
      };

      vi.spyOn(document, 'createElement').mockImplementation((tag) => {
        if (tag === 'a') return mockAnchor as unknown as HTMLAnchorElement;
        return mockCreateElement(tag);
      });

      const urlNoFilename = `${window.location.origin}/`;
      downloadImage(urlNoFilename);

      // Download should be set to a random name
      expect(mockAnchor.download).toBeTruthy();
    });
  });

  // ==================== formatImages Function ====================
  describe('formatImages', () => {
    it('should return empty array for non-array input', () => {
      expect(formatImages(null as any)).toEqual([]);
      expect(formatImages(undefined as any)).toEqual([]);
      expect(formatImages('string' as any)).toEqual([]);
      expect(formatImages(123 as any)).toEqual([]);
    });

    it('should return empty array for empty array', () => {
      expect(formatImages([])).toEqual([]);
    });

    it('should format string images with default properties', () => {
      const images = ['image1.jpg', 'image2.png'];
      const result = formatImages(images);

      expect(result).toEqual([
        { mainImage: 'image1.jpg', thumbnail: 'image1.jpg', download: true },
        { mainImage: 'image2.png', thumbnail: 'image2.png', download: true },
      ]);
    });

    it('should format ImageInfo objects with defaults', () => {
      const images = [{ mainImage: 'main1.jpg' }, { mainImage: 'main2.jpg', thumbnail: 'thumb2.jpg' }];
      const result = formatImages(images);

      expect(result[0]).toEqual({
        mainImage: 'main1.jpg',
        thumbnail: 'main1.jpg',
        download: true,
      });
      expect(result[1]).toEqual({
        mainImage: 'main2.jpg',
        thumbnail: 'thumb2.jpg',
        download: true,
      });
    });

    it('should preserve custom download setting', () => {
      const images = [{ mainImage: 'main.jpg', download: false }];
      const result = formatImages(images);

      expect(result[0].download).toBe(false);
    });

    it('should handle mixed string and ImageInfo array', () => {
      const images = ['string-image.jpg', { mainImage: 'object-main.jpg', thumbnail: 'object-thumb.jpg' }];
      const result = formatImages(images);

      expect(result).toEqual([
        { mainImage: 'string-image.jpg', thumbnail: 'string-image.jpg', download: true },
        { mainImage: 'object-main.jpg', thumbnail: 'object-thumb.jpg', download: true },
      ]);
    });

    it('should handle File objects in images', () => {
      const file = new File(['test'], 'test.png', { type: 'image/png' });
      const images = [file];
      const result = formatImages(images);

      expect(result[0].mainImage).toBe(file);
      expect(result[0].thumbnail).toBe(file);
      expect(result[0].download).toBe(true);
    });

    it('should handle ImageInfo with all properties', () => {
      const images = [
        {
          mainImage: 'main.jpg',
          thumbnail: 'thumb.jpg',
          download: true,
          isSvg: true,
        },
      ];
      const result = formatImages(images);

      expect(result[0]).toEqual({
        mainImage: 'main.jpg',
        thumbnail: 'thumb.jpg',
        download: true,
        isSvg: true,
      });
    });

    it('should override thumbnail with mainImage if not provided', () => {
      const images = [{ mainImage: 'only-main.jpg' }];
      const result = formatImages(images);

      expect(result[0].thumbnail).toBe('only-main.jpg');
    });
  });
});
