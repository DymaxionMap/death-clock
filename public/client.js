$(document).ready(function() {
  var msPerSecond = 1000;
  var secPerYear = 31536000;
  var secPerDay = 86400;
  var secPerHour = 3600;
  var secPerMinute = 60;
  var msPerYear = secPerYear * msPerSecond;
  var intervalId;
  var storedTime = localStorage.getItem('deathTime');

  if (storedTime) {
    resumeClock(storedTime);
  }

  $(".user-form").submit(function(event) {
    event.preventDefault();
    $.post("/", $(this).serialize())
      .done(function(user) {
        user = JSON.parse(user);
        console.log("Life expectancy: " + user.life_expectancy);
        var deathTime = getDeathTime(user.life_expectancy * msPerYear);
        localStorage.setItem('deathTime', deathTime);
        runClock(secondsLeft(deathTime));
        clockView();
      })
      .fail(function() {
        console.log("There was an error submitting the form...");
      });
  });

  $(".reset").on("click", function() {
    formView();
    clearInterval(intervalId);
    localStorage.removeItem("deathTime");
  });

  function clockView() {
    $(".clock").show();
    $(".reset-wrapper").show();
    $(".user-form").hide();
  }

  function formView() {
    $(".clock").hide();
    $(".reset-wrapper").hide();
    $(".user-form").show();
  }

  function runClock(seconds) {
    intervalId = setInterval(function() {
      displayTime(getTimeLeft(seconds));
      seconds--;
      if (seconds < 0) {
        clearInterval(intervalId);
      }
    }, 1000);
  }

  function displayTime(time) {
    $(".display").text(time.years +
      " years " +
      time.days +
      " days " +
      time.hours +
      " hours " +
      time.minutes +
      " minutes " +
      time.seconds +
      " seconds")
  }

  function numYears(seconds) {
    return Math.floor(seconds / secPerYear);
  }

  function numDays(seconds) {
    return Math.floor((seconds % secPerYear) / secPerDay);
  }

  function numHours(seconds) {
    return Math.floor(((seconds % secPerYear) % secPerDay) / secPerHour);
  }

  function numMinutes(seconds) {
    return Math.floor((((seconds % secPerYear) % secPerDay) % secPerHour) /
        secPerMinute);
  }

  function numSeconds(seconds) {
    return (((seconds % secPerYear) % secPerDay) % secPerHour) % secPerMinute;
  }

  function getTimeLeft(seconds) {
    return {
      years: numYears(seconds),
      days: numDays(seconds),
      hours: numHours(seconds),
      minutes: numMinutes(seconds),
      seconds: numSeconds(seconds)
    }
  }

  function getDeathTime(lifeExpectancy) {
    var now = new Date();
    return now.getTime() + lifeExpectancy;
  }

  function resumeClock(storedTime) {
    runClock(secondsLeft(storedTime));
    clockView();
  }

  function secondsLeft(deathTime) {
    var now = new Date();
    var msLeft = deathTime - now.getTime();
    return Math.floor(msLeft / msPerSecond);
  }
});
