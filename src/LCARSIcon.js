import { LCARS } from './LCARS';
import { ICONS } from './ICONS';
import { LCARSComponent } from './LCARSComponent';


/**
 * LCARS Icon component
 */
export class LCARSIcon extends LCARSComponent {
    
    constructor(name, x, y, properties, svgString) {
        super(name, "", x, y, properties | LCARS.ES_STATIC);
        
        this.svgString = svgString;
        
        this.drawShape();
    }
    
    
    drawShape() {
        this.shapeElement.setAttribute("d", this.svgString);
        this.shapeElement.setAttribute("transform", "scale(2.0)");
        this.setShapeAttributes();
        
        this.element.appendChild(this.shapeElement);
    }
    
    setShapeAttributes () {
        this.shapeElement.setAttribute("id", this.id + LCARS.SHAPE_SUFFIX);
        this.shapeElement.setAttribute("fill", this.color);
        if(this.properties & LCARS.ES_DISABLED) {
            this.shapeElement.setAttribute("fill-opacity", '0.4');
        }
        else {
            this.shapeElement.setAttribute("fill-opacity", '1.0');
        }
    }
    
    setIcon(svgString, color) {
        if(color != null || color != undefined) {
            this.color = LCARS.getColor(color);
        }
        this.svgString = svgString;
        this.shapeElement.setAttribute("d", this.svgString);
        this.shapeElement.setAttribute("transform", "scale(2.0)");
        this.setShapeAttributes();
    }
    
    
    setEnabled(enable) {
        if(enable) {
            this.shapeElement.setAttribute("fill-opacity", '1.0');
        }
        else {
            this.shapeElement.setAttribute("fill-opacity", '0.4');
        }
    }
    
    scale(scaleFactor) {
        this.shapeElement.setAttribute("transform", "scale(" + scaleFactor + ")");
    }
    
}


