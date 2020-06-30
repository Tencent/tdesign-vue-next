describe('test tag component', () => {
  beforeEach(() => {
    cy.visit('/#/components/tag');
  });
  it('测试默认标签', () => {
    cy.get('.tdesign-tag-default')
      .find('span')
      .last()
      .should((elem) => {
        expect(elem).to.have.class('t-tag--default');
      });
  });

  it('测试标签主题', () => {
    cy.get('.tdesign-tag-theme')
      .find('.t-tag--primary')
      .first()
      .should((elem) => {
        expect(elem).to.have.class('t-tag--primary');
      });
    cy.get('.tdesign-tag-theme')
      .find('.t-tag--info')
      .first()
      .should((elem) => {
        expect(elem).to.have.class('t-tag--info');
      });
  });

  it('测试朴素主题', () => {
    cy.get('.tdesign-tag-plain')
      .find('span')
      .first()
      .should((elem) => {
        expect(elem).to.have.class('t-tag--plain');
      });
  });

  it('测试可删除标签', () => {
    cy.get('.tdesign-tag-closable')
      .find('i')
      .first()
      .should((elem) => {
        expect(elem).to.have.class('t-icon-close');
      });

    cy.get('.tdesign-tag-closable')
      .find('.t-icon-close')
      .first()
      .click();
  });

  it('测试图标标签', () => {
    cy.get('.tdesign-tag-icon')
      .find('i')
      .first()
      .should((elem) => {
        expect(elem).to.have.class('t-icon');
      });
  });

  it('测试失效标签', () => {
    cy.get('.tdesign-tag-disabled')
      .find('span')
      .first()
      .should((elem) => {
        expect(elem).to.have.class('t-tag--disabled');
        expect(elem).to.have.class('t-tag--default');
      });
  });

  it('测试可选标签', () => {
    cy.get('.tdesign-tag-checkable')
      .find('span')
      .last()
      .should((elem) => {
        expect(elem).to.have.class('t-tag--checked');
        expect(elem).to.have.class('t-tag--default');
      });
  });

  it('测试超长文本省略标签', () => {
    cy.get('.tdesign-tag-ellipsis')
      .find('span')
      .last()
      .should((elem) => {
        expect(elem).to.have.class('t-tag--ellipsis');
      });
  });

  it('测试标签尺寸', () => {
    cy.get('.tdesign-tag-size')
      .find('span')
      .last()
      .should((elem) => {
        expect(elem).to.have.class('t-tag--large');
      });
  });

  it('测试标签形状', () => {
    cy.get('.tdesign-tag-shape')
      .find('span')
      .last()
      .should((elem) => {
        expect(elem).to.have.class('t-tag--mark');
      });
  });
});
