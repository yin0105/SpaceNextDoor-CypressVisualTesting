class basePage {

    static readonly testURL = "";
    static readonly stageURL = "https://stag.spacenextdoor.com/";
    static readonly prodURL = "https://spacenextdoor.com/";
    static readonly stageThURL = "https://stag.spacenextdoor.co.th/";

    public static start(URL:string){
        cy.visit(URL, {
            onBeforeLoad(win) {
              cy.stub(win, 'open')
            }
        });
    }
    public static startMob(URL:string, option){
        cy.visit(URL);
        cy.viewport(option);
    }

    


    public authorization() {
        return true;
    }





} 
export default basePage;