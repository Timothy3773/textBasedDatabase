const fs = require('fs-extra');
const UserDataFormatter = require('./userData')

class FileModule {
    constructor(filePath) {
        this.file = fs.readFileSync(filePath, { encoding: "utf8" })
        this.filePath = filePath
    }

    get data() {
        return this.file
    }

    get subjects() {
        let datasets = this.data.split('/').filter(ds => ds !== "")
        return datasets.map((user, index, db) => {
            let divider = user.split(';')
            let firstName = divider[0].split('.')[0]
            let lastName = divider[0].split('.')[1]
            let dateContent = divider[1].split(':')
            let expirationDate = {
                year: dateContent[0],
                month: dateContent[1],
                day: dateContent[2],
                hour: dateContent[3],
                minute: dateContent[4],
                second: dateContent[5]
            }
            return { fullName: `${firstName} ${lastName}`, firstName: firstName, lastName: lastName, expirationDate: expirationDate, details: new UserDataFormatter.UserData(firstName, lastName, expirationDate) }
        })
    }

    /**
     * @param {String} firstName 
     * @param {String} lastName 
     * @param {import('moment').MomentInput} expirationDate 
     */
    addSubject = (firstName, lastName, expirationDate) => {
        fs.appendFile(this.filePath, `${firstName.toUpperCase()}.${lastName.toUpperCase()};${UserDataFormatter.formatTime(expirationDate)}/`)
    }
}

module.exports = FileModule