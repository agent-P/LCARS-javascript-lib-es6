import { LCARS } from './LCARS';
import { ICONS } from './ICONS';
import { LCARSComponent } from './LCARSComponent';


/**
 * LCARS Indicator component
 */
export class LCARSIndicator extends LCARSComponent {
    constructor(name, label, x, y, width, height, properties) {
        super(name, label, x, y, properties | LCARS.ES_STATIC);  // Indicators are always static.
        this.width = width;
        this.height = height;
        
        this.drawShape();
        this.drawText();
        
        this.off();  // start in the off state
    }
    
    on() {
        this.setBlinking(false);
        this.setEnabled(true);
    }
    
    off() {
        this.setBlinking(false);
        this.setEnabled(false);
    }
    
    onBlink(_duration) {
        var duration = _duration;
        if(duration == undefined) {
            duration = 100;
        }
        this.onBlinkOutline(duration);
    }
    
    offBlink(_duration) {
        var duration = _duration;
        if(duration == undefined) {
            duration = 100;
        }
        this.offBlinkOutline(duration);
    }
    
    warning(color) {
        if(color == null || color == undefined) {
            color = LCARS.EC_YELLOW;
        }
        this.on();
        this.setBlinking(true, color, LCARS.BLINK_DURATION_WARNING);
    }
    
    error(color) {
        if(color == null || color == undefined) {
            color = LCARS.EC_RED;
        }
        this.on();
        this.setBlinking(true, color, LCARS.BLINK_DURATION_ERROR);
    }
}

