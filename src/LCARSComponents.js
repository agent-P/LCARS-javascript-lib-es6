import { LCARS } from './LCARS';

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


/**
 * LCARS Icon component
 */
export class LCARSIcon extends LCARSComponent {
    
    constructor(name, label, x, y, properties, svgString) {
        super(name, label, x, y, properties | LCARS.ES_STATIC);
        
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



/**
 * LCARS Button component
 */
export class LCARSButton extends LCARSComponent {
    
    constructor(name, label, x, y, height, properties, auxLabel, auxLabelProperties) {
        super(name, label, x, y, properties);
        this.auxLabel = auxLabel;
        this.auxLabelProperties = auxLabelProperties;
        
        this.width = LCARS.LCARS_BTN_WIDTH;
        
        if((properties & LCARS.ES_RECT_RND) == 0) {
            this.height = height*LCARS.LCARS_BTN_HEIGHT + (height-1)*LCARS.LCARS_BTN_SPACING;
        }
        else {
            this.height = LCARS.LCARS_BTN_HEIGHT;
        }
        
        if((this.properties & LCARS.ES_FONT) == LCARS.EF_NORMAL) {
            this.fontSize = LCARS.FONT_BUTTON_SIZE; // the default font for button components
        }
        
        this.drawShape();
        this.drawText();
        
        if(this.auxLabel != "" && this.auxLabel != undefined) {
            this.drawAuxText();
        }
    }
    
    
    setAuxText(textString) {
        this.auxTextElement.textContent = textString;
    }

    
    drawAuxText () {
        this.auxTextElement = document.createElementNS(LCARS.svgNS, "text");
        this.auxTextElement.setAttribute("id", this.id + LCARS.AUX_TEXT_SUFFIX);
        this.auxTextElement.setAttribute("x", this.getAuxTextX());
        this.auxTextElement.setAttribute("y", this.getAuxTextY());
        this.auxTextElement.setAttribute("text-anchor", this.getAuxTextAnchor());
        if(this.properties & LCARS.ES_DISABLED) {
            this.auxTextElement.setAttribute("fill", '#585858');
        }
        else {
            this.auxTextElement.setAttribute("fill", LCARS.getColor(this.auxLabelProperties & LCARS.ES_COLOR));
        }
        this.auxTextElement.setAttribute("font-family", LCARS.getFont());
        this.auxTextElement.setAttribute("font-size", this.getAuxLabelFontSize());
        this.auxTextElement.setAttribute("pointer-events", "none");
        
        this.setAuxText(this.auxLabel);
        
        this.element.appendChild(this.auxTextElement);
    }
    
    
    getAuxTextX() {
        var x = 0;
        
        switch(this.auxLabelProperties & LCARS.ES_LABEL) {
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
    
    
    getAuxTextY() {
        var y = 0;
        
        switch(this.auxLabelProperties & LCARS.ES_LABEL) {
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
    
    
    getAuxTextAnchor() {
        var textAnchor = "";
        
        switch(this.auxLabelProperties & LCARS.ES_LABEL) {
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
    
    
    getAuxLabelFontSize() {
        switch(this.auxLabelProperties & LCARS.ES_FONT) {
            case LCARS.EF_TITLE:
                return LCARS.FONT_TITLE_SIZE;
            case LCARS.EF_SUBTITLE:
                return LCARS.FONT_SUBTITLE_SIZE;
            case LCARS.EF_BUTTON:
                return LCARS.FONT_BUTTON_SIZE;
            case LCARS.EF_TINY:
                return LCARS.FONT_TINY_SIZE
            case LCARS.EF_BODY:
            default:
                return LCARS.FONT_BODY_SIZE;
        }
    }
    
}



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




/**
 * LCARS TextArea component
 */
export class LCARSTextArea extends LCARSComponent {
    
    constructor(name, label, x, y, width, rows, properties) {
        super(name, label, x, y, properties);
        this.composite = false;
        this.static = LCARS.ES_STATIC;  // TextAreas are always static.
        this.textColor = this.getColor();
        
        this.width = width;
        this.rows = rows;
        
        this.lineSpacing = 1.0;
        
        this.nowrap = true;  // Default to not wrapping lines of text
        this.canvasFont = Math.round(this.fontSize*1.1) + "pt " + LCARS.getFont();
        
        this.drawText();
    }
    
    
    getTextAnchor () {
        if((this.properties & LCARS.ES_LABEL) == 0) {
            this.properties |= LCARS.ES_LABEL_W;
        }
        
        return super.getTextAnchor();
    }
    

    drawText() {
        this.textElement.setAttribute("id", this.id + LCARS.TEXT_SUFFIX);
        this.textElement.setAttribute("font-family", LCARS.getFont());
        this.textElement.setAttribute("font-size", this.fontSize);
        this.textElement.setAttribute("fill", this.textColor);
        
        this.lineElements = [];
        for(var index = 0; index < this.rows; index++) {
            
            this.lineElements.push(document.createElementNS(LCARS.svgNS, "tspan"));
            this.lineElements[index].setAttribute("id", this.id + "_" + index + LCARS.TEXT_SUFFIX);
            this.lineElements[index].setAttribute("x", 0);
            this.lineElements[index].setAttribute("dy", this.fontSize * this.lineSpacing);
            
            /* Set <code>tspan</code> attribute to preserve the space for blank lines, and initialize
             the line as blank. */
            this.lineElements[index].setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space","preserve");
            this.lineElements[index].textContent = "";
            
            /* Add the <code>tspan</code> SVG element to the parent SVG <code>textElement</code>. */
            this.textElement.appendChild(this.lineElements[index]);
        }
        
        this.element.appendChild(this.textElement);
        
        return "";
    }
    
    
    appendLine(lineOfText) {
        
        var resultString = this.wrap(lineOfText);
        var resultStringLength = resultString.length;
        
        for(var index = 0; index < resultStringLength; index++) {
            this.addLine(resultString[index]);
        }
    }
    
    
    addLine(lineOfText) {
        
        for(var index = 0; index < this.rows; index++) {
            if(this.lineElements[index] == "") {
                this.lineElements[index].textContent = lineOfText;
                break;
            }
            else {
                this.scrollUp();
                this.lineElements[this.rows-1].textContent = lineOfText;
                break;
            }
        }
    }
    
    
    wrap(lineOfText) {
        var resultStrings = [];
        
        var words = lineOfText.split(' ');
        var w, x, i, l;
//        var spaceWidth = LCARS.getTextWidth(' ', this.canvasFont);
        var spaceWidth = LCARS.getTextWidth3(' ', this.fontSize);
        var spaceLeft = this.width;
        
        var line = [];
        resultStrings.push(line);
        
        for(i = 0, l = words.length; i < l; i++ ) {
            w = words[i];
//            x = LCARS.getTextWidth(w, this.canvasFont) + spaceWidth;
            x = LCARS.getTextWidth3(w, this.fontSize) + spaceWidth;
            
            if( x > spaceLeft ) {
                line = [];
                resultStrings.push(line);
                line.push(w);
                spaceLeft = this.width - x;
            }
            else {
                spaceLeft = spaceLeft - x;
                line.push(w);
            }
        }
        
        for(i = 0, l = resultStrings.length; i < l; i++ ) {
            resultStrings[i] = resultStrings[i].join(' ');
            
            if(this.nowrap == true) {
                if(i != 0) {
                    delete resultStrings[i];
                }
            }
        }
        
        return resultStrings;
    }
    
    
    truncate(lineOfText) {
        var resultString = [];
        //var canvasFont = Math.round(this.fontSize*0.49) + "pt " + LCARS.getFont();
        
        var i = 0;
        while(LCARS.getTextWidth(resultString, this.canvasFont) < this.width) {
            resultString[i] = lineOfText[i];
            i++;
        }
        
        return resultString.join('');
    }
    

    setNoWrap(nowrap) {
        this.nowrap = nowrap;
    }
    
    
    initTextArea() {
        for(var index = 0; index < this.rows; index++) {
            this.lineElements[index].textContent = " ";
        }
    }
    
    
    setLineSpacing(spacing) {
        this.lineSpacing = spacing;
        for(var index = 0; index < this.rows; index++) {
            this.lineElements[index].setAttribute("dy", this.fontSize * this.lineSpacing);
        }
    }
    
    
    setTextFontSize(textFontSize) {
        this.fontSize = textFontSize;
        this.textElement.setAttribute("font-size", this.fontSize);
        this.setLineSpacing(this.lineSpacing);
    }
    
    
    setText(index, lineOfText) {
        this.lineElements[index].textContent = lineOfText;
    }
    
    
    clearText(index) {
        this.lineElements[index].textContent = " ";
    }
    
    
    clearTextArea() {
        for(var index = 0; index < this.rows; index++) {
            this.lineElements[index].textContent = "";
        }
    }
    
    
    scrollUp() {
        for(var index = 0; index < this.rows-1; index++) {
            this.lineElements[index].textContent = this.lineElements[index+1].textContent;
        }
        
        this.lineElements[this.rows-1].textContent = "";
    }
    
    
    getTextX() {
        return 0;
    }
    
    
    getTextY() {
        return 0;
    }

}




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




/**
 * LCARS Analog Clock component
 */
export class LCARSClockAnalog extends LCARSComponent {
    constructor(name, label, x, y, radius, properties, updateInterval, format) {
        super(name, label, x, y, properties);
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
        
        var thisObj = this; // Can't just pass "this" to the setInterval function.
        
        thisObj.intervalVariable = setInterval( (function(thisObj) { return function() { thisObj.update(); } })(this), thisObj.updateInterval );
    }
    

    /**
     * Function to stop the clock. It test the interval variable, and if it is not
     * null, it clears it.
     */
    stop() {
        if(!(this.intervalVariable == null)) {
            clearInterval(this.intervalVariable);
        }
    }
    
    
    /**
     * Function to update the clock with the current time. It gets passed to an
     * interval timer and will update the time and date at the rate set by the
     * interval variable.
     */
    update() {
        
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



/**
 * LCARS Clock component
 *
 */
export class LCARSClock extends LCARSComponent {
    constructor(name, label, x, y, properties, format) {
        super(name, label, x, y, properties);
        this.static = LCARS.ES_STATIC;  // Text is always static.
        this.textColor = this.getColor();
        
        this.format = format;
        
        this.timeoutVariable = null;
        
        this.drawText();
        
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
        
        /** Update to the current date and time. */
        var now = new Date();
        
        /** Initialize the format for the updated time date string. */
        var clockString = this.format;
        
        /** Format the updated current time date, and set the text field. */
        this.setText(this.formatString(clockString, now));

        var thisObj = this; // Can't just pass "this" to the setInterval function.
        var milliseconds = now.getMilliseconds();
        var newTimeout = 1000 - milliseconds;
        this.timeoutVariable = setTimeout((function(thisObj) { return function() { thisObj.update(); } })(this), newTimeout);

    }
    
    
    /**
     * Function to add a leading zero in front of numbers to the limit of the
     * length argument to support hours, minutes, seconds, and milliseconds.
     *
     * @param numberArg the number to pad with a leading zero
     * @param lengthArg the length of the number to pad leading zeros to
     */
    padLeadingZero(numberArg, lengthArg) {
        
        var number = numberArg + "";
        var length = lengthArg || 2;
        
        while (number.length < length) {
            number = "0" + number;
        }
        
        return number;
    }
    
    
    /**
     * Function to format the time and date output associated with the Date
     * object <code>now</code> argument based on the <code>formatString</code> argument.
     * <p>
     * Note that the order of the parse is important to support the regular expressions that
     * are used. See the notes embedded in the code.
     * <p>
     * The date format parameters are as follows:
     * <ul>
     * <li> yyyy - the four digit year
     * <li> yy   - the two digit year
     * <li> y    - the four digit year
     * <li> MMMM - the full name of the month
     * <li> MMM  - the abbreviated name of the month
     * <li> MM   - the month number with a leading zero
     * <li> M    - the month number without a leading zero
     * <li> dddd - the full name of the day
     * <li> ddd  - the abbreviated name of the day
     * <li> dd   - the day number with a leading zero
     * <li> d    - the day number without a leading zero
     * <li> HH   - the 24 hour number with a leading zero
     * <li> H    - the 24 hour number without a leading zero
     * <li> hh   - the 12 hour number with a leading zero
     * <li> h    - the 12 hour number without a leading zero
     * <li> mm   - the minutes number with a leading zero
     * <li> m    - the minutes number without a leading zero
     * <li> ss   - the seconds number with a leading zero
     * <li> s    - the seconds number without a leading zero
     * <li> fff  - the milliseconds number with two leading zeroes
     * <li> ff   - the milliseconds number with one leading zero
     * <li> f    - the milliseconds number without leading zeroes
     * <li> TT   - AM - PM upper case
     * <li> T    - AM - PM upper case single character (A, P)
     * <li> tt   - AM - PM lower case
     * <li> t    - AM - PM lower case single character (a, p)
     * <li> K    - the time zone offset from UTC in the form +/-00:00
     * <li> Z    - the three character abbreviated time zone
     *</ul>
     *
     * @param formatString the string to parse for the format parameters
     * @param now the Date object to format
     * @return the formatted date string
     */
    formatString(formatString, now) {
        
        /** Get all the time and date paramenters for the <code>now</code> argument. */
        var year = now.getFullYear();
        var month = now.getMonth() + 1; /** add 1, because January is zero. */
        var day = now.getDate();
        var dayOfWeek = now.getDay() + 1; /** add 1, because Sunday is zero. */
        var hour24 = now.getHours();
        var hour12 = hour24 > 12 ? hour24-12 : hour24==0 ? 12 : hour24;
        var meridiem = hour24 > 12 ? "PM" : "AM";
        var minute = now.getMinutes();
        var second = now.getSeconds();
        var millisecond = now.getMilliseconds();
        var timeZoneOffset = Math.abs(now.getTimezoneOffset());
        //var timeZoneOffset = Math.abs(timeZoneOffset);
        var tzHrs = Math.floor(timeZoneOffset / 60);
        var tzMin = timeZoneOffset % 60;
        var timeZoneOffsetString = timeZoneOffset > 0 ? "-" : "+";
        var timeZoneString = String(String(now).split("(")[1]).split(")")[0];
        
        timeZoneOffsetString += this.padLeadingZero(tzHrs) + ":" + this.padLeadingZero(tzMin);
        
        /** Parse the year paramenter, and replace it with the built year string. */
        formatString = formatString.replace(/(^|[^\\])yyyy+/g, "$1" + year);
        formatString = formatString.replace(/(^|[^\\])yy/g, "$1" + year.toString().substr(2,2));
        formatString = formatString.replace(/(^|[^\\])y/g, "$1" + year);
        
        /** Parse the month parameter, and replace it with the built month string. Note that
         month names are replaced by tokens to allow the rest of the parse to complete. They
         are replaced by the month strings when the rest of the parse is finished. */
        formatString = formatString.replace(/(^|[^\\])MMMM+/g, "$1" + LCARS.MONTHS[0]);
        formatString = formatString.replace(/(^|[^\\])MMM/g, "$1" + LCARS.MONTHS_ABBREVIATED[0]);
        formatString = formatString.replace(/(^|[^\\])MM/g, "$1" + this.padLeadingZero(month));
        formatString = formatString.replace(/(^|[^\\])M/g, "$1" + month);
        
        /** Parse the day parameter, and replace it with the built day string. Note that
         day names are replaced by tokens to allow the rest of the parse to complete. They
         are replaced by the day strings when the rest of the parse is finished. */
        formatString = formatString.replace(/(^|[^\\])dddd+/g, "$1" + LCARS.DAYS_OF_WEEK[0]);
        formatString = formatString.replace(/(^|[^\\])ddd/g, "$1" + LCARS.DAYS_OF_WEEK_ABBREVIATED[0]);
        formatString = formatString.replace(/(^|[^\\])dd/g, "$1" + this.padLeadingZero(day));
        formatString = formatString.replace(/(^|[^\\])d/g, "$1" + day);
        
        /** Parse the hour paramenter, and replace it with the built hour string. */
        formatString = formatString.replace(/(^|[^\\])HH+/g, "$1" + this.padLeadingZero(hour24));
        formatString = formatString.replace(/(^|[^\\])H/g, "$1" + hour24);
        formatString = formatString.replace(/(^|[^\\])hh+/g, "$1" + this.padLeadingZero(hour12));
        formatString = formatString.replace(/(^|[^\\])h/g, "$1" + hour12);
        
        /** Parse the minutes paramenter, and replace it with the built minutes string. */
        formatString = formatString.replace(/(^|[^\\])mm+/g, "$1" + this.padLeadingZero(minute));
        formatString = formatString.replace(/(^|[^\\])m/g, "$1" + minute);
        
        /** Parse the seconds paramenter, and replace it with the built seconds string. */
        formatString = formatString.replace(/(^|[^\\])ss+/g, "$1" + this.padLeadingZero(second));
        formatString = formatString.replace(/(^|[^\\])s/g, "$1" + second);
        
        /** Parse the year milliseconds, and replace it with the built milliseconds string. */
        formatString = formatString.replace(/(^|[^\\])fff+/g, "$1" + this.padLeadingZero(millisecond, 3));
        millisecond = Math.round(millisecond / 10);
        formatString = formatString.replace(/(^|[^\\])ff/g, "$1" + this.padLeadingZero(millisecond));
        millisecond = Math.round(millisecond / 10);
        formatString = formatString.replace(/(^|[^\\])f/g, "$1" + millisecond);
        
        /** Parse the meridiem paramenter, and replace it with the built meridiem string. */
        formatString = formatString.replace(/(^|[^\\])TT+/g, "$1" + meridiem);
        formatString = formatString.replace(/(^|[^\\])T/g, "$1" + meridiem.charAt(0));
        formatString = formatString.replace(/(^|[^\\])tt+/g, "$1" + meridiem.toLowerCase());
        formatString = formatString.replace(/(^|[^\\])t/g, "$1" + meridiem.toLowerCase().charAt(0));
        
        /** Parse the timezone offset paramenter, and replace it with the built timezone offset string. */
        formatString = formatString.replace(/(^|[^\\])K/g, "$1" + timeZoneOffsetString);
        
        /** Parse the timezone paramenter, and replace it with the timezone abbreviated name. */
        formatString = formatString.replace(/(^|[^\\])Z/g, "$1" + timeZoneString);
        
        /** Parse the month paramenter token, and replace it with the built month string. */
        formatString = formatString.replace(new RegExp(LCARS.MONTHS[0], "g"), LCARS.MONTHS[month]);
        formatString = formatString.replace(new RegExp(LCARS.MONTHS_ABBREVIATED[0], "g"), LCARS.MONTHS_ABBREVIATED[month]);
        
        /** Parse the day paramenter token, and replace it with the built day string. */
        formatString = formatString.replace(new RegExp(LCARS.DAYS_OF_WEEK[0], "g"), LCARS.DAYS_OF_WEEK[dayOfWeek]);
        formatString = formatString.replace(new RegExp(LCARS.DAYS_OF_WEEK_ABBREVIATED[0], "g"), LCARS.DAYS_OF_WEEK_ABBREVIATED[dayOfWeek]);
        
        /** return the formatted string. */
        return formatString;
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
    
}



const MAX_DAYS_IN_MONTH_DISPLAY = 42; /** 6 lines of 7 days */
/**
 * LCARS Calendar component - It provides a maximum six (6) week, seven (7) day array of days
 * with a month and year header.
 * <p>
 * The format of the days array is based on the starting day of the week for the month and the
 * number of days in the month. The weeks start on Sundays and end on Saturdays. Days for the
 * preceding and following months are blank. The days are color coded as follows:
 * <ul>
 * <li> Sunday    orange          <code>[EC_ORANGE]</code>
 * <li> Weekday   light blue      <code>[EC_L_BLUE]</code>
 * <li> Saturday  blue            <code>[EC_BLUE]</code>
 * <li> Today     yellow          <code>[EC_YELLOW]</code>
 * </ul>
 * <p>
 * Note: There is currently no convenience method for changing the color coding of the days.
 *
 * @author Perry Spagnola
 * Aversion 1.0
 */
export class LCARSCalendar extends LCARSComponent {
    constructor(name, x, y, font_size, daySpacing, properties) {
        super(name, "", x, y, properties | LCARS.ES_LABEL_E); /** Calendar doesn't have a label. */
        this.static = LCARS.ES_STATIC;  /** Calendar is always static. */
        this.textColor = this.getColor();
        
        this.font_size = font_size;
        
        this.daySpacing = daySpacing;
        
        /** Set the curretn day as today. */
        this.setToday();
        
        this.intervalVariable = null;
        
        /** Set the initial displayed month and year. */
        this.displayMonth = this.currentMonth;
        this.displayYear = this.currentYear;
        
        /** Create an array to hold 6 lines of 7 days. */
        this.displayDays = new Array(MAX_DAYS_IN_MONTH_DISPLAY);
        
        /** Draw the calendar SVG shape. */
        this.drawShape();
        
        /** Populate the calendar with month, year, and days. */
        this.updateCalendar();
        
    }
    
    
    /**
     * Draw the calendar component SVG shape.
     * <p>
     * Creates all of the SVG Text elements within a parent SVG element. There are two (2)
     * elements for the month and year header, and forty-two (42) <code>MAX_DAYS_IN_MONTH_DISPLAY</code>
     * elements for the days array of six (6) rows or weeks, and seven (7) cloumns or days.
     *
     * @return an empty string.
     */
    drawShape() {
        
        var header_offset = this.font_size * 2;
        
        this.monthText = new LCARSText("", this.displayMonthString, 0, 0, LCARS.ES_LABEL_C | LCARS.EC_L_BLUE);
        this.monthText.setTextFontSize(this.font_size);
        this.element.appendChild(this.monthText.element);
        
        this.yearText = new LCARSText("", this.displayYearString, 6 * this.font_size * this.daySpacing, 0, LCARS.ES_LABEL_E | LCARS.EC_L_BLUE);
        this.yearText.setTextFontSize(this.font_size);
        this.element.appendChild(this.yearText.element);
        
        
        for(var i=0; i<MAX_DAYS_IN_MONTH_DISPLAY; i++) {
            
            var y_offset = parseInt(i/7) * this.font_size * 2;
            var x_offset = i%7 * this.font_size * this.daySpacing;
            
            this.displayDays[i] = new LCARSText("day_" + i.toString(), i.toString(), x_offset, i+y_offset+header_offset, this.properties);
            this.displayDays[i].setTextFontSize(this.font_size);
            
            if(parseInt(i/7) == 1) {
                this.displayDays[i].textElement.setAttribute("x", 0);
            }
            
            this.element.appendChild(this.displayDays[i].element);
        }
        
        return "";
    }
    
    
    /**
     * This method updates the displayed calendar.
     * <p>
     * It retrieves the appropriate string literals, and formats the standard seven (7) day,
     * four (4) to six (6) week month array based on the starting day of the week for the
     * particular month. The weeks start on Sundays and end on Saturdays. The days are color
     * coded as follows:
     * <ul>
     * <li> Sunday    orange          <code>[EC_ORANGE]</code>
     * <li> Weekday   light blue      <code>[EC_L_BLUE]</code>
     * <li> Saturday  blue            <code>[EC_BLUE]</code>
     * <li> Today     yellow          <code>[EC_YELLOW]</code>
     * </ul>
     */
    updateCalendar() {
        
        /**
         * Get the strings for the display month and the display year for the calendar header.
         */
        this.displayMonthString = LCARS.MONTHS[this.displayMonth+1];
        this.displayYearString = this.displayYear.toString();
        
        /**
         * Set the month and year text for the calendar header.
         */
        this.monthText.setText(this.displayMonthString);
        this.yearText.setText(this.displayYearString);
        
        /**
         * Get the starting day of week for the month.
         */
        var startDay = this.dayOfWeek(this.displayMonth, 1, this.displayYear);
        
        /**
         * Get the number of the days in the display month.
         */
        var daysInMonth = this.getDaysInMonth(this.displayMonth, this.displayYear);
        
        
        /**
         * Clear the calendar of text, and fill it with the appropriate days
         * for the display month and the display year.
         */
        for(var i=0; i<MAX_DAYS_IN_MONTH_DISPLAY; i++) {
            if(i < startDay || i > startDay+daysInMonth-1) {
                this.displayDays[i].setText("");
            }
            else {
                var day = i-startDay+1;
                this.displayDays[i].setText(day);
                
                if(this.isWeekday(day)) {
                    this.displayDays[i].textElement.setAttribute("fill", LCARS.getColor(LCARS.EC_L_BLUE));
                }
                if(this.isSunday(parseInt(day))) {
                    this.displayDays[i].textElement.setAttribute("fill", LCARS.getColor(LCARS.EC_ORANGE));
                }
                if(this.isSaturday(day)) {
                    this.displayDays[i].textElement.setAttribute("fill", LCARS.getColor(LCARS.EC_BLUE));
                }
                
                if(this.isToday(day)) {
                    this.displayDays[i].textElement.setAttribute("fill", LCARS.getColor(LCARS.EC_YELLOW));
                }
            }
        }
    }
    
    
    /**
     * This method is run once a second to detect the day roll-over. So, the calendar can
     * be automatically updated. When the roll-over is detected, the new day is set as "today",
     * and the display is updated.
     */
    update() {
        
        /** Get the current date. */
        var rightNow = new Date();
        
        /**
         * Compare the current date (year, month, and day of month) to the date stored by
         * the <code>setToday()</code> method. If they are not the same, set the new today,
         * and update the displayed calendar.
         */
        if(!(rightNow.getYear() == this.now.getYear()) ||
           !(rightNow.getMonth() == this.now.getMonth()) ||
           !(rightNow.getDate() == this.now.getDate())) {
            //alert("now: " + this.now.getYear() + ", " + this.now.getMonth() + ", " + this.now.getDate() +
            //      "  right now: " + rightNow.getYear() + ", " + rightNow.getMonth() + ", " + rightNow.getDate());
            this.setToday();
            this.displayMonth = this.currentMonth;
            this.displayYear = this.currentYear;
            this.updateCalendar();
        }
    }
    
    
    /**
     * Function to start the auto update of the calendar. It retrieves a reference
     * to the calendar object, and passes it to an interval timer. The update interval
     * is fixed to one second.
     */
    startAutoUpdate() {
        var thisObj = this; // Can't just pass "this" to the setInterval function.
        
        thisObj.intervalVariable = setInterval( (function(thisObj) { return function() { thisObj.update(); } })(this), 1000); // Update is fixed to one second.
    }
    
    /**
     * Function to stop the auto update of the calendar. It test the interval variable,
     * and if it is not null, it clears it.
     */
    stopAutoUpdate() {
        if(!(this.intervalVariable == null)) {
            clearInterval(this.intervalVariable);
        }
    }
    
    
    /**
     * Function to clear the calendar day SVG elements of text.
     * <p>
     * A convenience function for clearing the day elements of text. The SVG text of each
     * element is set to an empty string. Not really necessary, since the method that updates
     * the calendar array of days resets the text of the entire array.
     */
    clearCalendarText() {
        for(var i=0; i<MAX_DAYS_IN_MONTH_DISPLAY; i++) {
            this.displayDays[i].setText("");
        }
    }
    
    
    /** Function to set the spacing between the day elements of the calendar.
     *
     * @param spaceMultiplier multiplies the font size to produce a space between the day elements
     */
    setDaySpacing(spaceMultiplier) {
        this.daySpacing = spaceMultiplier;
    }
    
    
    
    /**
     * Set the calendar object's date to today's date.
     */
    setToday() {
        /** Get the current date and time. */
        this.now = new Date();
        
        /** Set the object's <code>today</code> attribute to the current date. */
        this.today = this.now.getDate();
        
        /** Set the object's current month and year from the current date/time.
         Add 1900 to the current year to get a valid four digit year. Note: javascript
         counts years from 1900 (a Y2K thing). */
        this.currentMonth = this.now.getMonth();
        this.currentYear  = this.now.getYear();
        this.currentYear += 1900;
    }
    
    
    /**
     * Returns <code>true</code> if the year is a four (4) digit year.
     *
     * @param year the year as a number
     */
    isFourDigitYear(year) {
        
        /** First, check to make sure the argument is a number. If not, return <code>false</code>. */
        if(isNaN(year)) {
            return false;
        }
        /** If it is a number, check the length. If length is 4, return <code>true</code>,
         else <code>false</code>. */
        else if(year.toString().length == 4) {
            return true;
        }
        else {
            return false;
        }
    }
    
    
    /**
     * Decrement the year for the displayed calendar month.
     */
    decrementYear() {
        var year  = this.displayYear - 1;
        if (this.isFourDigitYear(year)) {
            this.displayYear = year;
            this.updateCalendar();
        }
    }
    
    
    /**
     * Decrement the month for the displayed calendar.
     */
    decrementMonth() {
        var month  = this.displayMonth - 1;
        if (month < 0) {
            month = 11;
        }
        this.displayMonth = month;
        this.updateCalendar();
    }
    
    
    /**
     * Increment the year for the displayed calendar month.
     */
    incrementYear() {
        var year  = this.displayYear + 1;
        if (this.isFourDigitYear(year)) {
            this.displayYear = year;
            this.updateCalendar();
        }
        else {
            alert("displayYear + 1: " + this.displayYear + "  is not a 4 digit year.");
        }
    }
    
    
    /**
     * Increment the month for the displayed calendar.
     */
    incrementMonth() {
        var month  = this.displayMonth + 1;
        if (month > 11) {
            month = 0;
        }
        this.displayMonth = month;
        this.updateCalendar();
    }
    
    
    /**
     * Returns true if the argument specified four digit year is a leap year.
     *
     * @param year the four digit year
     * @return  true if the given year is a leap year, false, if not
     */
    isLeapYear(year) {
        /**
         * If the current year is evenly divisible by 4 and not by 100, return true.
         */
        if((year % 4 == 0) && (year % 100 != 0)) {
            return true;
        }
        
        /**
         * If the current year is evenly divisible by 400, return true.
         */
        if(year % 400 == 0) {
            return true;
        }
        
        /**
         * If none of the leap year conditions is met, method falls through,
         * and returns false.
         */
        return false;
    }
    
    
    /**
     * Returns the day of the week according to the Gregorian calendar, given
     * the <code>month</code>, <code>day</code>, and <code>year</code>.
     * January through December equal 0 - 11, and Sunday through Saturday equal
     * 0 - 6.
     * @param month  the month of the date
     * @param day  the day of the date
     * @param year  the year of the date
     * @return  the day of the week according to the Gregorian calendar
     */
    dayOfWeek(month, day, year) {
        
        var date = new Date(year, month, day);
        
        return date.getDay();
    }
    
    
    /**
     * Returns <code>true</code> if the day of the week integer argument is greater
     * than Sunday (0) and less than Saturday (6).
     * <ul>
     * <li>Sunday = 0</li>
     * <li>Monday = 1</li>
     * <li>Tuesday = 2</li>
     * <li>Wednesday = 3</li>
     * <li>Thursday = 4</li>
     * <li>Friday = 5</li>
     * <li>Saturday = 6</li>
     * </ul>
     *
     * @param day an integer between 1 and 5 inclusive to return <code>true</code>, else <code>false</code>
     * @return <code>true</code> if weekday (Mon - Fri), <code>false</code> if not
     */
    isWeekday(day) {
        var _day = this.dayOfWeek(this.displayMonth, day, this.displayYear);
        
        if(_day > 0 && _day < 6) {
            return true;
        }
        else {
            return false;
        }
    }
    
    
    /**
     * Returns <code>true</code> if the <code>day</code> argument indicates a Sunday, an integer 0.
     *
     * @param day an integer value for the day
     * @return <code>true</code> if Sunday, <code>false</code> if not
     */
    isSunday(day) {
        
        var date = new Date(this.displayYear, this.displayMonth, day);
        
        var _day = date.getDay();
        
        if(_day == 0) {
            return true;
        }
        else {
            return false;
        }
    }
    
    
    /**
     * Returns <code>true</code> if the <code>day</code> argument indicates a Saturday, an integer 6.
     *
     * @param day an integer value for the day
     * @return <code>true</code> if Saturday, <code>false</code> if not
     */
    isSaturday(day) {
        var _day = this.dayOfWeek(this.displayMonth, day, this.displayYear);
        
        if(_day == 6) {
            return true;
        }
        else {
            return false;
        }
    }
    
    
    /**
     * Returns <code>true</code> if the <code>day</code> argument indicates the current day.
     *
     * @param day an integer value for the day
     * @return <code>true</code> if today, <code>false</code> if not
     */
    isToday(day) {
        if(this.displayYear == this.currentYear && this.displayMonth == this.currentMonth && day == this.today) {
            return true;
        }
        else {
            return false;
        }
    }
    
    
    /**
     * Returns the number of days in the argument specified month and year.
     *
     * @param month  the integer (0 - 11) identifier of the month
     * @param year  the four digit year
     */
    getDaysInMonth(month, year) {
        var days = 31;
        
        if(month == 3 || month == 5 || month == 8 || month == 10) {
            days = 30;
        }
        else if(month == 1 ) {
            if(this.isLeapYear(year)) {
                days = 29;
            }
            else {
                days = 28;
            }
        }
        return days;
    }
    
}


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
        
        /* Create the DOM object for the first period shape animation, and set its attributes. */
        this.animateElement2 = document.createElementNS(LCARS.svgNS, "animate");
        this.animateElement2.setAttribute("id", this.element.id + "_shape_2_Animate");
        this.animateElement2.setAttribute("attributeType", "XML");
        this.animateElement2.setAttribute("attributeName", "opacity");
        this.animateElement2.setAttribute("repeatCount", "indefinite");
        this.animateElement2.setAttribute("dur", "1s");
        this.animateElement2.setAttribute("values", "0;1;0");
        this.animateElement2.setAttribute("begin", "0.2");
        
        /* Create the DOM object for the first period shape animation, and set its attributes. */
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




