import { LCARS } from './LCARS';
import { LCARSCorner, LCARSText, LCARSRectangle, LCARSButton, LCARSTextArea, LCARSKeypad, LCARSClock, LCARSCalendar, LCARSIcon } from './LCARSComponents';

class LCARSScreen {
    
    constructor(id, title, width, height, properties) {
        this.id = id;
        this.title = title;
        this.subtitle = "";
        this.width = width;
        this.height = height;
        this.properties = properties;
        
        if(this.properties == undefined) {
            this.properties = LCARS.EF_TITLE | LCARS.EC_ORANGE | LCARS.ES_LABEL_E;
        }
        
        this.fontSize = LCARS.getLCARSFontSize(this.properties);
        
        document.body.style.MozUserSelect='none';
        document.body.style.WebkitUserSelect='none';
        
        this.element = document.createElementNS(LCARS.svgNS, "svg");
        
        this.element.setAttribute("id", this.id);
        this.element.setAttribute("width", this.width);
        this.element.setAttribute("height", this.height);
    }
    
    
    drawScreen() {
        
    }
    
    
    drawHeader() {
        
        this.CAP_WIDTH = this.fontSize * 0.6;
        this.headerThickness = this.fontSize*0.9;
        
        this.titleElement = new LCARSText("screen_title", this.title, this.width - (this.CAP_WIDTH + this.RIGHT + LCARS.LCARS_SPACE), this.fontSize-2, this.properties);
        this.addComponent(this.titleElement);
        
        var textWidth1 = LCARS.getTextWidth(this.title, Math.round(this.fontSize*1.0) + "pt " + LCARS.getFont());
        var textWidth2 = LCARS.getTextWidth2(this.title, Math.round(this.fontSize*1.0) + "pt " + LCARS.getFont());
        var textWidth3 = LCARS.getTextWidth3(this.title, this.fontSize);
        //console.log("TextWidth-1 textWidth1: " + textWidth1);
        //console.log("TextWidth-2 textWidth2: " + textWidth2);
        //console.log("TextWidth-3 textWidth3: " + textWidth3);
        var textWidth = textWidth3;
        
        
        /**
         * Create the title bar with end caps.
         */
        this.hb_end_cap_w = new LCARSRectangle("hb_end_cap_w", "",
                                               this.LEFT,
                                               this.TOP,
                                               this.CAP_WIDTH,
                                               this.headerThickness,
                                               LCARS.ES_RECT_RND_W | this.properties);
        this.addComponent(this.hb_end_cap_w);
        
        this.rect_title_bar = new LCARSRectangle("rect_title_bar", "",
                                                 this.LEFT + this.CAP_WIDTH + LCARS.LCARS_SPACE,
                                                 this.TOP,
                                                 this.width - (3 * LCARS.LCARS_SPACE) - (2 * this.CAP_WIDTH) - this.LEFT - this.RIGHT - textWidth,
                                                 this.headerThickness,
                                                 this.properties);
        this.addComponent(this.rect_title_bar);
        
        this.hb_end_cap_e = new LCARSRectangle("hb_end_cap_e", "",
                                               this.width - (this.CAP_WIDTH + this.RIGHT),
                                               this.TOP,
                                               this.CAP_WIDTH,
                                               this.headerThickness,
                                               LCARS.ES_RECT_RND_E | this.properties);
        this.addComponent(this.hb_end_cap_e);
    }
    
    
    drawFooter() {
        
        this.CAP_WIDTH = this.fontSize * 0.6;
        this.footerThickness = this.fontSize*0.9;
        
        /**
         * Create the title bar with end caps.
         */
        this.fb_end_cap_w = new LCARSRectangle("fb_end_cap_w", "",
                                               this.LEFT,
                                               this.height - this.footerThickness - this.BOTTOM,
                                               this.CAP_WIDTH,
                                               this.footerThickness,
                                               LCARS.ES_RECT_RND_W | this.properties);
        this.addComponent(this.fb_end_cap_w);
        
        this.rect_footr_bar = new LCARSRectangle("rect_footr_bar", "",
                                                 this.LEFT + this.CAP_WIDTH + LCARS.LCARS_SPACE,
                                                 this.height - this.footerThickness - this.BOTTOM,
                                                 this.width - (2 * LCARS.LCARS_SPACE) - (2 * this.CAP_WIDTH) - this.LEFT - this.RIGHT,
                                                 this.footerThickness,
                                                 this.properties);
        this.addComponent(this.rect_footr_bar);
        
        this.fb_end_cap_e = new LCARSRectangle("fb_end_cap_e", "",
                                               this.width - (this.CAP_WIDTH + this.RIGHT),
                                               this.height - this.footerThickness - this.BOTTOM,
                                               this.CAP_WIDTH,
                                               this.footerThickness,
                                               LCARS.ES_RECT_RND_E | this.properties);
        this.addComponent(this.fb_end_cap_e);
    }
    
    
    setViewBox(vb_x, vb_y, vb_width, vb_height) {
        this.vb_x = vb_x;
        this.vb_y = vb_y;
        this.vb_width = vb_width;
        this.vb_height = vb_height;
        
        this.element.setAttribute("width", '100%');
        this.element.setAttribute("height", '100%');
        
        this.element.setAttribute("viewBox", this.vb_x + " " + this.vb_y + " " + this.vb_width + " " + this.vb_height);
    }
    
    
    setTransform(transform) {
        this.element.style.webkitTransform =  transform;
    }
    
    
    addComponent(component) {
        this.element.appendChild(component.element);
    }
  
}




/**
 * Blank Screen - No header or footer
 */
export class LCARSBlankScreen extends LCARSScreen {
    
    constructor(id, title, width, height, properties) {
        super(id, title, width, height, properties);
        
        this.LEFT = 10;
        this.TOP = 5;
        this.RIGHT  = 10;
        this.BOTTOM = 15;
        
        
        this.drawScreen();
        
    }
    
}



/**
 * Basic Screen - Includes a header, including the screen title, and a footer.
 */
export class LCARSBasicScreen extends LCARSScreen {
    
    constructor(id, title, width, height, properties) {
        super(id, title, width, height, properties);
        
        this.LEFT = 10;
        this.TOP = 5;
        this.RIGHT  = 10;
        this.BOTTOM = 15;
        
        
        this.drawScreen();
        
        this.drawHeader();
        
        this.drawFooter();
    }
    
}
