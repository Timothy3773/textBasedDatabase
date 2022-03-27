const moment = require('moment');

class UserData {
    /**
     * 
     * @param {String} firstName 
     * @param {String} lastName 
     * @param {String} expirationDate Time until death, format below.
     * #### Format
     * `YEAR:MONTH:DAY:HOUR:MINUTE:SECOND`
     * 
     * `2002:11:15:01:12:59`
     */
    constructor(firstName, lastName, expirationDate) {
        this.firstName = firstName
        this.lastName = lastName
        this.expirationDate = expirationDate
    }

    get raw() {
        return `${this.firstName}.${this.lastName};${this.expirationDate}`
    }

    /**
     * 
     * @param {String} expirationDate 
     */
    get timeRemaining() {
        return moment.duration(moment(this.expirationDate).diff(new Date()))._data
    }
}

/**
 * 
 * @param {any} date 
 * @returns 
 */
var formatTime = (date) => {
    return date.format("YYYY:MM:DD:hh:mm:ss")
}

module.exports = { UserData, formatTime }