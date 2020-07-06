/* eslint-disable @typescript-eslint/no-unused-expressions */
// docs: https://docs.cypress.io/api/commands/and.html#Syntax
describe('Test Message', () => {
  const THEME_LIST = [
    'info',
    'success',
    'warning',
    'error',
    'question',
    'loading',
  ];

  const msgText = '提示信息';

  const clearAllMsg = () => {
    cy.document().then((doc) => {
      doc.getElementById('t-demo-msg-close-all').click();
      cy.log('clear all message.');
    });
  };

  beforeEach(() => {
    cy.visit('/#/components/message');
  });

  // 方式一：主题调用
  it(`this.$message.info('${msgText}') works fine.`, () => {
    cy.get('.t-demo-message-theme button')
      .click({ multiple: true })
      .document()
      .then((doc) => {
        THEME_LIST.forEach((theme) => {
          const selector = `body>.t-message-list>.t-is-${theme}`;
          const dom = doc.querySelector(selector);
          expect(Boolean(dom)).to.be.true;
        });
      });
    clearAllMsg();
  });

  // 方式一：时间控制
  it(`this.$message.info('${msgText}', 1000); duration(1000ms) works fine.`, () => {
    const buttons = cy.get('.t-demo-message-duration button');
    buttons.first()
      .click()
      .document()
      .then((doc) => {
        const selector = 'body>.t-message-list>.t-is-info';
        const dom = doc.querySelector(selector);
        expect(Boolean(dom)).to.be.true;
        // disapear in one second.
        cy.wait(1000).then(() => {
          const dom = doc.querySelector(selector);
          expect(Boolean(dom)).to.be.false;
        });
      });
  });

  // 方式二：传入对象
  it(`this.$message.info({ content: '${msgText}' }); Params type is object`, () => {
    cy.get('.t-demo-message-obj button')
      .first()
      .click({ multiple: true })
      .document()
      .then((doc) => {
        const selector = 'body>.t-message-list>.t-is-info';
        const dom = doc.querySelector(selector);
        expect(Boolean(dom)).to.be.true;
        // disapear in three seconds.
        cy.wait(3000).then(() => {
          const dom = doc.querySelector(selector);
          expect(Boolean(dom)).to.be.false;
        });
      });
  });

  // 方式三：主函数
  it(`this.$message('loading', { content: '${msgText}' }); Params type is object`, () => {
    cy.get('.t-demo-message-main button')
      .last()
      .click({ multiple: true })
      .document()
      .then((doc) => {
        const selector = 'body>.t-message-list>.t-is-loading';
        const dom = doc.querySelector(selector);
        expect(Boolean(dom)).to.be.true;
        // disapear in one second.
        cy.wait(1000).then(() => {
          const dom = doc.querySelector(selector);
          expect(Boolean(dom)).to.be.false;
        });
      });
  });
});
