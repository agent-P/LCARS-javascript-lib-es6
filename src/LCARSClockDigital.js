import { LCARS } from './LCARS';
import { ICONS } from './ICONS';
import { LCARSComponent } from './LCARSComponent';
import { LCARSClock } from './LCARSClock';

/**
 * LCARS Analog Clock component
 */
export class LCARSClockDigital extends LCARSComponent {
    constructor(name, x, y, properties, fontSize, format) {
        super(name, "", x, y, properties);
        this.static = LCARS.ES_STATIC;  // Text is always static.
        this.textColor = this.getColor();
        
        this.clockFontSize = fontSize;
        this.format = format;
        
        this.intervalVariable = null;
        
        this.scaleFactor = fontSize/200;
        
        this.drawShape();
        
    }
    
    
    drawShape() {
        
        let x1 = 335 * this.scaleFactor;
        let y1 = this.clockFontSize;
        let x2 = 400 * this.scaleFactor;
        let y2 = this.clockFontSize * 0.5;
        let x3 = 400 * this.scaleFactor;
        let y3 = this.clockFontSize;
        let x4 = 90 * this.scaleFactor;
        let y4 = y1 + (100 * this.scaleFactor);
        
        let clock_1 = new LCARSClock(this.id + "_clock_1", "LCARS clock_1 Text", x1, y1, this.properties | LCARS.ES_LABEL_E, "hh:mm");
        this.element.appendChild(clock_1.element);
        clock_1.setTextFontSize(this.clockFontSize);
        
        let clock_2 = new LCARSClock(this.id + "_clock_2", "LCARS clock_2 Text", x2, y2, this.properties, "ss");
        this.element.appendChild(clock_2.element);
        clock_2.setTextFontSize(this.clockFontSize*0.45);

        let clock_3 = new LCARSClock(this.id + "_clock_3", "LCARS clock_3 Text", x3, y3, this.properties, "TT");
        this.element.appendChild(clock_3.element);
        clock_3.setTextFontSize(this.clockFontSize*0.45);

        let clock_4 = new LCARSClock(this.id + "_clock_4", "LCARS clock_4 Text", x4, y4, this.properties, "dddd - d MMM yyyy");
        this.element.appendChild(clock_4.element);
        clock_4.setTextFontSize(this.clockFontSize*0.25);
    }
}
