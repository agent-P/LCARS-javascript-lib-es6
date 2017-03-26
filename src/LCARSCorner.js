import { LCARS } from './LCARS';
import { ICONS } from './ICONS';
import { LCARSComponent } from './LCARSComponent';


/**
 * LCARSCorner component
 */
export class LCARSCorner extends LCARSComponent {
    
    constructor(name, label, x, y, width, height, properties) {
        super(name, label, x, y, properties);
        this.width = width;
        this.height = LCARS.LCARS_CORNER_HEIGHT + (((height-1)<0)?0:(height-1))*LCARS.LCARS_BTN_HEIGHT + (((height-1)<0)?0:(height-1))*LCARS.LCARS_BTN_SPACING;
        this.shape = properties & LCARS.ES_SHAPE;
        
        if((this.properties & LCARS.ES_FONT) == LCARS.EF_NORMAL) {
            this.fontSize = LCARS.FONT_BUTTON_SIZE; // the default font for corner components
        }
        this.drawShape();
        this.drawText();
        
    }
    
    
    drawShape() {
        var pathString = "M0,0";
        var armStringW = (this.width-185) + ",0 l0,30 l-" + (this.width-185);
        var armStringE = (this.width-185) + ",0 l0,-30 l" + (this.width-185);
        var sideStringT = " l0," + (this.height - LCARS.LCARS_CORNER_HEIGHT) + " l-150,0 l0,-" + (this.height - LCARS.LCARS_CORNER_HEIGHT);
        var sideStringB = " l0,-" + (this.height - LCARS.LCARS_CORNER_HEIGHT) + " l150,0 l0," + (this.height - LCARS.LCARS_CORNER_HEIGHT);
        
        if(this.shape == LCARS.ES_SHAPE_NW) {
            pathString += " m150," + LCARS.LCARS_CORNER_HEIGHT +
            sideStringT + " l0,-17 q0,-75 75,-75 l110,0 l" +
            armStringW +
            ",0 q-35,0 -35,35 l0,27";
        }
        else if(this.shape == LCARS.ES_SHAPE_SW) {
            pathString += " m0," + (this.height - LCARS.LCARS_CORNER_HEIGHT) +
            sideStringB + "l0,27 q0,35 35,35 l" +
            armStringW +
            ",0 l-110,0 q-75,0 -75,-75 l0,-17";
        }
        else if(this.shape == LCARS.ES_SHAPE_SE) {
            pathString += " m" + (this.width-150) + "," + (this.height - LCARS.LCARS_CORNER_HEIGHT) +
            sideStringB + " l0,17 q0,75 -75,75 l-110,0 l-" +
            armStringE + ",0 q35,0 35,-35 l0,-27";
        }
        else if(this.shape == LCARS.ES_SHAPE_NE) {
            pathString += " m" + (this.width-185) + ",0 l110,0 q75,0 75,75 l0,17" +
            sideStringT + " l0,-27 q0,-35 -35,-35 l-" +
            armStringE + ",0";
        }
        
        this.shapeElement.setAttribute("d", pathString);
        this.setShapeAttributes();
        
        this.element.appendChild(this.shapeElement);
    }
    
    
    getTextX() {
        var x;
        
        switch(this.properties & LCARS.ES_SHAPE) {
            case LCARS.ES_SHAPE_SE:
                x = this.width - 140;
                break;
            case LCARS.ES_SHAPE_SW:
                x = 140;
                break;
            case LCARS.ES_SHAPE_NW:
                x = 140;
                break;
            case LCARS.ES_SHAPE_NE:
                x = this.width - 140;
                break;
        }
        
        return x;
    }
    
    
    getTextY() {
        var y;
        
        switch(this.properties & LCARS.ES_SHAPE) {
            case LCARS.ES_SHAPE_SE:
                y = this.fontSize;
                break;
            case LCARS.ES_SHAPE_SW:
                y = this.fontSize;
                break;
            case LCARS.ES_SHAPE_NW:
                y = this.height - 10;
                break;
            case LCARS.ES_SHAPE_NE:
                y = this.height - 10;
                break;
        }
        
        return y;
    }
    
    
    getTextAnchor() {
        switch(this.properties & LCARS.ES_SHAPE) {
            case LCARS.ES_SHAPE_SE:
                this.textAnchor = "start";
                break;
            case LCARS.ES_SHAPE_SW:
                this.textAnchor = "end";
                break;
            case LCARS.ES_SHAPE_NW:
                this.textAnchor = "end";
                break;
            case LCARS.ES_SHAPE_NE:
                this.textAnchor = "start";
                break;
        }
        
        return this.textAnchor;
    }
    
    
    drawText() {
        
        if(this.label != "" && this.label != null) {
            this.setTextAttributes();
            this.setText(this.label);
            
            this.element.appendChild(this.textElement);
        }
    }
    
}


