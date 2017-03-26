import { LCARS } from './LCARS';
import { ICONS } from './ICONS';
import { LCARSComponent } from './LCARSComponent';
import { LCARSButton } from './LCARSButton';


/**
 * LCARS Keypad component
 */
export class LCARSKeypad extends LCARSComponent {
    
    constructor(name, x, y, properties, auxLabelProperties) {
        super(name, "", x, y, properties); /** Keypads don't have labels */
        
        this.auxLabelProperties = auxLabelProperties;
        
        this.drawShape();
    }
    
    
    drawShape() {
        
        this.button_1 = new LCARSButton("1", "1", 0, 0, 0, this.properties, " ", this.auxLabelProperties);
        this.element.appendChild(this.button_1.element);
        
        this.button_2 = new LCARSButton("2", "2", (LCARS.LCARS_BTN_WIDTH + LCARS.KP_BUTTON_X_SPACE), 0, 0, this.properties, " ", this.auxLabelProperties);
        this.element.appendChild(this.button_2.element);
        
        this.button_3 = new LCARSButton("3", "3", (2*LCARS.LCARS_BTN_WIDTH + 2*LCARS.KP_BUTTON_X_SPACE), 0, 0, this.properties, " ", this.auxLabelProperties);
        this.element.appendChild(this.button_3.element);
        
        this.button_4 = new LCARSButton("4", "4", 0, (LCARS.LCARS_BTN_HEIGHT + LCARS.KP_BUTTON_Y_SPACE), 0, this.properties, " ", this.auxLabelProperties);
        this.element.appendChild(this.button_4.element);
        
        this.button_5 = new LCARSButton("5", "5", (LCARS.LCARS_BTN_WIDTH + LCARS.KP_BUTTON_X_SPACE), (LCARS.LCARS_BTN_HEIGHT + LCARS.KP_BUTTON_Y_SPACE), 0, this.properties, " ", this.auxLabelProperties);
        this.element.appendChild(this.button_5.element);
        
        this.button_6 = new LCARSButton("6", "6", (2*LCARS.LCARS_BTN_WIDTH + 2*LCARS.KP_BUTTON_X_SPACE), (LCARS.LCARS_BTN_HEIGHT + LCARS.KP_BUTTON_Y_SPACE), 0, this.properties, " ", this.auxLabelProperties);
        this.element.appendChild(this.button_6.element);
        
        this.button_7 = new LCARSButton("7", "7", 0, (2*LCARS.LCARS_BTN_HEIGHT + 2*LCARS.KP_BUTTON_Y_SPACE), 0, this.properties, " ", this.auxLabelProperties);
        this.element.appendChild(this.button_7.element);
        
        this.button_8 = new LCARSButton("8", "8", (LCARS.LCARS_BTN_WIDTH + LCARS.KP_BUTTON_X_SPACE), (2*LCARS.LCARS_BTN_HEIGHT + 2*LCARS.KP_BUTTON_Y_SPACE), 0, this.properties, " ", this.auxLabelProperties);
        this.element.appendChild(this.button_8.element);
        
        this.button_9 = new LCARSButton("9", "9", (2*LCARS.LCARS_BTN_WIDTH + 2*LCARS.KP_BUTTON_X_SPACE), (2*LCARS.LCARS_BTN_HEIGHT + 2*LCARS.KP_BUTTON_Y_SPACE), 0, this.properties, " ", this.auxLabelProperties);
        this.element.appendChild(this.button_9.element);
        
        this.button_star = new LCARSButton("*", "*", 0, (3*LCARS.LCARS_BTN_HEIGHT + 3*LCARS.KP_BUTTON_Y_SPACE), 0, this.properties, " ", this.auxLabelProperties);
        
        this.button_0 = new LCARSButton("0", "0", (LCARS.LCARS_BTN_WIDTH + LCARS.KP_BUTTON_X_SPACE), (3*LCARS.LCARS_BTN_HEIGHT + 3*LCARS.KP_BUTTON_Y_SPACE), 0, this.properties, " ", this.auxLabelProperties);
        this.element.appendChild(this.button_0.element);
        
        this.button_hash = new LCARSButton("#", "#", (2*LCARS.LCARS_BTN_WIDTH + 2*LCARS.KP_BUTTON_X_SPACE), (3*LCARS.LCARS_BTN_HEIGHT + 3*LCARS.KP_BUTTON_Y_SPACE), 0, this.properties, " ", this.auxLabelProperties);
        
        if((this.auxLabelProperties & LCARS.ES_CLASS) == LCARS.EKP_AUX_KEYS) {
            this.element.appendChild(this.button_star.element);
            this.element.appendChild(this.button_hash.element);
        }
        
        
    }
    
    
    addEventListener(event, listener) {
        this.button_1.addEventListener(event, listener);
        this.button_2.addEventListener(event, listener);
        this.button_3.addEventListener(event, listener);
        this.button_4.addEventListener(event, listener);
        this.button_5.addEventListener(event, listener);
        this.button_6.addEventListener(event, listener);
        this.button_7.addEventListener(event, listener);
        this.button_8.addEventListener(event, listener);
        this.button_9.addEventListener(event, listener);
        this.button_0.addEventListener(event, listener);
        this.button_star.addEventListener(event, listener);
        this.button_hash.addEventListener(event, listener);
    }
    
    
    getElementForButton(button) {
        
        var _element;
        
        if(button == "1") {
            _element = this.button_1;
        }
        else if(button == "2") {
            _element = this.button_2;
        }
        else if(button == "3") {
            _element = this.button_3;
        }
        else if(button == "4") {
            _element = this.button_4;
        }
        else if(button == "5") {
            _element = this.button_5;
        }
        else if(button == "6") {
            _element = this.button_6;
        }
        else if(button == "7") {
            _element = this.button_7;
        }
        else if(button == "8") {
            _element = this.button_8;
        }
        else if(button == "9") {
            _element = this.button_9;
        }
        else if(button == "0") {
            _element = this.button_0;
        }
        else if(button == "*") {
            _element = this.button_star;
        }
        else if(button == "#") {
            _element = this.button_hash;
        }
        
        return _element;
    }
    
    
    addButtonEventListener(button, event, listener) {
        
        var _element;
        
        _element = this.getElementForButton(button);
        
        _element.addEventListener(event, listener);
    }
    
    
    setAuxText(one, two, three, four, five, six, seven, eight, nine, zero, star, hash) {
        this.button_1.setAuxText(one);
        this.button_2.setAuxText(two);
        this.button_3.setAuxText(three);
        this.button_4.setAuxText(four);
        this.button_5.setAuxText(five);
        this.button_6.setAuxText(six);
        this.button_7.setAuxText(seven);
        this.button_8.setAuxText(eight);
        this.button_9.setAuxText(nine);
        this.button_0.setAuxText(zero);
        this.button_star.setAuxText(star);
        this.button_hash.setAuxText(hash);
    }
    
    
    setButtonAuxText(button, text) {
        
        var _element;
        
        _element = this.getElementForButton(button);
        
        _element.setAuxText(text);
    }
    
}


