describe('test tag component', () => {
  beforeEach(() => {
    cy.visit('/#/components/tag');
  });
  it('default tag', () => {
    cy.get('.tdesign-tag-default')
      .find('span')
      .last()
      .should((elem) => {
        expect(elem).to.have.class('t-tag--default');
      });
  });

  it('tag theme', () => {
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

  it('tag:variant:plain', () => {
    cy.get('.tdesign-tag-theme .plain')
      .find('span')
      .first()
      .should((elem) => {
        expect(elem).to.have.class('t-tag--plain');
      });
  });

  it('tag:variant:light', () => {
    cy.get('.tdesign-tag-theme .light')
      .find('span')
      .first()
      .should((elem) => {
        expect(elem).to.have.class('t-tag--light');
      });
  });

  it('tag:closable', () => {
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

  it('tag:icon', () => {
    cy.get('.tdesign-tag-icon')
      .find('i')
      .first()
      .should((elem) => {
        expect(elem).to.have.class('t-icon');
      });
  });

  it('tag:disabled', () => {
    cy.get('.tdesign-tag-disabled')
      .find('span')
      .first()
      .should((elem) => {
        expect(elem).to.have.class('t-tag--disabled');
        expect(elem).to.have.class('t-tag--default');
      });
  });

  it('tag:long text ellipsis', () => {
    cy.get('.tdesign-tag-ellipsis')
      .find('span')
      .last()
      .should((elem) => {
        expect(elem).to.have.class('t-tag--ellipsis');
      });
  });

  it('tag:size', () => {
    cy.get('.tdesign-tag-size')
      .find('span')
      .last()
      .should((elem) => {
        expect(elem).to.have.class('t-size-l');
      });
  });

  it('tag:shape', () => {
    cy.get('.tdesign-tag-shape')
      .find('span')
      .last()
      .should((elem) => {
        expect(elem).to.have.class('t-tag--mark');
      });
  });

  it('checktag:disabled', () => {
    cy.get('.tdesign-tag-disabled')
      .find('.check-tag')
      .last()
      .should((elem) => {
        expect(elem).to.have.class('t-tag--disabled');
      });
  });

  it('checktag:checkable', () => {
    cy.get('.tdesign-tag-checkable')
      .find('span')
      .last()
      .should((elem) => {
        expect(elem).to.have.class('t-tag--checked');
        expect(elem).to.have.class('t-tag--default');
      });

    cy.get('.tdesign-tag-checkable')
      .find('span')
      .first()
      .click();
  });
});
