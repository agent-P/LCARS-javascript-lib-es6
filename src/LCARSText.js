import { LCARS } from './LCARS';
import { ICONS } from './ICONS';
import { LCARSComponent } from './LCARSComponent';


/**
 * LCARS Text component
 */
export class LCARSText extends LCARSComponent {
    constructor(name, label, x, y, properties) {
        super(name, label, x, y, properties);
        this.static = LCARS.ES_STATIC;  // Text is always static.
        this.textColor = this.getColor();
        
        this.drawText();
        
        if(this.blinking) {
            this.setBlinking(true);
        }
    }
    
    
    getTextAnchor() {
        if((this.properties & LCARS.ES_LABEL) == 0) {
            this.properties |= LCARS.ES_LABEL_W;
        }
        
        return super.getTextAnchor();
    }
    
    
    drawShape() {
        return "";
    }
    
    
    getTextX() {
        return 0;
    }
    
    
    getTextY() {
        return 0;
    }
    
    
    setBlinking(enabled, color, duration) {
        /** If the duration argument is null, set a default blink duration. */
        if(duration == null) {
            duration = LCARS.BLINK_DURATION_WARNING;
        }
        
        /** If blinking is enabled... */
        if(enabled) {
            /** Create the DOM object for the shape's text animation, and set its attributes. */
            this.textAnimateElement = document.createElementNS(LCARS.svgNS, "animate");
            this.textAnimateElement.setAttribute("attributeType", "XML");
            this.textAnimateElement.setAttribute("attributeName", "fill");
            this.textAnimateElement.setAttribute("values", this.getBlinkColors(color));
            this.textAnimateElement.setAttribute("dur", duration);
            this.textAnimateElement.setAttribute("repeatCount", "indefinite");
            /** Append the animation element to the text element. */
            this.textElement.appendChild(this.textAnimateElement);
            
            
        }
        /** Else if blinking is not enabled... */
        else {
            /** If the text animate element exists, remove it. */
            if(this.textAnimateElement != null) {
                this.textElement.removeChild(this.textAnimateElement);
            }
        }
    }
    
}




