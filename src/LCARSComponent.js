import { LCARS } from './LCARS';
import { ICONS } from './ICONS';

/**
 * LCARSComponent class
 */
export class LCARSComponent {
    
    constructor(id, label, x, y, properties) {
        this.composite = false;
        this.id = id;
        this.label = label;
        this.x = x;
        this.y = y;
        this.properties = properties;
        this.static = properties & LCARS.ES_STATIC;
        this.blinking = properties & LCARS.ES_BLINKING;
        this.color = this.getColor();
        this.overColor = this.getOverColor();
        this.downColor = this.getDownColor();
        this.textColor = this.getTextColor();
        this.fontSize = LCARS.getLCARSFontSize(this.properties);
        
        this.element = document.createElementNS(LCARS.svgNS, "g");
        this.element.setAttribute("id", this.id);
        this.element.setAttribute("x", 0);
        this.element.setAttribute("y", 0);
        this.element.setAttribute("transform", 'translate(' + x + ',' +  y +')');
        
        this.shapeElement = document.createElementNS(LCARS.svgNS, "path");
        this.textElement = document.createElementNS(LCARS.svgNS, "text");
        this.iconElement = document.createElementNS(LCARS.svgNS, "path");
        
        /** Create the DOM object for shape animation, and set its attributes. */
        this.animateElement = document.createElementNS(LCARS.svgNS, "animate");
        this.animateElement.setAttribute("id", this.element.id + "_shapeAnimate");
        this.animateElement.setAttribute("attributeType", "XML");
        this.animateElement.setAttribute("attributeName", "fill");
        this.animateElement.setAttribute("repeatCount", "indefinite");
        
        /** Create the DOM object for the shape's text animation, and set its attributes. */
        this.textAnimateElement = document.createElementNS(LCARS.svgNS, "animate");
        this.textAnimateElement.setAttribute("id", this.element.id + "_textAnimate");
        this.textAnimateElement.setAttribute("attributeType", "XML");
        this.textAnimateElement.setAttribute("attributeName", "fill");
        this.textAnimateElement.setAttribute("repeatCount", "indefinite");
        
        /** Set the component's dynamics. */
        this.setComponentDynamics();
    }
    
    getElement() {
        return this.element;
    }

    getShapeElement() {
        return this.shapeElement;
    }

    getTextElement() {
        return this.textElement;
    }

    addEventListener(event, callback) {
        this.element.addEventListener(event, callback, false);
    }

