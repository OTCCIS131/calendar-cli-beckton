const M = require('moment')
const _ = require('lodash')
const chalk = require('chalk')
const MomentRange = require('moment-range')

const moment = MomentRange.extendMoment(M)

let year = moment().range('year')

_.forEach(Array.from(year.by('months')), month => {
    console.log(_.pad(month.format('MMMM'), 26, '-'))
    console.log('S   M   T   W   R   F   S   ')

     let monthRange = month.range('month')
     let firstDay = monthRange.start.day()
 
    // console.log(firstDay)
    // Here, we get an array of days in the month
    let days = Array.from(monthRange.by('days'))

    // Then, we'll perform several operations on this array of days 
    _.chain(days)//chain object/wrapper //[moment objects]
    .map(day =>{
        let output = day.format('DD')
            // TODO: Highlight birthdays
            // output = chalk.blue(output)
            if (day.month() == 08 && day.date() == 10) {
                output = chalk.bgMagenta(output)              
            }
            if (day.month() == 10 && day.date() == 16) {
                output = chalk.bgBlue(output)
            }
            if (day.month() == 11 && day.date() == 14) {
                output = "🎉"
            }
            
        return output
    })//[01, 02, 03, 04, 05, 06, 07]
    .tap(days => {
        for (i = 0; i < firstDay; i++)
        {
            days.unshift('  ')
        }
    })//["  ", "  ", "  ", 01, 02, 03, 04]
    .chunk(7)//[["  ","  ","  ",01,02,03,04],[05,06...]]
    .forEach(week => {
        //[ , , , 01, 02]
        console.log(week.join('  '))
    })
    .value()

    console.log('') // Puts a blank line between each month

 }) 

//     let days = [ moment objects]; firstDay = #

//     let padded = days.map(day =>{
//         return day.format('DD')
//     })//gets called for every value in your array and whats returned is the new value in the new array
//     //[01. 02, 03, 04, 05, 06, 07]
//     for(let i = 0; i < fristDay; i++)
//     {
//         padded.unshift("  ")
//     }
//     let chunked _.chunk(padded, 7)
//     chunked.forEach{
//         do things
//     }
// /////////////////////////better way
//     let days = [ moment objects]; firstDay = #

//     _.chain(days)//chain object/wrapper //[moment objects]
//     .map(day =>{
//         return day.format('DD')
//     })//[01, 02, 03, 04, 05, 06, 07]
//     .tap(days => {
//         for (firstDay > -1; firstDay--{  /// or for(let i = 0; i < firstDay; i++{    unshift....})
//             unshift.....
//         })//["  ", "  ", "  ", 01, 02, 03, 04]
//     })
//     .chunk(7)
//     .value()