import { LCARS } from './LCARS';
import { ICONS } from './ICONS';
import { LCARSComponent } from './LCARSComponent';
import { LCARSText } from './LCARSText';


/**
 * LCARS Analog Clock component
 */
export class LCARSClockAnalog extends LCARSComponent {
    constructor(name, x, y, radius, properties, updateInterval, format) {
        super(name, "", x, y, properties);
        this.static = LCARS.ES_STATIC;  // Text is always static.
        this.textColor = this.getColor();
        
        /** Set the size of the clock face. */
        this.element.style.height = radius*2 + "px";
        this.element.style.width = radius*2 + "px";
        
        this.radius = radius;
        
        this.updateInterval = updateInterval;
        this.format = format;
        
        this.intervalVariable = null;
        
        this.drawShape();
        
        this.update();
        
        this.start();
    }
    
    
    /**
     * Function to start the clock. It retrieves a reference to the clock object,
     * and passes it to an interval timer. The update interval is a class
     * variable, and is passed to the constructor of the object.
     */
    start() {
        this.update();
    }
    
    
    /**
     * Function to stop the clock. It test the interval variable, and if it is not
     * null, it clears it.
     */
    stop() {
        if(!(this.timeoutVariable == null)) {
            clearTimeout(this.timeoutVariable);
        }
    }
    
    
    /**
     * Function to update the clock with the current time. It gets passed to an
     * interval timer and will update the time and date at the rate set by the
     * interval variable.
     */
    update() {
        
        var centerX = this.radius;
        var centerY = this.radius;
        
        /** Update to the current date and time. */
        var now = new Date();
        
        /** Calculate the angles in degrees for the secons, minutes, and hours hands. */
        var secondsDegrees = 6*now.getSeconds();
        var minuteDegrees = 6*now.getMinutes();
        var hourDegrees = 30*(now.getHours()%12) + now.getMinutes()/2;
        
        /** Rotate the hands of the clock. */
        this.secondHand.setAttribute('transform', 'rotate(' + secondsDegrees + ' ' + centerX + ' ' + centerY + ')');
        this.minuteHand.setAttribute('transform', 'rotate(' + minuteDegrees + ' ' + centerX + ' ' + centerY + ')');
        this.hourHand.setAttribute('transform', 'rotate(' + hourDegrees + ' ' + centerX + ' ' + centerY + ')');
        
        var thisObj = this; // Can't just pass "this" to the setInterval function.
        var milliseconds = now.getMilliseconds();
        var newTimeout = 1000 - milliseconds;
        this.timeoutVariable = setTimeout((function(thisObj) { return function() { thisObj.update(); } })(this), newTimeout);
    }
    
    
    drawShape() {
        
        this.drawClockFace();
        
        this.drawClockHands();
        
        return "";
    }
    
    
    drawClockHands() {
        
        this.drawClockFace();
        
        var centerX = this.radius;
        var centerY = this.radius;
        
        this.hourHand = document.createElementNS(LCARS.svgNS, "line");
        this.hourHand.setAttribute('x1', centerX);
        this.hourHand.setAttribute('y1', centerY);
        this.hourHand.setAttribute('x2', centerX);
        this.hourHand.setAttribute('y2', this.radius*0.5);
        this.hourHand.setAttribute('stroke', this.color);
        this.hourHand.setAttribute('stroke-width', this.radius/10);
        this.hourHand.setAttribute('stroke-linecap', 'round');
        
        this.minuteHand = document.createElementNS(LCARS.svgNS, "line");
        this.minuteHand.setAttribute('x1', centerX);
        this.minuteHand.setAttribute('y1', centerY);
        this.minuteHand.setAttribute('x2', centerX);
        this.minuteHand.setAttribute('y2', this.radius*0.25);
        this.minuteHand.setAttribute('stroke', this.color);
        this.minuteHand.setAttribute('stroke-width', this.radius/20);
        this.minuteHand.setAttribute('stroke-linecap', 'round');
        
        this.secondHand = document.createElementNS(LCARS.svgNS, "line");
        this.secondHand.setAttribute('x1', centerX);
        this.secondHand.setAttribute('y1', centerY);
        this.secondHand.setAttribute('x2', centerX);
        this.secondHand.setAttribute('y2', this.radius*0.15);
        this.secondHand.setAttribute('stroke', this.color);
        this.secondHand.setAttribute('stroke-width', this.radius/40);
        this.secondHand.setAttribute('stroke-linecap', 'round');
        
        this.element.appendChild(this.hourHand);
        this.element.appendChild(this.minuteHand);
        this.element.appendChild(this.secondHand);
    }
    
    
    drawClockFace() {
        
        var centerX = this.radius;
        var centerY = this.radius;
        
        var xOffset = this.radius/35;
        var yOffset = this.radius/15;
        
        
        var angleIncrement = 360/12;
        
        for(var i=12; i>=1; i--) {
            
            /** Set the angle and convert to radians. */
            var angle = ((angleIncrement * i) - 90) * (Math.PI/180);
            
            /** Calculate the x, y coordinates of the hour text. */
            var x = centerX + this.radius * Math.cos(angle);
            var y = centerY + this.radius * Math.sin(angle);
            
            var adjustedOffsetX = xOffset;
            if(i >= 10) {
                adjustedOffsetX = xOffset*2;
            }
            
            /** Create the hour text object and add it to the parent SVG. */
            var clockHourText = new LCARSText("hour_" + i.toString(), i.toString(), x-adjustedOffsetX, y+yOffset, this.properties);
            //clockHourText.setTextFontSize(this.font_size);
            clockHourText.setTextFontSize(this.radius/5);
            
            
            this.element.appendChild(clockHourText.element);
        }
        
    }
    
}


