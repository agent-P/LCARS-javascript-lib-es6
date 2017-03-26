import { LCARS } from './LCARS';
import { ICONS } from './ICONS';
import { LCARSComponent } from './LCARSComponent';


/**
 *
 */
export class LCARSEllipsisSpinner extends LCARSComponent {
    
    constructor(id, x, y, properties) {
        super(id, "", x, y, properties);
        
        this.animated = false;
        
        this.radius = this.fontSize/10;
        
        /* Create the DOM object for the first period shape animation, and set its attributes. */
        this.animateElement1 = document.createElementNS(LCARS.svgNS, "animate");
        this.animateElement1.setAttribute("id", this.element.id + "_shape_1_Animate");
        this.animateElement1.setAttribute("attributeType", "XML");
        this.animateElement1.setAttribute("attributeName", "opacity");
        this.animateElement1.setAttribute("repeatCount", "indefinite");
        this.animateElement1.setAttribute("dur", "1s");
        this.animateElement1.setAttribute("values", "0;1;0");
        this.animateElement1.setAttribute("begin", "0.1");
        
        /* Create the DOM object for the second period shape animation, and set its attributes. */
        this.animateElement2 = document.createElementNS(LCARS.svgNS, "animate");
        this.animateElement2.setAttribute("id", this.element.id + "_shape_2_Animate");
        this.animateElement2.setAttribute("attributeType", "XML");
        this.animateElement2.setAttribute("attributeName", "opacity");
        this.animateElement2.setAttribute("repeatCount", "indefinite");
        this.animateElement2.setAttribute("dur", "1s");
        this.animateElement2.setAttribute("values", "0;1;0");
        this.animateElement2.setAttribute("begin", "0.2");
        
        /* Create the DOM object for the third period shape animation, and set its attributes. */
        this.animateElement3 = document.createElementNS(LCARS.svgNS, "animate");
        this.animateElement3.setAttribute("id", this.element.id + "_shape_3_Animate");
        this.animateElement3.setAttribute("attributeType", "XML");
        this.animateElement3.setAttribute("attributeName", "opacity");
        this.animateElement3.setAttribute("repeatCount", "indefinite");
        this.animateElement3.setAttribute("dur", "1s");
        this.animateElement3.setAttribute("values", "0;1;0");
        this.animateElement3.setAttribute("begin", "0.3");
        
        this.drawShape();
        
        this.start();
    }
    
    drawShape() {
        this.shapeElement1 = document.createElementNS(LCARS.svgNS, "circle");
        this.shapeElement1.setAttributeNS(null, "cx", this.radius);
        this.shapeElement1.setAttributeNS(null, "cy", 0);
        this.shapeElement1.setAttributeNS(null, "r",  this.radius);
        this.shapeElement1.setAttributeNS(null, "fill", this.color);
        this.shapeElement1.setAttributeNS(null, "stroke", "none");
        
        this.shapeElement2 = document.createElementNS(LCARS.svgNS, "circle");
        this.shapeElement2.setAttributeNS(null, "cx", this.radius + this.radius*3.33);
        this.shapeElement2.setAttributeNS(null, "cy", 0);
        this.shapeElement2.setAttributeNS(null, "r",  this.radius);
        this.shapeElement2.setAttributeNS(null, "fill", this.color);
        this.shapeElement2.setAttributeNS(null, "stroke", "none");
        
        this.shapeElement3 = document.createElementNS(LCARS.svgNS, "circle");
        this.shapeElement3.setAttributeNS(null, "cx", this.radius + this.radius*3.33*2);
        this.shapeElement3.setAttributeNS(null, "cy", 0);
        this.shapeElement3.setAttributeNS(null, "r",  this.radius);
        this.shapeElement3.setAttributeNS(null, "fill", this.color);
        this.shapeElement3.setAttributeNS(null, "stroke", "none");
        
        this.element.appendChild(this.shapeElement1);
        this.element.appendChild(this.shapeElement2);
        this.element.appendChild(this.shapeElement3);
        
    }
    
    
    start() {
        if(this.animated == false) {
            this.shapeElement1.appendChild(this.animateElement1);
            this.shapeElement2.appendChild(this.animateElement2);
            this.shapeElement3.appendChild(this.animateElement3);
            
            this.animated = true;
        }
    }
    
    stop() {
        if(this.animated == true) {
            if(this.animateElement1 != null) {
                this.animateElement1.remove();
            }
            if(this.animateElement2 != null) {
                this.animateElement2.remove();
            }
            if(this.animateElement3 != null) {
                this.animateElement3.remove();
            }
            
            this.animated = false;
        }
    }
}
