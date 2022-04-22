function GetHourChange(){
    let time = new Date()
    let currentMinutes = time.getUTCMinutes()
    return currentMinutes
}

module.exports = GetHourChange