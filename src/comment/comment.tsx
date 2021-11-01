import { defineComponent, Slot, VNode } from 'vue';
import { prefix } from '../config';
import props from './props';
import { renderTNodeJSX } from '../utils/render-tnode';

const preName = `${prefix}-comment`;

export default defineComponent({
  name: 'TComment',
  props,
  methods: {
    renderReply() {
      const reply = renderTNodeJSX(this, 'reply');
      return reply ? <div class={`${preName}__reply`}>{reply}</div> : null;
    },
    renderActions() {
      const actions = renderTNodeJSX(this, 'actions');
      return actions && actions.length ? (
        <ul class={`${preName}__actions`}>
          {actions.map((action: Slot, index: number) => (
            <li key={`action-${index}`}>{action}</li>
          ))}
        </ul>
      ) : null;
    },

    renderQuote() {
      const quote = renderTNodeJSX(this, 'quote');
      return quote ? <div class={`${preName}__quote`}>{quote}</div> : null;
    },

    renderAuthorDatetime() {
      const author = renderTNodeJSX(this, 'author');
      const datetime = renderTNodeJSX(this, 'datetime');

      return (author || datetime) && (
        <div class={`${preName}__author`}>
          {author && <span class={`${preName}__name`}>{author}</span>}
          {datetime && <span class={`${preName}__time`}>{datetime}</span>}
        </div>
      );
    },

    renderContent() {
      return (
        <div class={`${preName}__content`}>
          {this.renderAuthorDatetime()}
          <div class={`${preName}__detail`}>{renderTNodeJSX(this, 'content')}</div>
            {this.renderQuote()}
            {this.renderActions()}
          </div>
      );
    },

    renderAvatar() {
      return this.avatar ? (
      <div class={`${preName}__avatar`}>
        {typeof this.avatar === 'string' ? (
          <img src={this.avatar} alt="" class={`${preName}__avatar-image`} />
        ) : (
          renderTNodeJSX(this, 'avatar')
        )}
      </div>
      ) : null;
    },
  },

  render(): VNode {
    return (
      <div class={preName}>
        <div class={`${preName}__inner`}>
          {this.renderAvatar()}
          {this.renderContent()}
        </div>
          {this.renderReply()}
        </div>
    );
  },
});
