var CurrentTime = require("../time/FindCurrentTIme");

function FindTime(period) {
  var Date = CurrentTime();
  if (period == "Hourly") {
    var hourlyResults = FindTimeHourly(Date)
    return hourlyResults
  }
  if (period == "Daily") {
    var dailyResults = FindTimeDaily(Date)
    return dailyResults
  }
  if (period == "Weekly") {
    var weeklyResults = FindTimeWeekly(Date)
    return weeklyResults
  } else {
    console.log("Error ----", period, "----", Date);
  }
}


function FindTimeHourly(currenttime){
  var getYesterday = 0
  var currentTimeSplit_H = SplitT(currenttime)
  var date_H = currentTimeSplit_H[0]
  var time_H = currentTimeSplit_H[1]

  var timeSplit_H = SplitColon(time_H)
  var hours_H = timeSplit_H[0]
  var minutes_H = timeSplit_H[1]
  var seconds_H = timeSplit_H[2]

  var lasthourInt_H = parseInt(hours_H.trim())
  if(lasthourInt_H == 0){
    getYesterday = 1
    lasthourInt_H == 23
  }
  else{
    lasthourInt_H -= 1
  }

  var lasthour_H = TimeFormatZero(lasthourInt_H)

  var lastTime_H = date_H + "T" + lasthour_H + ":" + minutes_H + ":" + seconds_H
  if (getYesterday == 1){
    var lastTime_H_Day = FindTimeDaily(lastTime_H)
    return lastTime_H_Day
  }
  else{
    return lastTime_H
  }
}

function FindTimeDaily(currenttime){
  const dailyRange = 1
  var FindTimeDaysDResults = FindTimeDays(currenttime, dailyRange)
  return FindTimeDaysDResults
}

function FindTimeWeekly(currenttime){
  const weeklyRange = 7
  var FindTimeDaysWResults = FindTimeDays(currenttime, weeklyRange)
  return FindTimeDaysWResults
}

function FindTimeDays(currenttime, timerange){
  var currentTimeSplit_Day = SplitT(currenttime)
  var date_Day = currentTimeSplit_Day[0]
  var time_Day = currentTimeSplit_Day[1]

  var dateSplit_Day = SplitMinus(date_Day)
  var year_Day = dateSplit_Day[0]
  var month_Day = dateSplit_Day[1]
  var day_Day = dateSplit_Day[2]

  var lastDayInt_Day = parseInt(day_Day.trim())
  if(lastDayInt_Day == 1){
    LastMonth_Day = parseInt(month_Day.trim()) - 1
    lastDayInt_Day = FindEndLastMonth(lastMonth_Day)
    month_Day = TimeFormatZero(lastMonth_Day)
  }
  else{
    lastDayInt_Day -= timerange
  }

  var lastDay_Day = TimeFormatZero(lastDayInt_Day)

  var lastTime = year_Day + "-" + month_Day + "-" + lastDay_Day + "T" + time_Day
  return lastTime

}

function FindEndLastMonth(lastmonth){
  var lastMonthsNumberDays = 0
  switch (lastmonth) {
    case 1:
      lastMonthsNumberDays = 31
      break;
    case 2:
      lastMonthsNumberDays = 28
      break;
    case 3:
      lastMonthsNumberDays = 31
      break;
    case 4:
      lastMonthsNumberDays = 30
      break;
    case 5:
      lastMonthsNumberDays = 31
      break;
    case 6:
      lastMonthsNumberDays = 30
      break;
    case 7:
      lastMonthsNumberDays = 31
      break;
    case 8:
      lastMonthsNumberDays = 31
      break;
    case 9:
      lastMonthsNumberDays = 30
      break;
    case 10:
      lastMonthsNumberDays = 31
      break;
    case 11:
      lastMonthsNumberDays = 30
      break;
    case 12:
      lastMonthsNumberDays = 31
      break;
    default:
      return null;
  } 
  return lastMonthsNumberDays
}

function TimeFormatZero(time){
  if( time < 10){
    lastTime = "0" + time.toString()
  }
  else{
    lastTime = time.toString()
  }
  return lastTime
}

// These Split Functions Return lists of split string values
function SplitT(timeISOT) {
  var dateAndTime = timeISOT.split("T");
  if (dateAndTime.length == 2) return dateAndTime; // "2022-04-15" "18:18:37.791Z"
  else return null;
}

function SplitMinus(timeISOMinus) {
  var date = timeISOMinus.split("-");
  if (date.length == 3) return date; // "2022" "04" "15"
  else return null;
}

function SplitColon(timeISOColon) {
  var time = timeISOColon.split(":");
  if (time.length == 3) return time; // "18" "18" "37.791Z"
  else return null;
}

module.exports = FindTime;
