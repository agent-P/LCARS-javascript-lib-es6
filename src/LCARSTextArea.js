import { LCARS } from './LCARS';
import { ICONS } from './ICONS';
import { LCARSComponent } from './LCARSComponent';


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



