function GetCurrentTime(){
    let time = new Date()
    let currentDate = time.toISOString()
    return currentDate
}
  
module.exports = GetCurrentTime