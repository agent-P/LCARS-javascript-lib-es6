import { LCARS } from './LCARS';
import { ICONS } from './ICONS';
import { LCARSComponent } from './LCARSComponent';


/**
 * LCARS Rctangle component
 */
export class LCARSRectangle extends LCARSComponent {
    constructor(name, label, x, y, width, height, properties) {
        super(name, label, x, y, properties | LCARS.ES_STATIC);  // Rectangles are always static.
        this.width = width;
        this.height = height;
        
        this.drawShape();
        this.drawText();
    }
}

