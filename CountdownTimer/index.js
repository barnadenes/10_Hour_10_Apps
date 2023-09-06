const releaseDate = new Date('2023-09-24T06:30:00').getTime();

// Getters
const ElDays = document.getElementById("days");
const ElHours = document.getElementById("hours");
const ElMinutes = document.getElementById("minutes");
const ElSeconds = document.getElementById("seconds");

//Time variables
const seconds = 1000;
const minutes = seconds * 60;
const hours = minutes * 60;
const days = hours * 24;

function set() {
    const currentDate = new Date().getTime();
    let difference = releaseDate - currentDate;

    let textDay = Math.floor(difference / days);
    let textHours = Math.floor((difference % days) / hours);
    let textMinutes = Math.floor((difference % hours) / minutes);
    let textSeconds = Math.floor((difference % minutes) / seconds);

    // Formating
    textDay = textDay<10?"0"+textDay:textDay;
    textHours = textHours<10?"0"+textHours:textHours;
    textMinutes = textMinutes<10?"0"+textMinutes:textMinutes;
    textSeconds = textSeconds<10?"0"+textSeconds:textSeconds;

    // Setters
    ElDays.innerHTML = textDay;
    ElHours.innerHTML = textHours;
    ElMinutes.innerHTML = textMinutes;
    ElSeconds.innerHTML = textSeconds;

}

set();

setInterval(set, 1000);


// I thought this would work but of course it didn't >.<

/*     let seconds = currentDate.getSeconds() - releaseDate.getSeconds();
    let minutes = currentDate.getMinutes() - releaseDate.getMinutes();
    let hours = currentDate.getHours() - releaseDate.getHours();
    let days = currentDate.getDay() - releaseDate.getDay();

    // Formating
    days = days<10?"0"+days:days;
    hours = hours<10?"0"+hours:hours;
    minutes = minutes<10?"0"+minutes:minutes;
    seconds = seconds<10?"0"+seconds:seconds; 
*/
