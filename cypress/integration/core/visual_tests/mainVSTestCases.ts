import { eq } from 'cypress/types/lodash';
import basePage from '../pom/basePage';
import mainPage from '../pom/mainPage';
///<reference types="cypress-iframe" />


describe('Actions', () => {

  beforeEach(() => {
    basePage.start(basePage.stageURL);
  })

  const mobNumber = "87777777";
  const code = "222222";

  const img = "images/koba.jpg";


  it('check booking (logout) SNDV-1', () => {
    const searchOption = "Singapore Zoo, Singapore";

    cy.wait(5000);
    cy.percySnapshot("mainPage");
    cy.get('[placeholder="Search from Train station, district or place"]').should("be.visible");
    cy.get('[placeholder="Search from Train station, district or place"]').click();
    cy.get('[placeholder="Search from Train station, district or place"]').type(searchOption);
    cy.xpath('//div[text() = "' + searchOption + '"]').should('be.visible');
    cy.xpath('//div[text() = "' + searchOption + '"]').click();
    cy.get('.MuiBox-root>img').should('be.visible');
    cy.wait(3000);
    cy.percySnapshot("after_search");
    cy.get('#sndloader').should('not.exist');
    cy.wait(5000);
    cy.scrollTo(0, 300);
    cy.contains('XS').click({ force: true });
    cy.contains("VIEW ALL").should('be.visible');
    cy.wait(2000).contains("VIEW ALL").click({ force: true });
    cy.window().its('open').should('be.called')
    cy.visit(basePage.stageURL + "details/123?space_type=2&location=Singapore&city_id=1&total_results=9&space_id=null");
    cy.contains("Storhub 15 Changi").should("be.visible");
  
    cy.wait(9000);
    cy.percySnapshot("storage_details");
    cy.contains("15 sqft").click({ force: true });
    cy.contains("BOOK NOW").click({ force: true });
    cy.get('[placeholder="Full name"]').type("lukatest1");
    cy.get('[placeholder="Email address"]').type("lukatest@g.com"); 
    cy.get('input[type="number"]').type("65123456"); 
    cy.wait(9000);
    cy.percySnapshot("reserve_card_page");

    cy.contains("reserve this unit").click({ force: true });
    cy.wait(3000);
    cy.percySnapshot("checkout_page");
    cy.contains('continue').click();
    cy.contains("2000 Coverage").click({ force: true });
    cy.wait(3000);

    cy.percySnapshot("insurance_plan_page");
    cy.contains("continue").should('be.visible').click({ force: true });

    cy.contains('Self storage license agreement').should('be.visible').click();
    cy.wait(3000);
    cy.percySnapshot("self_storage_license_agreement");
    cy.get('img[src="/images/close.svg"]').click({force: true});

    cy.get('iframe[title="Secure card payment input frame"]', { timeout: 30000 }).then(iframe => {
      const $doc = iframe.contents();
      cy.wait(3000).wrap( $doc.find("input[name='cardnumber']") ).type('4242 4242 4242 4242');
      cy.wrap( $doc.find("input[name='exp-date']") ).type("07 / 22");
      cy.wrap( $doc.find('input[name="cvc"]') ).type("123");
    })
    cy.contains("Accept And Pay").click({ force: true });
    cy.contains("Your booking is confirmed!").should('be.visible');
    cy.wait(8500);
    cy.percySnapshot("sucessfull_reservation_page");
    cy.contains("See Receipt").should('be.visible').click({force: true});
    cy.wait(3500);
    cy.percySnapshot("receipt_page");

  })

  it('login SNDV-2', () => {
    cy.get('img[alt="burger"]').should('be.visible').click({force: true});
    cy.get('.MuiPaper-root.MuiDrawer-paper').should('be.visible');
    cy.wait(5000).percySnapshot("burger_menu_open_logout");
    cy.xpath('//span[text() = "login"]').should('be.visible').click();
    cy.wait(6000).percySnapshot("login_email");
    cy.get('#viaPhoneNumber').should('be.visible').click({force: true});
    cy.wait(4000).percySnapshot("login_mobile");
    cy.get('input.MuiInputBase-input').should('be.visible').type(mobNumber);
    cy.contains('By signing in, I agree to Terms of Use and Privacy Policy.').click({force: true});
    cy.wait(1000).percySnapshot("login_mobile_inputed_number");
    cy.get('#loginButton').should('be.visible').click({force: true});
    cy.get('input[type="tel"]').eq(0).type(code[0]);
    cy.get('input[type="tel"]').eq(1).type(code[1]);
    cy.get('input[type="tel"]').eq(2).type(code[2]);
    cy.get('input[type="tel"]').eq(3).type(code[3]);
    cy.get('input[type="tel"]').eq(4).type(code[4]);
    cy.get('input[type="tel"]').eq(5).type(code[5]);
    cy.wait(1000).percySnapshot("login_mobile_inputed_code");
    cy.get('button.MuiButtonBase-root.MuiButton-root[type="submit"]').should('be.visible').click();
    cy.wait(5000).get('img[alt="burger"]').should('be.visible').click({force: true});
    cy.get('.MuiPaper-root.MuiDrawer-paper').should('be.visible');
    cy.wait(5000).percySnapshot("burger_menu_open_login");
    cy.get('div.MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorLeft').scrollTo(0,300);
    cy.get('#signOut').should('be.visible').click({force: true});
    cy.contains('Are you sure you want to Sign Out?').should('be.visible');
    cy.wait(5000).percySnapshot("logout_confirmation_popup");
    cy.get('button.MuiButtonBase-root.MuiButton-root').eq(2).click();
  });  

  it('Add commercial property Given I navigate on SNDV-3', () => {
    cy.get('img[alt="burger"]').should('be.visible').click({force: true});
    cy.get('.MuiPaper-root.MuiDrawer-paper').should('be.visible');
    cy.xpath('//span[text() = "login"]').should('be.visible').click();
    cy.get('#viaPhoneNumber').should('be.visible').click({force: true});
    cy.get('input.MuiInputBase-input').should('be.visible').type(mobNumber);
    cy.contains('By signing in, I agree to Terms of Use and Privacy Policy.').click({force: true});
    cy.get('#loginButton').should('be.visible').click({force: true});
    cy.get('input[type="tel"]').eq(0).type(code[0]);
    cy.get('input[type="tel"]').eq(1).type(code[1]);
    cy.get('input[type="tel"]').eq(2).type(code[2]);
    cy.get('input[type="tel"]').eq(3).type(code[3]);
    cy.get('input[type="tel"]').eq(4).type(code[4]);
    cy.get('input[type="tel"]').eq(5).type(code[5]);
    cy.get('button.MuiButtonBase-root.MuiButton-root[type="submit"]').should('be.visible').click();
    cy.wait(5000).get('img[alt="burger"]').should('be.visible').click({force: true});
    cy.contains('Switch to Host').should('be.visible').click({force: true});
    cy.wait(5000).percySnapshot("user_reservation_page");
    cy.get('#createListingsButton').should('be.visible').click();
    cy.wait(5000).percySnapshot("create_listing_empty_page1");
    cy.get('div[aria-haspopup="listbox"]').eq(0).click({force: true});
    cy.contains('Commercial').click({force: true});
    cy.get('div[aria-haspopup="listbox"]').eq(1).click({force: true});
    cy.get('li[data-value="7"]').click({force: true});
    cy.contains('I’m hosting as a registered business').should('be.visible').click({force: true});
    cy.wait(500).percySnapshot("create_listing_filled_page1");
    cy.get('button[type="submit"]').click();
    cy.wait(5000).percySnapshot("create_listing_empty_page2");
    cy.get('div[aria-haspopup="listbox"]').eq(0).click({force: true});
    cy.contains('Singapore').click({force: true});
    cy.wait(500).get('div[aria-haspopup="listbox"]').eq(1).click({force: true});
    cy.get('li[data-value="1"]').click({force: true});
    cy.get('div[aria-haspopup="listbox"]').eq(2).click({force: true});
    cy.wait(2000).get('div.MuiPaper-rounded').scrollTo(0,1300);
    cy.contains('Geylang').click({force: true});
    cy.get('input[placeholder="Search Location"]').type("Geylang, Singapore");
    cy.xpath('//li[text() = "Geylang, Singapore"]').click({force: true});
    cy.get('input[type="tel"]').eq(0).type("3");
    cy.get('input[type="tel"]').eq(1).type("123777");
    cy.wait(500).percySnapshot("create_listing_filled_page2");
    cy.get('button[type="submit"]').click();
    cy.wait(5000).percySnapshot("create_listing_page3");
    cy.get('button[type="submit"]').click();
    cy.wait(5000).percySnapshot("create_listing_empty_page4");
    cy.get('input[type="checkbox"]').click( { multiple: true } );
    cy.wait(1000).percySnapshot("create_listing_filled_page4");
    cy.get('button[type="submit"]').click();
    cy.wait(5000).percySnapshot("create_listing_empty_page5");
    cy.get('input[accept="image/*"]').attachFile(img);
    cy.wait(500).percySnapshot("create_listing_filled_page5");
    cy.get('button[type="submit"]').click();
    cy.wait(5000).percySnapshot("create_listing_empty_page6");
    cy.get('input[type="text"]').type('Penthouse');
    cy.wait(500).percySnapshot("create_listing_filled_page6");
    cy.get('button[type="submit"]').click();
    cy.wait(5000).percySnapshot("create_listing_empty_page7");
    cy.get('div>textarea').eq(0).type('description');
    cy.wait(500).percySnapshot("create_listing_filled_page7");
    cy.get('button[type="submit"]').click();
    cy.wait(5000).percySnapshot("create_listing_empty_page8");
    cy.get('input[type="text"]').eq(3).type('5');
    cy.get('input[type="text"]').eq(4).type('1002');
    cy.get('input[type="checkbox"]').click( { multiple: true } );
    cy.wait(500).percySnapshot("create_listing_filled_page8");
    cy.contains('+ Add Size Option').click();
    cy.wait(5000).percySnapshot("create_listing__size_option_empty_page8");
    cy.get('input[placeholder="Option name or identifier"]').type('name');
    cy.get('input[type="text"]').eq(5).type('2000');
    cy.get('span.MuiButtonBase-root.MuiIconButton-root').eq(0).click();
    cy.wait(1000).percySnapshot("create_listing__size_option_filled_page8");
    cy.get('button[type="submit"]').eq(0).click();
    cy.wait(3000).percySnapshot("create_listing__size_updated_page_page8");
    cy.get('button[type="submit"]').eq(2).click();
    cy.wait(5000).percySnapshot("create_listing_page9");
    cy.contains('Publish').click();
    cy.contains('Penthouse').eq(0).should('be.visible');
    //feature improvment cover last page
  });  

  it('I Achieve Business Inventory with standart box SNDV-4', () => {
    cy.contains('Business Inventory').should('be.visible').click();
    cy.wait(5000).percySnapshot("estimator_box_page1");
    cy.get('button[type="button"]').eq(1).should('be.visible').click();
    cy.get('img[alt="add"]').should('be.visible').click();
    cy.get('img[alt="add"]').click();
    cy.wait(5000).percySnapshot("estimator_box_page2");
    cy.get('button.textWhite.btnEstimate').should('be.visible').click();
    cy.wait(8000).percySnapshot("estimator_box_page3");
    cy.get('button.textWhite.btnFindStorage').should('be.visible').click();
    cy.wait(1000).get('#sndloader').should('not.exist');
    cy.wait(8500).percySnapshot("find_storage_page");
  });


  it('Declustering with standard box SNDV-5', () => {
    cy.get('div#miniSquare1').should('be.visible').click();
    cy.wait(4000).percySnapshot("declustering_standard_box_estimator_box_page1");
    cy.get('button.MuiButton-root').should('be.visible').click();
    cy.get('img[alt="add"]').should('be.visible').click();
    cy.get('img[alt="add"]').click();
    cy.wait(4000).percySnapshot("declustering_standard_box_estimator_box_page2");
    cy.get('button.MuiButton-root').eq(1).should('be.visible').click();
    cy.wait(5000).percySnapshot("declustering_standard_box_recommended_plan");
    cy.get('button.MuiButton-root').eq(1).should('be.visible').click();
    cy.wait(1000).get('#sndloader').should('not.exist');
    cy.wait(5000).percySnapshot("declustering_standard_box_storages");
  });


  it('Declustering with own box SNDV-6', () => {
    cy.get('div#miniSquare1').should('be.visible').click();
    cy.get('img[alt="inactive"]').should('be.visible').click();
    cy.get('input[type="number"]').eq(0).clear().type('7');
    cy.get('input[type="number"]').eq(1).clear().type('8');
    cy.get('input[type="number"]').eq(2).clear().type('9');
    cy.get('img[alt="inactive"]').should('be.visible').click();
    cy.get('img[alt="inactive"]').should('be.visible').click();
    cy.wait(4000).percySnapshot("declustering_own_box_estimator_box_page1");
    cy.get('button.MuiButton-root').should('be.visible').click();
    cy.get('img[alt="add"]').should('be.visible').click();
    cy.wait(4000).percySnapshot("declustering_own_box_estimator_box_page2");
    cy.get('button.MuiButton-root').eq(1).should('be.visible').click();
    cy.wait(5000).percySnapshot("declustering_own_box_recommended_plan");
    cy.get('button.MuiButton-root').eq(1).should('be.visible').click();
    cy.wait(1000).get('#sndloader').should('not.exist');
    cy.wait(5000).percySnapshot("declustering_own_box_storages");
  });

  it('Estimator boxes animation trigger on mouse-hover', () => {
    cy.get('#miniSquare0').scrollIntoView();
    cy.get('#miniSquare0')
    .invoke('attr', 'style', 'top: 0px; left: 0px; width: 100%; height: 100%; padding: 23px 20px; z-index: 1; position: absolute; background-color: #00A0E3;border-radius: 32px;');
    cy.xpath('//div[@id="miniSquare0"]/div[2]/h4')
    .invoke('attr', 'style', 'color: #FFFFFF;');
    cy.wait(1500).percySnapshot("hover_on_Home_Renovations");
    cy.get('#miniSquare0')
    .invoke('attr', 'style', 'background-color: white;');
    cy.xpath('//div[@id="miniSquare0"]/div[2]/h4')
    .invoke('attr', 'style', 'color: black;');
    cy.wait(1000);
    
    cy.get('#miniSquare1')
    .invoke('attr', 'style', 'top: 0px; left: 0px; width: 100%; height: 100%; padding: 23px 20px; z-index: 1; position: absolute; background-color: #00A0E3;border-radius: 32px;');
    cy.xpath('//div[@id="miniSquare1"]/div[2]/h4')
    .invoke('attr', 'style', 'color: #FFFFFF;');
    cy.wait(1500).percySnapshot("hover_on_Decluttering");
    cy.get('#miniSquare1')
    .invoke('attr', 'style', 'background-color: white;');
    cy.xpath('//div[@id="miniSquare1"]/div[2]/h4')
    .invoke('attr', 'style', 'color: black;');

    cy.wait(1000);
    cy.get('#miniSquare2')
    .invoke('attr', 'style', 'top: 0px; left: 0px; width: 100%; height: 100%; padding: 23px 20px; z-index: 1; position: absolute; background-color: #00A0E3;border-radius: 32px;');
    cy.xpath('//div[@id="miniSquare2"]/div[2]/h4')
    .invoke('attr', 'style', 'color: #FFFFFF;');
    cy.wait(1500).percySnapshot("hover_on_Business_Inventory");
    cy.get('#miniSquare2')
    .invoke('attr', 'style', 'background-color: white;');
    cy.xpath('//div[@id="miniSquare2"]/div[2]/h4')
    .invoke('attr', 'style', 'color: black;');


    cy.wait(1000);
    cy.get('#miniSquare3')
    .invoke('attr', 'style', 'top: 0px; left: 0px; width: 100%; height: 100%; padding: 23px 20px; z-index: 1; position: absolute; background-color: #00A0E3;border-radius: 32px;');
    cy.xpath('//div[@id="miniSquare3"]/div[2]/h4')
    .invoke('attr', 'style', 'color: #FFFFFF;');
    cy.wait(1500).percySnapshot("hover_on_Other_Purposes");
    cy.get('#miniSquare3')
    .invoke('attr', 'style', 'background-color: white;');
    cy.xpath('//div[@id="miniSquare3"]/div[2]/h4')
    .invoke('attr', 'style', 'color: black;');
  });
  
  it('Estimator - Home Rennovations & Other Purposes SNDV-8', () => {
    cy.get('#miniSquare0').scrollIntoView();
    cy.get('#miniSquare0').click();
    cy.wait(6500).percySnapshot("estimator_bedroom");
    cy.get('img[alt="plus"]').click();
    cy.wait(2000).percySnapshot("estimator_bedroom_with_customItem_popup"); 
    cy.get('input[type="text"]').eq(1).type('customItem');
    cy.get('input.MuiOutlinedInput-input').eq(16).type('10');
    cy.get('input.MuiOutlinedInput-input').eq(17).type('11');
    cy.get('input.MuiOutlinedInput-input').eq(18).type('12');
    cy.contains('Add item').click({force: true});
    cy.wait(2000).percySnapshot("estimator_bedroom_with_customItem"); 
    cy.get('div.MuiBox-root>h5').eq(1).click();
    cy.wait(2500).percySnapshot("estimator_Living_room");
    cy.get('div.MuiBox-root>h5').eq(2).click();
    cy.wait(2500).percySnapshot("estimator_Kitchen");
    cy.get('div.MuiBox-root>h5').eq(3).click();
    cy.wait(2500).percySnapshot("estimator_Appliances");
    cy.get('div.MuiBox-root>h5').eq(4).click();
    cy.wait(2500).percySnapshot("estimator_Outdoor");
    cy.get('div.MuiBox-root>h5').eq(5).click();
    cy.wait(2500).percySnapshot("estimator_Sports");
    cy.get('div.MuiBox-root>h5').eq(6).click();
    cy.wait(2500).percySnapshot("estimator_Miscellaneous");
    cy.get('div.MuiBox-root>h5').eq(7).click();
    cy.wait(2500).percySnapshot("estimator_Office");
  });




});


// const sizes = [
//   ['iphone-6', 'landscape'],  alexDgebuadze Test comment
//   'iphone-6',
//   'ipad-2',
//   ['ipad-2', 'landscape'],
//   [1920, 1080],
// ];
// const pages = [
//   'about',
//   'skills',
// ];
// describe('Visual regression tests', () => {
//   sizes.forEach((size) => {
//     pages.forEach((page) => {
//       it(`Should match previous screenshot '${page} Page' When '${size}' resolution`, () => {
//         cy.setResolution(size);
//         cy.visit(`/#${page}`);
//         cy.matchImageSnapshot();
//       });
//     });
//   });
// });