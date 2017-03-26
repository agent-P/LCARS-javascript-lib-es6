import { LCARS } from './LCARS';
import { ICONS } from './ICONS';
import { LCARSComponent } from './LCARSComponent';
import { LCARSText } from './LCARSText';

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