    getColor() {
        return LCARS.getColor(this.properties);
    }

    
    getTextColor () {
        
        switch(this.properties & LCARS.ES_COLOR) {
            case LCARS.EC_BLUE:
            case LCARS.EC_D_BLUE:
            case LCARS.EC_RED:
                return "#CCDDFF";
            case LCARS.EC_WHITE:
            case LCARS.EC_YELLOW:
            case LCARS.EC_ORANGE:
            case LCARS.EC_L_BLUE:
            case LCARS.EC_M_BLUE:
            default:
                return "#000000";
        }
        
    }

    
    getOverColor(overrideColor) {
        var defaultReturn = "";
        var color;
        
        if(overrideColor == null) {
            color = this.properties & LCARS.ES_COLOR;
        }
        else {
            color = overrideColor;
        }
        
        switch(color) {
            case LCARS.EC_WHITE:
                return "#FFFFFF";
            case LCARS.EC_L_BLUE:
                return "#77ADFF";
            case LCARS.EC_M_BLUE:
                return "#5C85FF";
            case LCARS.EC_BLUE:
                return "#3341F1";
            case LCARS.EC_D_BLUE:
                return "#3333A0";
            case LCARS.EC_YELLOW:
                return "#D6B533";
            case LCARS.EC_ORANGE:
                return "#D68533";
            case LCARS.EC_RED:
                return "#B53333";
            default:
                break;
        }
        
        return defaultReturn;
    }
    
    
    getDownColor (overrideColor) {
        var defaultReturn = "";
        var color;
        
        if(overrideColor == null) {
            color = this.properties & LCARS.ES_COLOR;
        }
        else {
            color = overrideColor;
        }
        
        switch(color) {
            case LCARS.EC_WHITE:
                return "#B8C7E6";
            case LCARS.EC_L_BLUE:
                return "#447ACC";
            case LCARS.EC_M_BLUE:
                return "#2952CC";
            case LCARS.EC_BLUE:
                return "#000EBE";
            case LCARS.EC_D_BLUE:
                return "#00006D";
            case LCARS.EC_YELLOW:
                return "#A38200";
            case LCARS.EC_ORANGE:
                return "#A35200";
            case LCARS.EC_RED:
                return "#820000";
            default:
                break;
        }
        
        return defaultReturn;
    }

    
    /**
     * Method to create a string of color values from dark to light derived from the
     * LCARS color palette. I uses the Down color, the normal color, and the Over
     * color in that order.
     *
     * @param color the color to derive the string of colors from
     * @return the string of color values
     */
    getBlinkColors(color) {
        
        if(color == null) {
            color = this.properties & LCARS.ES_COLOR;
        }
        
        var colorString = "#000;" + this.getDownColor(color) + ";" + LCARS.getColor(color) + ";" + this.getOverColor(color);
        
        return colorString;
    }
    
    
    /**
     * Method to set the visual dynamics of the component. If the component's <code>LCARS.ES_STATIC</code>
     * property is not set, the following dynamics are covered:
     * <ul>
     * <li> <code>onmouseover</code>
     * <li> <code>onmousedown</code>
     * <li> <code>onmouseup</code>
     * <li> <code>onmouseout</code>
     * </ul>
     */
    setComponentDynamics() {
        if(this.static != LCARS.ES_STATIC) {
            this.shapeElement.setAttribute("onmouseover", "evt.target.setAttribute('fill','" + this.overColor + "')");
            this.shapeElement.setAttribute("onmouseout", "evt.target.setAttribute('fill','" + this.color + "')");
            
            this.shapeElement.setAttribute("onclick", "evt.target.setAttribute('fill','" + this.downColor + "'); " +
                                           "setTimeout(function(){evt.target.setAttribute('fill','" + this.color + "')}, 250)");
            
        }
        
        if(this.blinking) {
            this.setBlinking(true);
        }
    }
    
    
    getTextX() {
        var x = 0;
        
        switch(this.properties & LCARS.ES_LABEL) {
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
    
    
    getTextY() {
        var y = 0;
        
        switch(this.properties & LCARS.ES_LABEL) {
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
    
    
    getTextAnchor() {
        var textAnchor = "";
        
        switch(this.properties & LCARS.ES_LABEL) {
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
    
    
    drawShape() {
        var rectString = "M0,0";
        
        var westEndString;
        var eastEndString;
        var northString = " l";
        var southString = " l-";
        
        var hLength;
        
        var rectType = this.properties & LCARS.ES_RECT_RND;
        
        /** Create West end string. */
        switch(rectType) {
            case LCARS.ES_RECT_RND:
            case LCARS.ES_RECT_RND_W:
                westEndString = " m" + (this.height/2) + "," + this.height +
                " c-" + (this.height*.65) + ",0 -" + (this.height*.65) + ",-" + this.height + " 0,-" + this.height;
                break;
            case LCARS.ES_RECT_RND_E:
            default:
                westEndString = " m0," + this.height + " l0,-" + this.height;
                break;
        }
        
        /** Create the North and South edge strings. */
        switch(rectType) {
            case LCARS.ES_RECT_RND:
                hLength = this.width - this.height;
                break;
            case LCARS.ES_RECT_RND_E:
            case LCARS.ES_RECT_RND_W:
                hLength = this.width - (this.height/2);
                break;
            default:
                hLength = this.width;
                break;
        }
        northString += hLength + ",0";
        southString += hLength + ",0";
        
        /** Create the East end string */
        switch(rectType) {
            case LCARS.ES_RECT_RND:
            case LCARS.ES_RECT_RND_E:
                eastEndString = " c" + (this.height*.65) + ",0 " + (this.height*.65) + "," + this.height + " 0," + this.height;
                break;
            case LCARS.ES_RECT_RND_W:
            default:
                eastEndString = " l0," + this.height;
                break;
        }
        
        /** Create the rectangle path string. */
        rectString += westEndString + northString + eastEndString + southString;
        
        /** Create the DOM object, and set its attributes. */
        this.shapeElement.setAttribute("d", rectString);
        this.setShapeAttributes();
        
        this.element.appendChild(this.shapeElement);
    }
    
    
    setPosition(x, y) {
        this.element.setAttribute("transform", 'translate(' + x + ',' +  y +')');
    }
    
    
    setShapeAttributes () {
        this.shapeElement.setAttribute("id", this.id + LCARS.SHAPE_SUFFIX);
        this.shapeElement.setAttribute("fill", this.color);
        if(this.properties & LCARS.ES_DISABLED) {
            this.shapeElement.setAttribute("stroke", this.color);
            this.shapeElement.setAttribute("stroke-width", '2');
            this.shapeElement.setAttribute("fill-opacity", '0.1');
        }
        else {
            this.shapeElement.setAttribute("fill-opacity", '1.0');
        }
    }
    
    
    setEnabled(enabled) {
        if(enabled) {
            this.element.setAttribute("pointer-events", "all");
            this.shapeElement.setAttribute("fill-opacity", '1.0');
            this.shapeElement.setAttribute("stroke-width", '0');
            this.textElement.setAttribute("fill", this.textColor);
            this.iconElement.setAttribute("fill", this.textColor);
        }
        else {
            this.element.setAttribute("pointer-events", "none");
            this.shapeElement.setAttribute("stroke", this.color);
            this.shapeElement.setAttribute("stroke-width", '2');
            this.shapeElement.setAttribute("fill-opacity", '0.1');
            this.textElement.setAttribute("fill", '#585858');
            this.iconElement.setAttribute("fill", '#585858');
        }
    }
    

    /**
     * Method to turn blinking on and off for the component. If the <code>enabled</code> argument
     * is <code>true</code>, it creates SVG shape and text animations for the component. Component
     * color and blink animation duration can be set. If left blank or specified as null, default
     * color and animation duration will be used.
     * <p>Color must be set using the LCARS palette constants, not specific color values. Duration
     * can be set using one of two constants <code>BLINK_DURATION_ERROR</code> or
     * <code>BLINK_DURATION_WARNING</code>, or it can be set to an arbitrary value using the form
     * <code>"0.0s"</code>. Note that the "s" suffix stands for seconds.
     *
     * @param enabled <code>true</code> if blinking is enabled, <code>false</code> if not
     * @param color the color to blink the component, default component color if null
     * @param duration the duration of the blink animation in the form <code>"0.0s"</code>, the "s" is for seconds, default if null
     */
    setBlinking(enabled, color, duration) {
        /* If the duration argument is null, set a default blink duration. */
        if(duration == null) {
            duration = LCARS.BLINK_DURATION_WARNING;
        }
        
        /* If blinking is enabled... */
        if(enabled) {
            /* Update the DOM object for shape animation, with color and duration attributes. */
            this.animateElement.setAttribute("values", this.getBlinkColors(color));
            this.animateElement.setAttribute("dur", duration);
            /* Append the animation element to the shape element. */
            this.shapeElement.appendChild(this.animateElement);
            
            /* Update the DOM object for the shape's text animation, with color and duration attributes. */
            this.textAnimateElement.setAttribute("values", "#000;" + LCARS.getTextColor(color));
            this.textAnimateElement.setAttribute("dur", duration);
            /* Append the animation element to the text element. */
            this.textElement.appendChild(this.textAnimateElement);
            
            
        }
        /* Else if blinking is not enabled... */
        else {
            /* If the shape animate element exists, remove it. */
            if(this.animateElement != null) {
                this.animateElement.remove();
            }
            /* If the text animate element exists, remove it. */
            if(this.textAnimateElement != null) {
                this.textAnimateElement.remove();
            }
        }
    }
    
    
    /**
     * Method to blink a visible LCARS component "off" (make invisible) for 0.1 seconds.
     * Used for things like activity indicators.
     */
    offBlink(_duration) {
        var duration = _duration;
        if(duration == undefined) {
            duration = 100;
        }
        
        var thisObject = this;
        thisObject.setVisible(false);
        setTimeout(function() { thisObject.setVisible(true) }, duration);
    }
    
    
    /**
     * Method to blink an invisible LCARS component "on" (make visible) for 0.1 seconds.
     * Used for things like activity indicators.
     */
    onBlink(_duration) {
        var duration = _duration;
        if(duration == undefined) {
            duration = 100;
        }
        
        var thisObject = this;
        thisObject.setVisible(true);
        setTimeout(function() { thisObject.setVisible(false) }, duration);
    }
    
    
    /**
     * Method to blink an enabled LCARS component "off" (make disabled) for 0.1 seconds.
     * Used for things like activity indicators.
     */
    offBlinkOutline(_duration) {
        var duration = _duration;
        if(duration == undefined) {
            duration = 100;
        }
        
        var thisObject = this;
        thisObject.setEnabled(false);
        setTimeout(function() { thisObject.setEnabled(true) }, duration);
    }
    
    
    /**
     * Method to blink a disabled LCARS component "on" (make enabled) for 0.1 seconds.
     * Used for things like activity indicators.
     */
    onBlinkOutline(_duration) {
        var duration = _duration;
        if(duration == undefined) {
            duration = 100;
        }
        
        var thisObject = this;
        thisObject.setEnabled(true);
        setTimeout(function() { thisObject.setEnabled(false) }, duration);
    }
    
    
    /**
     * Method to draw the text of the LCARS component, if any. The text element is created
     * in the constructor. This method simply sets the text attributes, and the
     * component label specified in the constructor. It then appends the text element
     * to the parent SVG element.
     */
    drawText() {
        this.setTextAttributes();
        this.setText(this.label);
        
        this.element.appendChild(this.textElement);
    }
    
    
    /**
     * Method to se the text attributes of the LCARS component. The text element is created
     * in the constructor. This method simply sets the text attributes that are specified
     * in the constructor. The attributes being set are:
     * <ul>
     * <li> component id</li>
     * <li> x coordinate</li>
     * <li> x coordinate</li>
     * <li> text anchor location</li>
     * <li> fill color dependent on enable/disable status of the component</li>
     * <li> font family</li>
     * <li> font size</li>
     * <li> pointer events, text elements do not respond to pointer events</li>
     * </ul>
     */
    setTextAttributes() {
        this.textElement.setAttribute("id", this.id + LCARS.TEXT_SUFFIX);
        this.textElement.setAttribute("x", this.getTextX());
        this.textElement.setAttribute("y", this.getTextY());
        this.textElement.setAttribute("text-anchor", this.getTextAnchor());
        if(this.properties & LCARS.ES_DISABLED) {
            this.textElement.setAttribute("fill", '#585858');
        }
        else {
            this.textElement.setAttribute("fill", this.textColor);
        }
        this.textElement.setAttribute("font-family", LCARS.getFont());
        this.textElement.setAttribute("font-size", this.fontSize);
        this.textElement.setAttribute("pointer-events", "none");
    }
    
    
    /**
     * Method to set the LCARS component's text element to the string specified by the argument.
     *
     * @param textString the text to set for the component
     */
    setText(textString) {
        this.textElement.textContent = textString;
    }
    
    
    /**
     * Method to set the LCARS component's text element's font size to the size specified by the argument.
     * It also sets the object's <code>fontSize</code> attribute.
     *
     * @param textFontSize the font size to set for the component's text element
     */
    setTextFontSize(textFontSize) {
        this.fontSize = textFontSize;
        this.textElement.setAttribute("font-size", this.fontSize);
    }
    
    
    /**
     * Method to control the visibility of the LCARS component. If the argument is set to
     * <code>false</code>, the component will be invisible. If <code>true</code>, the
     * component will be visible.
     *
     * @param visible visible, if <code>true</code>, invisible, if <code>false</code>
     */
    setVisible(visible) {
        if(visible) {
            this.element.setAttributeNS(null, 'display', 'inline');
        }
        else {
            this.element.setAttributeNS(null, 'display', 'none');
        }
    }
    
    
    fadeOut(duration) {
        if(this.animateElementFadeIn != null) {
            this.element.removeChild(this.animateElementFadeIn);
        }
        this.animateElementFadeOut = document.createElementNS(LCARS.svgNS, "animate");
        this.animateElementFadeOut.setAttribute("id", this.element.id + "_fadeOutAnimate");
        this.animateElementFadeOut.setAttribute("attributeType", "XML");
        this.animateElementFadeOut.setAttribute("attributeName", "opacity");
        this.animateElementFadeOut.setAttribute("values", "1;0");
        this.animateElementFadeOut.setAttribute("dur", duration + "s");
        this.animateElementFadeOut.setAttribute("fill", "freeze");
        
        this.element.appendChild(this.animateElementFadeOut);
    }
    
    fadeIn(duration) {
        if(this.animateElementFadeOut != null) {
            this.element.removeChild(this.animateElementFadeOut);
        }
        this.animateElementFadeIn = document.createElementNS(LCARS.svgNS, "animate");
        this.animateElementFadeIn.setAttribute("id", this.element.id + "_fadeInAnimate");
        this.animateElementFadeIn.setAttribute("attributeType", "XML");
        this.animateElementFadeIn.setAttribute("attributeName", "opacity");
        this.animateElementFadeIn.setAttribute("values", "0;1");
        this.animateElementFadeIn.setAttribute("dur", duration + "s");
        this.animateElementFadeIn.setAttribute("fill", "freeze");
        
        this.element.appendChild(this.animateElementFadeIn);
    }
    
    setIcon(svgString) {
        this.iconScale = " scale(1.5) ";
        
        this.iconElement.setAttribute("d", svgString);
        this.iconElement.setAttribute("transform", this.iconScale);
        //this.iconElement.setAttribute("fill", this.getTextColor());
        if(this.properties & LCARS.ES_DISABLED) {
            this.iconElement.setAttribute("fill", '#585858');
        }
        else {
            this.iconElement.setAttribute("fill", this.textColor);
        }
        
        this.element.appendChild(this.iconElement);
    }
    
    setIconColor(color) {
        this.iconElement.setAttribute("fill", LCARS.getColor(color));
    }
    
    setIconPosition(location) {
        this.iconTranslate = " translate(" + this.getIconX(location) + "," + this.getIconY(location) + ") "
        this.iconElement.setAttribute("transform", this.iconTranslate + this.iconScale);
    }
    
    getIconX(location) {
        var x = 0;
        
        switch(location & LCARS.ES_LABEL) {
            case LCARS.ES_LABEL_C:
            case LCARS.ES_LABEL_S:
            case LCARS.ES_LABEL_N:
                x = this.width/2 - 24*1.5/2;
                break;
            case LCARS.ES_LABEL_SW:
            case LCARS.ES_LABEL_W:
            case LCARS.ES_LABEL_NW:
                x = 24*1.5/2;
                break;
            case LCARS.ES_LABEL_NE:
            case LCARS.ES_LABEL_E:
            case LCARS.ES_LABEL_SE:
            default:
                x = this.width - (24*1.5 + 24*1.5/2);
                break;
        }
        
        return x;
    }
    
    
    getIconY(location) {
        var y = 0;
        
        switch(location & LCARS.ES_LABEL) {
            case LCARS.ES_LABEL_C:
            case LCARS.ES_LABEL_W:
            case LCARS.ES_LABEL_E:
            case LCARS.ES_LABEL_NW:
            case LCARS.ES_LABEL_N:
            case LCARS.ES_LABEL_NE:
            case LCARS.ES_LABEL_S:
            case LCARS.ES_LABEL_SW:
            case LCARS.ES_LABEL_SE:
            default:
                y = this.height/2 - (24*1.5/2);
                break;
        }
        
        return y;
    }
    
}

