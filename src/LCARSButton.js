import { LCARS } from './LCARS';
import { ICONS } from './ICONS';
import { LCARSComponent } from './LCARSComponent';


/**
 * LCARS Button component
 */
export class LCARSButton extends LCARSComponent {
    
    constructor(name, label, x, y, height, properties, auxLabel, auxLabelProperties) {
        super(name, label, x, y, properties);
        this.auxLabel = auxLabel;
        this.auxLabelProperties = auxLabelProperties;
        
        this.width = LCARS.LCARS_BTN_WIDTH;
        
        if((properties & LCARS.ES_RECT_RND) == 0) {
            this.height = height*LCARS.LCARS_BTN_HEIGHT + (height-1)*LCARS.LCARS_BTN_SPACING;
        }
        else {
            this.height = LCARS.LCARS_BTN_HEIGHT;
        }
        
        if((this.properties & LCARS.ES_FONT) == LCARS.EF_NORMAL) {
            this.fontSize = LCARS.FONT_BUTTON_SIZE; // the default font for button components
        }
        
        this.drawShape();
        this.drawText();
        
        if(this.auxLabel != "" && this.auxLabel != undefined) {
            this.drawAuxText();
        }
    }
    
    
    setAuxText(textString) {
        this.auxTextElement.textContent = textString;
    }
    
    
    drawAuxText () {
        this.auxTextElement = document.createElementNS(LCARS.svgNS, "text");
        this.auxTextElement.setAttribute("id", this.id + LCARS.AUX_TEXT_SUFFIX);
        this.auxTextElement.setAttribute("x", this.getAuxTextX());
        this.auxTextElement.setAttribute("y", this.getAuxTextY());
        this.auxTextElement.setAttribute("text-anchor", this.getAuxTextAnchor());
        if(this.properties & LCARS.ES_DISABLED) {
            this.auxTextElement.setAttribute("fill", '#585858');
        }
        else {
            this.auxTextElement.setAttribute("fill", LCARS.getColor(this.auxLabelProperties & LCARS.ES_COLOR));
        }
        this.auxTextElement.setAttribute("font-family", LCARS.getFont());
        this.auxTextElement.setAttribute("font-size", this.getAuxLabelFontSize());
        this.auxTextElement.setAttribute("pointer-events", "none");
        
        this.setAuxText(this.auxLabel);
        
        this.element.appendChild(this.auxTextElement);
    }
    
    
    getAuxTextX() {
        var x = 0;
        
        switch(this.auxLabelProperties & LCARS.ES_LABEL) {
            case LCARS.ES_LABEL_C:
            case LCARS.ES_LABEL_S:
            case LCARS.ES_LABEL_N:
                x = this.width/2;
                break;
            case LCARS.ES_LABEL_SW:
            case LCARS.ES_LABEL_W:
            case LCARS.ES_LABEL_NW:
                x = LCARS.TEXT_X_INSET;
                break;
            case LCARS.ES_LABEL_NE:
            case LCARS.ES_LABEL_E:
            case LCARS.ES_LABEL_SE:
            default:
                x = this.width - LCARS.TEXT_X_INSET;
                break;
        }
        
        return x;
    }
    
    
    getAuxTextY() {
        var y = 0;
        
        switch(this.auxLabelProperties & LCARS.ES_LABEL) {
            case LCARS.ES_LABEL_C:
            case LCARS.ES_LABEL_W:
            case LCARS.ES_LABEL_E:
                y = this.height/2 + LCARS.FONT_BUTTON_SIZE/2;
                break;
            case LCARS.ES_LABEL_NW:
            case LCARS.ES_LABEL_N:
            case LCARS.ES_LABEL_NE:
                y = LCARS.FONT_BUTTON_SIZE;
                break;
            case LCARS.ES_LABEL_S:
            case LCARS.ES_LABEL_SW:
            case LCARS.ES_LABEL_SE:
            default:
                y = this.height - LCARS.TEXT_Y_INSET;
                break;
        }
        
        return y;
    }
    
    
    getAuxTextAnchor() {
        var textAnchor = "";
        
        switch(this.auxLabelProperties & LCARS.ES_LABEL) {
            case LCARS.ES_LABEL_C:
            case LCARS.ES_LABEL_S:
            case LCARS.ES_LABEL_N:
                textAnchor = "middle";
                break;
            case LCARS.ES_LABEL_SW:
            case LCARS.ES_LABEL_W:
            case LCARS.ES_LABEL_NW:
                textAnchor = "start";
                break;
            case LCARS.ES_LABEL_NE:
            case LCARS.ES_LABEL_E:
            case LCARS.ES_LABEL_SE:
            default:
                textAnchor = "end";
                break;
        }
        
        return textAnchor;
    }
    
    
    getAuxLabelFontSize() {
        switch(this.auxLabelProperties & LCARS.ES_FONT) {
            case LCARS.EF_TITLE:
                return LCARS.FONT_TITLE_SIZE;
            case LCARS.EF_SUBTITLE:
                return LCARS.FONT_SUBTITLE_SIZE;
            case LCARS.EF_BUTTON:
                return LCARS.FONT_BUTTON_SIZE;
            case LCARS.EF_TINY:
                return LCARS.FONT_TINY_SIZE
            case LCARS.EF_BODY:
            default:
                return LCARS.FONT_BODY_SIZE;
        }
    }
    
}



