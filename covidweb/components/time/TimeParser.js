
function GetTime(timeResult, Format){
    if(Format == "Hours"){
        var hoursResult = GetTimeHours(timeResult)
        return hoursResult
    }
    if(Format == "UTC-Date"){
        var UTCResult = GetTimeUTC(timeResult)
        return UTCResult
    }
}

function GetTimeUTC(timeResult){

    var timeResultsSplit = SplitT(timeResult)
    var date = timeResultsSplit[0]
    var time = timeResultsSplit[1]

    var dateSplit = SplitMinus(date)
    var year = parseInt(dateSplit[0])
    var month = parseInt(dateSplit[1])
    var day = parseInt(dateSplit[2])

    var timeSplit = SplitColon(time)
    var hours = parseInt(timeSplit[0])
    var minutes = parseInt(timeSplit[1])
    var secondsAndMilli = timeSplit[2]
    
    var secondsAndMilliSSplit = SplitFullStop(secondsAndMilli)
    var seconds = parseInt(secondsAndMilliSSplit[0])

    const newDateUTC = {
        Year: year,
        Month: month,
        Day: day,
        Hours: hours,
        Minutes: minutes,
        Seconds: seconds
    }

    return newDateUTC
}

function GetTimeHours(timeResult){
    var timeResultsSplit = SplitT(timeResult)
    var time = timeResultsSplit[1]

    var timeSplit = SplitFullStop(time)
    var hmsFormat = timeSplit[0]

    var hmsFormatSplit = SplitColon(hmsFormat)
    var hours = hmsFormatSplit[0]

    var hoursInt = parseInt(hours)
    return hoursInt
}

// These Split Functions Return lists of split string values
function SplitT(timeISOT){
    var dateAndTime = timeISOT.split("T")
    if(dateAndTime.length == 2)
        return dateAndTime // "2022-04-15" "18:18:37.791Z"
    else
        return null

}

function SplitMinus(timeISOMinus){
    var date = timeISOMinus.split("-")
    if(date.length == 3)
        return date // "2022" "04" "15"
    else
        return null
}

function SplitColon(timeISOColon){
    var time = timeISOColon.split(":")
    if(time.length == 3)
        return time // "18" "18" "37.791Z"
    else
        return null
}

function SplitFullStop(timeISOFullStop){
    var seconds = timeISOFullStop.split(".")
    if(seconds.length == 2)
        return seconds // "37" "791Z"
    else
        return null
}


export default GetTime;