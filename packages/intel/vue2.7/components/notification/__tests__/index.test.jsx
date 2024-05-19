import { mount } from '@vue/test-utils';
import { it } from 'vitest';
import { Notification, NotificationPlugin } from '@/src/notification/index.ts';

// every component needs four parts: props/events/slots/functions.
describe('Notification', () => {
  // test props api
  describe(':props', () => {
    it('set props', () => {
      const titleText = '标题';
      const contentId = 'content';
      const contentText = '内容';
      const closeBtnId = 'close';
      const closeBtnText = '关闭';
      const footerId = 'footer';
      const wrapper = mount({
        render() {
          return (
            <Notification
              title={titleText}
              content={() => <div id={contentId}>{contentText}</div>}
              theme="success"
              icon={() => <div>test</div>}
              closeBtn={() => <div id={closeBtnId}>{closeBtnText}</div>}
              footer={() => (
                <div id={footerId} className="t-notification__detail">
                  <span className="t-notification__detail-item">确定</span>
                </div>
              )}
            />
          );
        },
      });
      const title = wrapper.find('.t-notification__title');
      expect(title.text()).toBe(titleText);

      expect(wrapper.find(`#${contentId}`).text()).toBe(contentText);
      expect(wrapper.find(`#${closeBtnId}`).text()).toBe(closeBtnText);
      expect(wrapper.find(`#${footerId}`).exists()).toBeTruthy();
    });
    it('open and close', async () => {
      NotificationPlugin.closeAll();
      await NotificationPlugin.info({});
      expect(document.querySelectorAll('.t-notification').length).toBe(1);
      NotificationPlugin.closeAll();
    });
  });
  it('open with theme', async () => {
    NotificationPlugin.closeAll();

    await NotificationPlugin.info({});
    await NotificationPlugin.success({});
    await NotificationPlugin.warning({});
    await NotificationPlugin.error({});

    expect(document.querySelectorAll('.t-notification .t-is-info').length).toBe(1);
    expect(document.querySelectorAll('.t-notification .t-is-success').length).toBe(1);
    expect(document.querySelectorAll('.t-notification .t-is-warning').length).toBe(1);
    expect(document.querySelectorAll('.t-notification .t-is-error').length).toBe(1);
  });
  test('open with placement', async () => {
    NotificationPlugin.closeAll();

    await NotificationPlugin.info({ placement: 'top-left' });
    await NotificationPlugin.info({ placement: 'top-right' });
    await NotificationPlugin.info({ placement: 'bottom-left' });
    await NotificationPlugin.info({ placement: 'bottom-right' });

    expect(document.querySelectorAll('.t-notification__show--top-left').length).toBe(1);
    expect(document.querySelectorAll('.t-notification__show--top-right').length).toBe(1);
    expect(document.querySelectorAll('.t-notification__show--bottom-left').length).toBe(1);
    expect(document.querySelectorAll('.t-notification__show--bottom-right').length).toBe(1);
  });
  it('click close button', async () => {
    NotificationPlugin.closeAll();
    const wrapper = mount({
      render() {
        return <Notification closeBtn={() => <div id="close_button">关闭</div>} />;
      },
    });

    await wrapper.find('#close_button').element.click();

    expect(document.querySelectorAll('.t-notification').length).toBe(0);
  });
  it('auto close', async () => {
    NotificationPlugin.closeAll();

    await NotificationPlugin.info({ duration: 1000 });

    expect(document.querySelectorAll('.t-notification').length).toBe(1);
    setTimeout(() => {
      expect(document.querySelectorAll('.t-notification').length).toBe(0);
    }, 1200);
  });
});
