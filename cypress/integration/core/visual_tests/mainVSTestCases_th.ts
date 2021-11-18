import basePage from '../pom/basePage';
import mainPage from '../pom/mainPage';
///<reference types="cypress-iframe" />


describe('Actions', () => {

  beforeEach(() => {
    basePage.start(basePage.stageThURL);
  })

  const mobNumber = "87777777";
  const code = "222222";

  const img = "images/koba.jpg";


  it('check booking (logout) SNDV-1', () => {
    const searchOption = "กรุงเทพฯ";

    cy.wait(5000);
    cy.percySnapshot("mainPage_th");
    cy.get('[placeholder="ค้นหาจากตำแหน่งสถานีรถไฟ  บริเวณ หรือสถานที่ใกล้เคียง"]').should("be.visible");
    cy.get('[placeholder="ค้นหาจากตำแหน่งสถานีรถไฟ  บริเวณ หรือสถานที่ใกล้เคียง"]').click();
    cy.get('[placeholder="ค้นหาจากตำแหน่งสถานีรถไฟ  บริเวณ หรือสถานที่ใกล้เคียง"]').type(searchOption);
    cy.xpath('//div[text() = "' + searchOption + '"]').should('be.visible');
    cy.xpath('//div[text() = "' + searchOption + '"]').click();
    cy.get('.MuiBox-root>img').should('be.visible');
    cy.wait(6000);
    cy.percySnapshot("after_search_th");  
    cy.wait(5000);
    cy.scrollTo(0, 300);
    cy.contains('XXS').click({ force: true });
    cy.get("#viewAllSitesForFeaturedSite1").should('be.visible');
    cy.get("#viewAllSitesForFeaturedSite1").click({ force: true });
    cy.window().its('open').should('be.called')
    let loc = "%E0%B8%81%E0%B8%A3%E0%B8%B8%E0%B8%87%E0%B9%80%E0%B8%97%E0%B8%9E%E0%B8%AF";
    let elem = document.createElement("div");
    elem.innerHTML = loc;
    cy.visit(basePage.stageThURL + 'details/312?location='+ elem.textContent +'&city_id=2&total_results=8&space_id=null');
    cy.contains("JWD Store It! - Ramintra").should("be.visible");

    cy.wait(9000);
    cy.percySnapshot("storage_details_th");
    cy.contains("1.8 sqm").click({ force: true });
    cy.contains("จองตอนนี้").click({ force: true });
    cy.get('input[placeholder="ชื่อ-นามสกุล"]').type("lukatest1");
    cy.get('input[placeholder="ที่อยู่อีเมล"]').type("lukatest@g.com"); 
    cy.get('div.MuiSelect-select.MuiSelect-selectMenu').click();
    cy.wait(3000).get('div.MuiPaper-root.MuiMenu-paper').scrollTo(0,-200);
    cy.get('li[data-value="+65"]').click();
    cy.get('input[type="number"]').type("65123456"); 
    cy.wait(9000);
    cy.percySnapshot("reserve_card_page_th");
    cy.contains("จองยูนิตนี้").click({ force: true });
    cy.wait(3000);
    cy.percySnapshot("insurance_plan_page_th");
    cy.contains("฿50K").click({ force: true });
    cy.contains("ดำเนินการต่อ").click({ force: true });
    cy.wait(8500);

    cy.contains("ดำเนินการต่อ").should('be.visible').click({ force: true });

     cy.contains('ข้อตกลงสิทธิพื้นที่เก็บของให้เช่า').should('be.visible').click();
    cy.wait(3000);
    cy.percySnapshot("self_storage_license_agreement_th");
    cy.get('img[src="/images/close.svg"]').click({force: true});

    cy.get('iframe[title="Secure card payment input frame"]', { timeout: 30000 }).then(iframe => {
      const $doc = iframe.contents();
      cy.wait(3000).wrap( $doc.find("input[name='cardnumber']") ).type('4242 4242 4242 4242');
      cy.wrap( $doc.find("input[name='exp-date']") ).type("07 / 22");
      cy.wrap( $doc.find('input[name="cvc"]') ).type("123");
    })
    cy.contains("ยอมรับ และชำระเงิน").click({ force: true });
    cy.contains("การจองของคุณได้รับการยืนยันแล้ว!").should('be.visible');
    cy.wait(9000);
    cy.percySnapshot("sucessfull_reservation_page_th");
    cy.contains("ดูใบเสร็จรับเงิน").should('be.visible').click({force: true});
    cy.wait(3500);
    cy.percySnapshot("receipt_page_th");
  })

  it('login SNDV-2', () => {
    cy.get('img[alt="burger"]').should('be.visible').click({force: true});
    cy.get('.MuiPaper-root.MuiDrawer-paper').should('be.visible');
    cy.wait(5000).percySnapshot("burger_menu_open_logout_th");
    cy.xpath('//span[text() = "เข้าสู่ระบบ"]').should('be.visible').click();
    cy.wait(6000).percySnapshot("login_email_th");
    cy.get('#viaPhoneNumber').should('be.visible').click({force: true});
    cy.wait(4000).percySnapshot("login_mobile_th");
    cy.get('div.MuiSelect-select.MuiSelect-selectMenu').click();
    cy.wait(3000).get('div.MuiPaper-root.MuiMenu-paper').scrollTo(0,-200);
    cy.get('li[data-value="+65"]').click();
    cy.get('input.MuiInputBase-input').should('be.visible').type(mobNumber);
    cy.contains('การลงชื่อเข้าใช้แสดงว่าฉันยอมรับข้อกำหนดการใช้งานและนโยบายความเป็นส่วนตัว').click({force: true});
    cy.wait(1000).percySnapshot("login_mobile_inputed_number_th");
    cy.get('#loginButton').should('be.visible').click({force: true});
    cy.get('input[type="tel"]').eq(0).type(code[0]);
    cy.get('input[type="tel"]').eq(1).type(code[1]);
    cy.get('input[type="tel"]').eq(2).type(code[2]);
    cy.get('input[type="tel"]').eq(3).type(code[3]);
    cy.get('input[type="tel"]').eq(4).type(code[4]);
    cy.get('input[type="tel"]').eq(5).type(code[5]);
    cy.wait(1000).percySnapshot("login_mobile_inputed_code_th");
    cy.get('button.MuiButtonBase-root.MuiButton-root[type="submit"]').should('be.visible').click();
    cy.wait(5000).get('img[alt="burger"]').should('be.visible').click({force: true});
    cy.get('.MuiPaper-root.MuiDrawer-paper').should('be.visible');
    cy.wait(5000).percySnapshot("burger_menu_open_login_th");
    cy.wait(3000).get('div.MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorLeft').scrollTo(0,300);
    cy.contains('ออกจากระบบ').should('be.visible').click({force: true});
    cy.contains('คุณแน่ใจว่าต้องการออกจากระบบใช่หรือไม่?').should('be.visible');
    cy.wait(5000).percySnapshot("logout_confirmation_popup_th");
    cy.get('button.MuiButtonBase-root.MuiButton-root').eq(2).click();
  });  

  it('Add commercial property Given I navigate on SNDV-3', () => {
    cy.get('img[alt="burger"]').should('be.visible').click({force: true});
    cy.get('.MuiPaper-root.MuiDrawer-paper').should('be.visible');
    cy.xpath('//span[text() = "เข้าสู่ระบบ"]').should('be.visible').click();
    cy.get('#viaPhoneNumber').should('be.visible').click({force: true});
    cy.get('div.MuiSelect-select.MuiSelect-selectMenu').click();
    cy.wait(3000).get('div.MuiPaper-root.MuiMenu-paper').scrollTo(0,-200);
    cy.get('li[data-value="+65"]').click();
    cy.get('input.MuiInputBase-input').should('be.visible').type(mobNumber);
    cy.contains('การลงชื่อเข้าใช้แสดงว่าฉันยอมรับข้อกำหนดการใช้งานและนโยบายความเป็นส่วนตัว').click({force: true});
    cy.get('#loginButton').should('be.visible').click({force: true});
    cy.get('input[type="tel"]').eq(0).type(code[0]);
    cy.get('input[type="tel"]').eq(1).type(code[1]);
    cy.get('input[type="tel"]').eq(2).type(code[2]);
    cy.get('input[type="tel"]').eq(3).type(code[3]);
    cy.get('input[type="tel"]').eq(4).type(code[4]);
    cy.get('input[type="tel"]').eq(5).type(code[5]);
    cy.get('button.MuiButtonBase-root.MuiButton-root[type="submit"]').should('be.visible').click();
    cy.wait(5000).get('img[alt="burger"]').should('be.visible').click({force: true});
    cy.contains('เปลี่ยนเป็นผู้ให้เช่า').should('be.visible').click({force: true});
    cy.wait(5000).percySnapshot("user_reservation_page_th");
    cy.get('#createListingsButton').should('be.visible').click();
    cy.wait(5000).percySnapshot("create_listing_empty_page1_th");
    cy.get('div[aria-haspopup="listbox"]').eq(0).click({force: true});
    cy.contains('เขตการค้า').click({force: true});
    cy.get('div[aria-haspopup="listbox"]').eq(1).click({force: true});
    cy.get('li[data-value="7"]').click({force: true});
    cy.contains('ฉันเป็นผู้ให้เช่าในฐานะเจ้าของธุรกิจจดทะเบียน').should('be.visible').click({force: true});
    cy.wait(500).percySnapshot("create_listing_filled_page1_th");
    cy.get('button[type="submit"]').click();
    cy.wait(5000).percySnapshot("create_listing_empty_page2_th");
    cy.get('div[aria-haspopup="listbox"]').eq(0).click({force: true});
    cy.contains('Singapore').click({force: true});
    cy.wait(500).get('div[aria-haspopup="listbox"]').eq(1).click({force: true});
    cy.wait(500).get('li[data-value="1"]').click({force: true});
    cy.get('div[aria-haspopup="listbox"]').eq(2).click({force: true});
    cy.wait(2000).get('div.MuiPaper-rounded').scrollTo(0,1300);
    cy.contains('Geylang').click({force: true});
    cy.get('input[placeholder="ค้นหาที่ตั้ง"]').type("Geylang, Singapore");
    cy.xpath('//li[text() = "Geylang, Singapore"]').click({force: true});
    cy.get('input[type="tel"]').eq(0).type("3");
    cy.get('input[type="tel"]').eq(1).type("123777");
    cy.wait(500).percySnapshot("create_listing_filled_page2_th");
    cy.get('button[type="submit"]').click();
    cy.wait(5000).percySnapshot("create_listing_page3_th");
    cy.get('button[type="submit"]').click();
    cy.wait(5000).percySnapshot("create_listing_empty_page4_th");
    cy.get('input[type="checkbox"]').click( { multiple: true } );
    cy.wait(1000).percySnapshot("create_listing_filled_page4_th");
    cy.get('button[type="submit"]').click();
    cy.wait(5000).percySnapshot("create_listing_empty_page5_th");
    cy.get('input[accept="image/*"]').attachFile(img);
    cy.wait(500).percySnapshot("create_listing_filled_page5_th");
    cy.get('button[type="submit"]').click();
    cy.wait(5000).percySnapshot("create_listing_empty_page6_th");
    cy.get('input[type="text"]').type('Penthouse');
    cy.wait(500).percySnapshot("create_listing_filled_page6_th");
    cy.get('button[type="submit"]').click();
    cy.wait(5000).percySnapshot("create_listing_empty_page7_th");
    cy.get('div>textarea').eq(0).type('description');
    cy.wait(500).percySnapshot("create_listing_filled_page7_th");
    cy.get('button[type="submit"]').click();
    cy.wait(5000).percySnapshot("create_listing_empty_page8_th");
    cy.get('input[type="text"]').eq(3).type('5');
    cy.get('input[type="text"]').eq(4).type('1002');
    cy.get('input[type="checkbox"]').click( { multiple: true } );
    cy.wait(500).percySnapshot("create_listing_filled_page8_th");
    cy.contains('เพิ่มตัวเลือกขนาด').click();
    cy.wait(5000).percySnapshot("create_listing__size_option_empty_page8_th");
    cy.get('input[placeholder="ชื่อตัวเลือกหรือตัวระบุ"]').type('name');
    cy.get('input[type="text"]').eq(5).type('2000');
    cy.get('span.MuiButtonBase-root.MuiIconButton-root').eq(0).click();
    cy.wait(5000).percySnapshot("create_listing__size_option_filled_page8_th");
    cy.get('button[type="submit"]').eq(0).click();
    cy.wait(3000).percySnapshot("create_listing__size_updated_page_page8_th");
    cy.get('button[type="submit"]').eq(2).click();
    cy.wait(5000).percySnapshot("create_listing_page9_th");
    cy.contains('เผยแพร่').click();
    cy.contains('Penthouse').eq(0).should('be.visible');
    //feature improvment cover last page
  });  

  it('I Achieve Business Inventory with standart box SNDV-4', () => {
    cy.contains('คลังเก็บสินค้าธุรกิจ').should('be.visible').click();
    cy.wait(5000).percySnapshot("estimator_box_page1_th");
    cy.get('button[type="button"]').eq(1).should('be.visible').click();
    cy.get('img[alt="add"]').should('be.visible').click();
    cy.get('img[alt="add"]').click();
    cy.wait(5000).percySnapshot("estimator_box_page2_th");
    cy.get('button.textWhite.btnEstimate').should('be.visible').click();
    cy.wait(8500).percySnapshot("estimator_box_page3_th");
    cy.get('button.textWhite.btnFindStorage').should('be.visible').click();
    cy.wait(1000).get('#sndloader').should('not.exist');
    cy.wait(8500).percySnapshot("find_storage_page_th");
  });


  it('Declustering with standard box SNDV-5', () => {
    cy.get('div#miniSquare1').should('be.visible').click();
    cy.wait(4000).percySnapshot("declustering_standard_box_estimator_box_page1_th");
    cy.get('button.MuiButton-root').should('be.visible').click();
    cy.get('img[alt="add"]').should('be.visible').click();
    cy.get('img[alt="add"]').click();
    cy.wait(4000).percySnapshot("declustering_standard_box_estimator_box_page2_th");
    cy.get('button.MuiButton-root').eq(1).should('be.visible').click();
    cy.wait(5000).percySnapshot("declustering_standard_box_recommended_plan_th");
    cy.get('button.MuiButton-root').eq(1).should('be.visible').click();
    cy.wait(1000).get('#sndloader').should('not.exist');
    cy.wait(5000).percySnapshot("declustering_standard_box_storages_th");
  });

  it('Declustering with own box SNDV-6', () => {
    cy.get('div#miniSquare1').should('be.visible').click();
    cy.get('img[alt="inactive"]').should('be.visible').click();
    cy.get('input[type="number"]').eq(0).clear().type('7');
    cy.get('input[type="number"]').eq(1).clear().type('8');
    cy.get('input[type="number"]').eq(2).clear().type('9');
    cy.get('img[alt="inactive"]').should('be.visible').click();
    cy.get('img[alt="inactive"]').should('be.visible').click();
    cy.wait(4000).percySnapshot("declustering_own_box_estimator_box_page1_th");
    cy.get('button.MuiButton-root').should('be.visible').click();
    cy.get('img[alt="add"]').should('be.visible').click();
    cy.wait(4000).percySnapshot("declustering_own_box_estimator_box_page2_th");
    cy.get('button.MuiButton-root').eq(1).should('be.visible').click();
    cy.wait(5000).percySnapshot("declustering_own_box_recommended_plan_th");
    cy.get('button.MuiButton-root').eq(1).should('be.visible').click();
    cy.wait(1000).get('#sndloader').should('not.exist');
    cy.wait(5000).percySnapshot("declustering_own_box_storages_th");
  });

  it('Estimator boxes animation trigger on mouse-hover SNDV-7', () => {
    cy.get('#miniSquare0').scrollIntoView();
    cy.get('#miniSquare0')
    .invoke('attr', 'style', 'top: 0px; left: 0px; width: 100%; height: 100%; padding: 23px 20px; z-index: 1; position: absolute; background-color: #00A0E3;border-radius: 32px;');
    cy.xpath('//div[@id="miniSquare0"]/div[2]/h4')
    .invoke('attr', 'style', 'color: #FFFFFF;');
    cy.wait(1500).percySnapshot("hover_on_Home_Renovations_th");
    cy.get('#miniSquare0')
    .invoke('attr', 'style', 'background-color: white;');
    cy.xpath('//div[@id="miniSquare0"]/div[2]/h4')
    .invoke('attr', 'style', 'color: black;');
    cy.wait(1000);
    
    cy.get('#miniSquare1')
    .invoke('attr', 'style', 'top: 0px; left: 0px; width: 100%; height: 100%; padding: 23px 20px; z-index: 1; position: absolute; background-color: #00A0E3;border-radius: 32px;');
    cy.xpath('//div[@id="miniSquare1"]/div[2]/h4')
    .invoke('attr', 'style', 'color: #FFFFFF;');
    cy.wait(1500).percySnapshot("hover_on_Decluttering_th");
    cy.get('#miniSquare1')
    .invoke('attr', 'style', 'background-color: white;');
    cy.xpath('//div[@id="miniSquare1"]/div[2]/h4')
    .invoke('attr', 'style', 'color: black;');

    cy.wait(1000);
    cy.get('#miniSquare2')
    .invoke('attr', 'style', 'top: 0px; left: 0px; width: 100%; height: 100%; padding: 23px 20px; z-index: 1; position: absolute; background-color: #00A0E3;border-radius: 32px;');
    cy.xpath('//div[@id="miniSquare2"]/div[2]/h4')
    .invoke('attr', 'style', 'color: #FFFFFF;');
    cy.wait(1500).percySnapshot("hover_on_Business_Inventory_th");
    cy.get('#miniSquare2')
    .invoke('attr', 'style', 'background-color: white;');
    cy.xpath('//div[@id="miniSquare2"]/div[2]/h4')
    .invoke('attr', 'style', 'color: black;');


    cy.wait(1000);
    cy.get('#miniSquare3')
    .invoke('attr', 'style', 'top: 0px; left: 0px; width: 100%; height: 100%; padding: 23px 20px; z-index: 1; position: absolute; background-color: #00A0E3;border-radius: 32px;');
    cy.xpath('//div[@id="miniSquare3"]/div[2]/h4')
    .invoke('attr', 'style', 'color: #FFFFFF;');
    cy.wait(1500).percySnapshot("hover_on_Other_Purposes_th");
    cy.get('#miniSquare3')
    .invoke('attr', 'style', 'background-color: white;');
    cy.xpath('//div[@id="miniSquare3"]/div[2]/h4')
    .invoke('attr', 'style', 'color: black;');
  });
  
  it('Estimator - Home Rennovations & Other Purposes SNDV-8', () => {
    cy.get('#miniSquare0').scrollIntoView();
    cy.get('#miniSquare0').click();
    cy.wait(6500).percySnapshot("estimator_bedroom_th");
    cy.get('img[alt="plus"]').click();
    cy.wait(2000).percySnapshot("estimator_bedroom_with_customItem_popup_th"); 
    cy.get('input[type="text"]').eq(1).type('customItem');
    cy.get('input.MuiOutlinedInput-input').eq(16).type('10');
    cy.get('input.MuiOutlinedInput-input').eq(17).type('11');
    cy.get('input.MuiOutlinedInput-input').eq(18).type('12');
    cy.xpath('//span[text() = "เพิ่มรายการ"]').click({force: true});
    cy.wait(2000).percySnapshot("estimator_bedroom_with_customItem_th"); 
    cy.get('div.MuiBox-root>h5').eq(1).click();
    cy.wait(2500).percySnapshot("estimator_Living_room_th");
    cy.get('div.MuiBox-root>h5').eq(2).click();
    cy.wait(2500).percySnapshot("estimator_Kitchen_th");
    cy.get('div.MuiBox-root>h5').eq(3).click();
    cy.wait(2500).percySnapshot("estimator_Appliances_th");
    cy.get('div.MuiBox-root>h5').eq(4).click();
    cy.wait(2500).percySnapshot("estimator_Outdoor_th");
    cy.get('div.MuiBox-root>h5').eq(5).click();
    cy.wait(2500).percySnapshot("estimator_Sports_th");
    cy.get('div.MuiBox-root>h5').eq(6).click();
    cy.wait(2500).percySnapshot("estimator_Miscellaneous_th");
    cy.get('div.MuiBox-root>h5').eq(7).click();
    cy.wait(2500).percySnapshot("estimator_Office_th");
  });

});