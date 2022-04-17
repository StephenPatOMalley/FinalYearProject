var CurrentTime = require('../time/FindCurrentTIme')

function FindTime(period){

    let lastTime = ""
    let date = "", time = ""
    let year = "", month = "", day = ""
    let hours = "", minutes = "", seconds = ""
  
    let currentDate = CurrentTime()
    let currentSplitDate = currentDate.split("T")
    if(currentSplitDate.length == 2){
      date = currentSplitDate[0]
      time = currentSplitDate[1]
      if( period == "Hourly"){
        let lasthour = ""
        let timeSplit = time.split(":")
        if(timeSplit.length == 3){
          hours = timeSplit[0]
          minutes = timeSplit[1]
          seconds = timeSplit[2]
        }
        let lasthourInt = parseInt(hours.trim()) - 1
        if( lasthourInt < 10){
          lasthour = "0" + lasthourInt.toString()
        }
        else{
          lasthour = lasthourInt.toString()
        }
        lastTime = date + "T" + lasthour + ":" + minutes + ":" + seconds
        return lastTime
      }
    }
    let dateSplit = date.split("-")
    if(dateSplit.length == 3){
      year = dateSplit[0]
      month = dateSplit[1]
      day = dateSplit[2]
    }
    if( period == "Daily" ){
      let lastDayInt = parseInt(day.trim()) - 1
      let lastDay = lastDayInt.toString()
      lastTime = year + "-" + month + "-" + lastDay + "T" + time
      return lastTime
    }
    if( period == "Weekly" ){
      let lastDay = ""
      let lastDayInt = parseInt(day.trim()) - 7
      if( lastDayInt < 10){
        lastDay = "0" + lastDayInt.toString()
      }
      else{
        lastDay = lastDayInt.toString()
      }
      lastTime = year + "-" + month + "-" + lastDay + "T" + time
      return lastTime
    }
} 

module.exports = FindTime