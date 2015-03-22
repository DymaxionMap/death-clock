$(document).ready(function() {
  var msPerSecond = 1000;
  var secPerYear = 31536000;
  var secPerDay = 86400;
  var secPerHour = 3600;
  var secPerMinute = 60;
  var intervalId;

  $(".user-form").submit(function(event) {
    event.preventDefault();
    $.post("/", $(this).serialize())
      .done(function(user) {
        user = JSON.parse(user);
        console.log("Life expectancy: " + user.life_expectancy);
        var life_expectancy = user.life_expectancy;
        var secondsLeft = life_expectancy * secPerYear;
        var time;
        runClock(secondsLeft);
        $(".clock").show();
        $(".reset").show();
        $(".user-form").hide();
      })
      .fail(function() {
        console.log("There was an error submitting the form...");
      });
  });

  $(".reset").on("click", function() {
    clearInterval(intervalId);
    $(".clock").hide();
    $(".reset").hide();
    $(".user-form").show();
  });

  function runClock(secondsLeft) {
    intervalId = setInterval(function() {
      time = getTimeLeft(secondsLeft);
      $(".clock").text(clockMessage(time));
      secondsLeft--;
      if (secondsLeft < 0) {
        clearInterval(intervalId);
      }
    }, 1000);
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
  };

  function clockMessage(time) {
    var msg = "You have ";
    msg += time.years + " years ";
    msg += time.days + " days ";
    msg += time.hours + " hours ";
    msg += time.minutes + " minutes ";
    msg += time.seconds + " seconds ";
    msg += " left to live.";
    return msg;
  }

});
