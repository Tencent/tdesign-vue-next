describe('Test Popconfirm', () => {
  let index = 0;
  beforeEach(() => {
    cy.visit('/#components/popconfirm');
  });
  it('默认悬浮显示 popconfirm ', () => {
    cy.get('.t-button').eq(index)
      .trigger('mouseenter');
    cy.get('.t-popconfirm').eq(index)
      .should('be.visible');

    cy.get('.t-button').eq(index)
      .trigger('mouseleave');
    cy.get('.t-popconfirm').eq(index)
      .should('not.be.visible');
    index += 1;
  });

  it('主题 default 不存在icon', () => {
    cy.get('.t-button').eq(index)
      .trigger('mouseenter');
    cy.get('.t-popconfirm').eq(index)
      .find('.t-icon')
      .should('not.exist');
    index += 1;
  });

  it('主题 info icon 颜色 rgb(0, 82, 217) ', () => {
    cy.get('.t-button').eq(index)
      .trigger('mouseenter');
    cy.get('.t-popconfirm').eq(index)
      .find('.t-icon')
      .should((elem) => {
        expect(elem).to.have.css('color', 'rgb(0, 82, 217)');
      });
    index += 1;
  });

  it('主题 warning icon 颜色 rgb(255, 170, 0) ', () => {
    cy.get('.t-button').eq(index)
      .trigger('mouseenter');
    cy.get('.t-popconfirm').eq(index)
      .find('.t-icon')
      .should((elem) => {
        expect(elem).to.have.css('color', 'rgb(255, 170, 0)');
      });
    index += 1;
  });

  it('主题 error icon 颜色 rgb(255, 62, 0) ', () => {
    cy.get('.t-button').eq(index)
      .trigger('mouseenter');
    cy.get('.t-popconfirm').eq(index)
      .find('.t-icon')
      .should((elem) => {
        expect(elem).to.have.css('color', 'rgb(255, 62, 0)');
      });
    index += 1;
  });

  it('自定义设置icon', () => {
    for (;index < 8; index += 1) {
      cy.get('.t-button').eq(index)
        .trigger('mouseenter');
      cy.get('.t-popconfirm').eq(index)
        .find('.t-icon')
        .should('exist');
    }
  });

  it('自定义设置button', () => {
    for (;index < 10; index += 1) {
      cy.get('.t-button').eq(index)
        .trigger('mouseenter');
      cy.get('.t-popconfirm').eq(index)
        .find('.t-button')
        .should('have.length', 2)
        .should('exist');
    }
  });

  it('自定义设置content', () => {
    cy.get('.t-button').eq(index)
      .trigger('mouseenter');
    cy.get('.t-popconfirm').eq(index)
      .find('.t-popconfirm__inner p')
      .should('exist');
    index += 1;
  });

  it('回调 conform cancel', () => {
    cy.get('.t-button').eq(index)
      .trigger('mouseenter');
    cy.get('.t-popconfirm').eq(index)
      .find('.t-button')
      .eq(0)
      .click();
    cy.get('.t-message-list')
      .should('contain', 'Click on No');

    cy.get('.t-button').eq(index)
      .trigger('mouseenter');
    cy.get('.t-popconfirm').eq(index)
      .find('.t-button')
      .eq(1)
      .click();
    cy.get('.t-message-list')
      .should('contain', 'Click on Yes');
    index += 1;
  });

  it('placement right', () => {
    cy.get('.t-button').eq(index)
      .click();
    cy.get('.t-popconfirm').eq(index)
      .should('have.attr', 'data-popper-placement', 'right');
    index += 1;
  });

  it('点击 trigger="manual"', () => {
    cy.get('.t-button').eq(index)
      .click();
    cy.get('.t-popconfirm').eq(index)
      .should('be.visible');

    cy.get('.t-button').eq(index)
      .click();
    cy.get('.t-popconfirm').eq(index)
      .should('not.be.visible');
    index += 1;
  });

  it('点击 trigger="click"', () => {
    cy.get('.t-button').eq(index)
      .click();
    cy.get('.t-popconfirm').eq(index)
      .should('be.visible');

    cy.get('.t-button').eq(index)
      .click();
    cy.get('.t-popconfirm').eq(index)
      .should('not.be.visible');
    index += 1;
  });

  it('默认悬浮显示 popconfirm ', () => {
    cy.get('.t-button').eq(index)
      .trigger('mouseenter');
    cy.get('.t-popconfirm').eq(index)
      .should('be.visible');
    cy.get('.t-button').eq(index)
      .should('have.class', 't-button--warning');
    index += 1;
  });
});
