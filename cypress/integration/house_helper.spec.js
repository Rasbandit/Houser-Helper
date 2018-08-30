describe('Can use site and all its features', () => {
  it('can log in', () => {
    cy.visit('/');
    cy.get('input:first').type('Bob Ross');
    cy.get('input:last').type('HLT');
    cy
      .get('div')
      .contains('Login')
      .click();
    cy.location().should(loc => {
      expect(loc.hash).to.eq('#/dashboard');
    });
  });

  it('can filter houses', () => {
    cy.wait(600);
    let selectedHouses = 0;
    cy.get('.house-card-dashboard').should(houses => {
      expect(houses.length).to.be.at.least(0);
      selectedHouses = houses.length;
    });
    cy.get('input').type('1000');
    cy.get('.house-card-dashboard').should(houses => {
      expect(houses.length).to.be.lessThan(selectedHouses);
    });
    cy.get('input').clear();
  });

  it('can Favorite House', () => {
    cy
      .get('.house-card-dashboard')
      .eq(1)
      .within(() => {
        cy.get('.star').click();
        cy.get('.star span').should('have.class', 'fa-star');
      });
  });
  it('can unfavorite house', () => {
    cy.wait(250);
    cy
      .get('.house-card-dashboard')
      .eq(1)
      .within(() => {
        cy.get('.star').click();
        cy.get('.star span').should('have.class', 'fa-star-o');
      });
  });

  it('can fill in wizzard one', () => {
    cy
      .get('.button')
      .contains('Add new property')
      .click();
    cy.location().should(loc => {
      expect(loc.hash).to.eq('#/wizzard/1');
    });
    cy
      .get('label')
      .contains('Property Name')
      .next()
      .type('Fortress of Solitude')
      .should('have.value', 'Fortress of Solitude');
    cy
      .get('label')
      .contains('Property Description')
      .next()
      .type('An ice fortress to clear the mind')
      .should('have.value', 'An ice fortress to clear the mind');
    cy
      .get('.next-button')
      .contains('Next Step')
      .click();
  });

  it('can fill in wizzard ontwo', () => {
    cy.location().should(loc => {
      expect(loc.hash).to.eq('#/wizzard/2');
    });
    cy
      .get('label')
      .contains('Address')
      .next()
      .type('south pole')
      .should('have.value', 'south pole');
    cy
      .get('label')
      .contains('City')
      .next()
      .type('Antartica')
      .should('have.value', 'Antartica');
    cy
      .get('label')
      .contains('State')
      .next()
      .type('Ice')
      .should('have.value', 'Ice');
    cy
      .get('label')
      .contains('Zip')
      .next()
      .type('12345')
      .should('have.value', '12345');
    cy
      .get('.next-button')
      .contains('Next Step')
      .click();
  });

  it('can fill in wizzard three', () => {
    cy.location().should(loc => {
      expect(loc.hash).to.eq('#/wizzard/3');
    });
    const imgUrl1 = 'https://goo.gl/5KMVKR';
    for (let i = 0; i < imgUrl1.length; i++) {
      cy.get('#0').type(imgUrl1[i]);
    }

    cy.get('#0').should('have.value', imgUrl1);
    const imgUrl2 = 'https://goo.gl/MYDUKR';
    for (let i = 0; i < imgUrl2.length; i++) {
      cy.get('#1').type(imgUrl2[i]);
    }
    cy
      .get('.thumbnails img')
      .eq(0)
      .should('have.attr', 'src', imgUrl1);

    cy
      .get('.thumbnails img')
      .eq(1)
      .should('have.attr', 'src', imgUrl2);

    cy
      .get('.thumbnails img')
      .eq(1)
      .click();
    cy.wait(400);
    cy.get('.img-container img').should('have.attr', 'src', imgUrl2);
    cy
      .get('.next-button')
      .contains('Next Step')
      .click();
  });

  it('can fill in wizzard four', () => {
    cy.location().should(loc => {
      expect(loc.hash).to.eq('#/wizzard/4');
    });
    cy
      .get('label')
      .contains('Loan Amount')
      .next()
      .type('50000')
      .should('have.value', '$50,000');

    cy
      .get('label')
      .contains('Monthly Mortgage')
      .next()
      .type('4000')
      .should('have.value', '$4,000');
    cy
      .get('.next-button')
      .contains('Next Step')
      .click();
  });

  it('can fill in wizzard Five', () => {
    cy.location().should(loc => {
      expect(loc.hash).to.eq('#/wizzard/5');
    });
    cy
      .get('label')
      .contains('Desired Rent')
      .next()
      .type('4500')
      .should('have.value', '$4,500');
    cy.get('.complete').click();
    cy.wait(500);
    cy.get('.swal2-confirm').click();
  });

  it('should return to the dashboard and show new house', () => {
    cy.visit('http://localhost:3000/#/dashboard');
    cy.location().should(loc => {
      expect(loc.hash).to.eq('#/dashboard');
    });
    cy.get('.house-card-dashboard').within(() => {
      cy.get('h1').should('contain', 'Fortress of Solitude');
    });
  });
});
