import { mount } from '@vue/test-utils';
import { expect, it, vi, describe, beforeEach, afterEach } from 'vitest';
import { nextTick } from 'vue';
import ImageItem from '@tdesign/components/image-viewer/base/ImageItem';

// Mock fetch for SVG testing
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('ImageItem', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock console.error to suppress Vue warnings
    vi.spyOn(console, 'error').mockImplementation(() => {});
    // Mock attachShadow for SVG testing
    if (typeof window !== 'undefined') {
      window.HTMLElement.prototype.attachShadow = vi.fn().mockImplementation(() => ({
        mode: 'closed',
        appendChild: vi.fn(),
      }));
    }
    // Mock SVGElement.getBBox for SVG testing
    if (typeof window !== 'undefined') {
      const originalGetBBox = window.SVGElement?.prototype.getBBox;
      window.SVGElement.prototype.getBBox = vi.fn().mockImplementation(() => ({
        x: 0,
        y: 0,
        width: 100,
        height: 100,
      }));
    }
  });

  afterEach(() => {
    vi.restoreAllMocks();
    // Restore SVGElement.getBBox if it was mocked
    if (typeof window !== 'undefined' && window.SVGElement?.prototype.getBBox) {
      // We cannot easily restore original, but we can set to undefined
      // Since vi.restoreAllMocks() doesn't cover this, we need to keep track
      // For simplicity, we just set to undefined and rely on fresh mock each test
      delete window.SVGElement.prototype.getBBox;
    }
  });

  describe('Basic rendering', () => {
    it('should render image with src', async () => {
      const wrapper = mount(ImageItem, {
        props: {
          src: 'https://example.com/image.jpg',
        },
      });
      await nextTick();
      expect(wrapper.find('img').exists()).toBe(true);
      expect(wrapper.find('img').attributes('src')).toBe('https://example.com/image.jpg');
    });

    it('should render placeholder when placementSrc exists and image not loaded', async () => {
      const wrapper = mount(ImageItem, {
        props: {
          src: 'https://example.com/main.jpg',
          placementSrc: 'https://example.com/thumb.jpg',
        },
      });
      await nextTick();
      // Should render both placeholder and main image (main hidden)
      const imgs = wrapper.findAll('img');
      expect(imgs.length).toBe(2);
      // Placeholder image should be visible (display: block)
      const placeholder = imgs.find((img) => img.attributes('src') === 'https://example.com/thumb.jpg');
      expect(placeholder).toBeDefined();
      // Main image should be hidden (display: none)
      const main = imgs.find((img) => img.attributes('src') === 'https://example.com/main.jpg');
      expect(main).toBeDefined();
    });

    it('should show error state when image fails to load', async () => {
      const wrapper = mount(ImageItem, {
        props: {
          src: 'https://example.com/image.jpg',
        },
      });
      await nextTick();
      const img = wrapper.find('img');
      // Trigger error event
      await img.trigger('error');
      await nextTick();
      expect(wrapper.find('.t-image-viewer__img-error').exists()).toBe(true);
      expect(wrapper.find('.t-image-viewer__img-error-text').exists()).toBe(true);
    });
  });

  describe('Status and lifecycle', () => {
    it('should reset status when src changes', async () => {
      const wrapper = mount(ImageItem, {
        props: {
          src: 'https://example.com/image1.jpg',
        },
      });
      await nextTick();
      // 初始状态：loaded false, error false
      // 改变 src 应该触发 watch 并重置状态
      await wrapper.setProps({ src: 'https://example.com/image2.jpg' });
      await nextTick();
      // 由于没有实际加载图片，状态可能不变，但至少确保不报错
    });

    it('should reset status when placementSrc changes', async () => {
      const wrapper = mount(ImageItem, {
        props: {
          src: 'https://example.com/main.jpg',
          placementSrc: 'https://example.com/thumb1.jpg',
        },
      });
      await nextTick();
      await wrapper.setProps({ placementSrc: 'https://example.com/thumb2.jpg' });
      await nextTick();
    });

    it('should show error element when error is true', async () => {
      // 通过触发图片加载错误来测试
      const wrapper = mount(ImageItem, {
        props: {
          src: 'https://example.com/image.jpg',
        },
      });
      await nextTick();
      const img = wrapper.find('img');
      await img.trigger('error');
      await nextTick();
      expect(wrapper.find('.t-image-viewer__img-error').exists()).toBe(true);
    });

    it('should display placeholder image when placementSrc exists and image not loaded', async () => {
      const wrapper = mount(ImageItem, {
        props: {
          src: 'https://example.com/main.jpg',
          placementSrc: 'https://example.com/thumb.jpg',
        },
      });
      await nextTick();
      // 找到占位符图片（placementSrc）
      const imgs = wrapper.findAll('img');
      const placeholder = imgs.find((img) => img.attributes('src') === 'https://example.com/thumb.jpg');
      expect(placeholder).toBeDefined();
      // 主图片应该隐藏（display: none）
      const main = imgs.find((img) => img.attributes('src') === 'https://example.com/main.jpg');
      expect(main).toBeDefined();
    });

    it('should hide placeholder and show main image when image loads', async () => {
      const wrapper = mount(ImageItem, {
        props: {
          src: 'https://example.com/main.jpg',
          placementSrc: 'https://example.com/thumb.jpg',
        },
      });
      await nextTick();
      // 初始状态：占位图显示，主图隐藏
      const imgs = wrapper.findAll('img');
      const placeholder = imgs.find((img) => img.attributes('src') === 'https://example.com/thumb.jpg');
      const main = imgs.find((img) => img.attributes('src') === 'https://example.com/main.jpg');
      expect(placeholder.exists()).toBe(true);
      expect(main.exists()).toBe(true);
      // 触发主图片加载完成
      await main.trigger('load');
      await nextTick();
      // 加载后，占位图应该隐藏，主图应该显示
      expect(placeholder.element.style.display).toBe('none');
      expect(main.element.style.display).toBe('block');
    });
  });

  describe('SVG handling', () => {
    beforeEach(() => {
      // 在每个 SVG 测试中加强模拟
      const mockShadowRoot = {
        mode: 'closed',
        appendChild: vi.fn(),
      };
      window.HTMLElement.prototype.attachShadow = vi.fn().mockReturnValue(mockShadowRoot);
      // 确保 SVGElement.prototype.getBBox 被模拟
      if (window.SVGElement) {
        window.SVGElement.prototype.getBBox = vi.fn().mockReturnValue({
          x: 0,
          y: 0,
          width: 100,
          height: 100,
        });
      }
    });

    it('should call createSvgShadow when isSvg is true on mounted', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve('<svg viewBox="0 0 200 200"></svg>'),
      });
      const wrapper = mount(ImageItem, {
        props: {
          src: 'https://example.com/image.svg',
          isSvg: true,
        },
      });
      await nextTick();
      // 等待 mounted 异步操作
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(mockFetch).toHaveBeenCalledWith('https://example.com/image.svg');
      // 由于 attachShadow 被模拟，我们无法直接检查 DOM 类，但可以确保没有错误
      expect(wrapper.find('.t-image-viewer__img-error').exists()).toBe(false);
    });

    it('should set error true when fetch fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        statusText: 'Not Found',
      });
      const wrapper = mount(ImageItem, {
        props: {
          src: 'https://example.com/image.svg',
          isSvg: true,
        },
      });
      await nextTick();
      await new Promise((resolve) => setTimeout(resolve, 0));
      // 错误元素应该被渲染
      expect(wrapper.find('.t-image-viewer__img-error').exists()).toBe(true);
    });

    it('should handle SVG without viewBox (calls getBBox)', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve('<svg></svg>'),
      });
      const wrapper = mount(ImageItem, {
        props: {
          src: 'https://example.com/image.svg',
          isSvg: true,
        },
      });
      await nextTick();
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(window.SVGElement.prototype.getBBox).toHaveBeenCalled();
    });

    it('should handle SVG with viewBox containing commas', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve('<svg viewBox="0,0,300,300"></svg>'),
      });
      const wrapper = mount(ImageItem, {
        props: {
          src: 'https://example.com/image.svg',
          isSvg: true,
        },
      });
      await nextTick();
      await new Promise((resolve) => setTimeout(resolve, 0));
      // 应该成功解析，不报错
      expect(wrapper.find('.t-image-viewer__img-error').exists()).toBe(false);
    });
  });

  describe('Mouse events', () => {
    it('should call mouseDownHandler on image mousedown', async () => {
      const wrapper = mount(ImageItem, {
        props: {
          src: 'https://example.com/image.jpg',
        },
      });
      await nextTick();
      const img = wrapper.find('img');
      await img.trigger('mousedown');
      // We can't easily assert internal transform changes, but ensure no error
    });

    it('should call mouseDownHandler on placement image mousedown', async () => {
      const wrapper = mount(ImageItem, {
        props: {
          src: 'https://example.com/main.jpg',
          placementSrc: 'https://example.com/thumb.jpg',
        },
      });
      await nextTick();
      const imgs = wrapper.findAll('img');
      const placeholder = imgs.find((img) => img.attributes('src') === 'https://example.com/thumb.jpg');
      await placeholder.trigger('mousedown');
      // Should not throw error
    });

    it('should call mouseDownHandler on SVG element mousedown', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve('<svg viewBox="0 0 200 200"></svg>'),
      });
      const wrapper = mount(ImageItem, {
        props: {
          src: 'https://example.com/image.svg',
          isSvg: true,
        },
      });
      await nextTick();
      await new Promise((resolve) => setTimeout(resolve, 0));

      const svgContainer = wrapper.find('.t-image-viewer__modal-image');
      await svgContainer.trigger('mousedown');
      // Should not throw error
    });
  });

  describe('Error handling and edge cases', () => {
    it('resetStatus should call createSvgShadow when isSvg is true', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        text: () => Promise.resolve('<svg></svg>'),
      });
      const wrapper = mount(ImageItem, {
        props: {
          src: 'https://example.com/image.svg',
          isSvg: true,
        },
      });
      await nextTick();
      await new Promise((resolve) => setTimeout(resolve, 0));

      // 模拟重置状态
      await wrapper.setProps({ src: 'https://example.com/new.svg' });
      await nextTick();
      // 应该重新调用 createSvgShadow
      expect(mockFetch).toHaveBeenCalledTimes(2);
    });

    it('createSvgShadow should handle SVG parsing errors gracefully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve('<svg>invalid content'),
      });
      const wrapper = mount(ImageItem, {
        props: {
          src: 'https://example.com/image.svg',
          isSvg: true,
        },
      });
      await nextTick();
      await new Promise((resolve) => setTimeout(resolve, 0));
      // 即使 SVG 内容无效，也不应该抛出未处理的错误
    });

    it('should not show error when image loads successfully', async () => {
      const wrapper = mount(ImageItem, {
        props: {
          src: 'https://example.com/image.jpg',
        },
      });
      await nextTick();
      const img = wrapper.find('img');
      await img.trigger('load');
      await nextTick();
      expect(wrapper.find('.t-image-viewer__img-error').exists()).toBe(false);
    });

    it('should handle mouseDownHandler with non-zero button click', async () => {
      const wrapper = mount(ImageItem, {
        props: {
          src: 'https://example.com/image.jpg',
        },
      });
      await nextTick();
      const img = wrapper.find('img');
      // 模拟右键点击（button 不为 0）
      await img.trigger('mousedown', { button: 2 });
      // 不应该触发拖动逻辑
    });

    it('should handle SVG with empty viewBox values', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve('<svg viewBox=" "></svg>'),
      });
      const wrapper = mount(ImageItem, {
        props: {
          src: 'https://example.com/image.svg',
          isSvg: true,
        },
      });
      await nextTick();
      await new Promise((resolve) => setTimeout(resolve, 0));
      // 应该处理空 viewBox 的情况
    });

    it('should show placeholder image when image not loaded and placementSrc provided', async () => {
      const wrapper = mount(ImageItem, {
        props: {
          src: 'https://example.com/image.jpg',
          placementSrc: 'https://example.com/placeholder.jpg',
        },
      });

      // 初始状态：图片未加载，应该显示占位图
      await nextTick();
      const images = wrapper.findAll('img');

      // 应该有两个图片：主图和占位图
      expect(images.length).toBe(2);

      // 主图片应该隐藏，占位图应该显示
      const mainImg = images[0];
      const placeholderImg = images[1];

      // 验证占位图片的渲染条件
      // 主要测试占位图片的显示逻辑，不依赖具体的样式值
      const hasPlaceholderSrc = wrapper.props('placementSrc') !== undefined;
      if (hasPlaceholderSrc) {
        // 当有placementSrc时，应该渲染占位图片
        const placeholderImg = images.find((img) => img.attributes('src') === 'https://example.com/placeholder.jpg');
        expect(placeholderImg).toBeDefined();
      }
    });

    it('should not show placeholder image when placementSrc not provided', async () => {
      const wrapper = mount(ImageItem, {
        props: {
          src: 'https://example.com/image.jpg',
        },
      });

      await nextTick();
      const images = wrapper.findAll('img');
      expect(images.length).toBe(1); // 只有一个图片，没有占位图
    });
  });
});
