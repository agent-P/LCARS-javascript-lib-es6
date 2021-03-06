import { LCARS } from './LCARS';
import { ICONS } from './ICONS';
import { LCARSComponent } from './LCARSComponent';


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
        var meridiem = hour24 >= 12 ? "PM" : "AM";
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



