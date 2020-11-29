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

  beforeEach(() => {
    cy.visit('/#/components/message');
  });

  // 方式一：主题调用
  it(`this.$message.info('${msgText}') works fine.`, () => {
    cy.get('.t-demo-message-theme button')
      .click({ multiple: true })
      .then(() => {
        THEME_LIST.forEach((theme) => {
          cy.get(`body>.t-message-list>.t-is-${theme}`)
            .should('exist');
        });
      });
    cy.get('#t-demo-msg-close-all')
      .click();
  });

  // 方式一：时间控制
  it(`this.$message.info('${msgText}', 1000); duration(1000ms) works fine.`, () => {
    cy.get('.t-demo-message-duration button')
      .first()
      .click()
      .then(() => {
        cy.get('body>.t-message-list>.t-is-info')
          .should('exist')
          .wait(1000)
          .then(($el) => {
            cy.wrap($el)
              .should('not.exist');
          });
      });
  });

  // 方式二：传入对象
  it(`this.$message.info({ content: '${msgText}' }); Params type is object`, () => {
    cy.get('.t-demo-message-obj button')
      .first()
      .click()
      .then(() => {
        cy.get('body>.t-message-list>.t-is-info')
          .should('exist')
          .wait(3000)
          .then(($el) => {
            cy.wrap($el)
              .should('not.exist');
          });
      });
  });

  // 方式三：主函数
  it(`this.$message('loading', { content: '${msgText}' }); Params type is object`, () => {
    cy.get('.t-demo-message-main button')
      .last()
      .click()
      .then(() => {
        cy.get('body>.t-message-list>.t-is-loading')
          .should('exist')
          .wait(1000)
          .then(($el) => {
            cy.wrap($el)
              .should('not.exist');
          });
      });
  });
});
