$(document).ready(function() {
  var msPerSecond = 1000;
  var secPerYear = 31536000;
  var secPerDay = 86400;
  var secPerHour = 3600;
  var secPerMinute = 60;

  $(".user-form").submit(function(event) {
    event.preventDefault();
    $.post("/", $(this).serialize())
      .done(function(user) {
        user = JSON.parse(user);
        console.log("Life expectancy: " + user.life_expectancy);
        var life_expectancy = user.life_expectancy;
        var secondsLeft = life_expectancy * secPerYear;
        var years = numYears(secondsLeft);
        var days = numDays(secondsLeft);
        var hours = numHours(secondsLeft);
        var minutes = numMinutes(secondsLeft);
        var seconds = numSeconds(secondsLeft);
        var string = years + " years " + days + " days " + hours + " hours " +
          minutes + " minutes " + seconds + " seconds left to live."
        $(".clock").text("You have " + string);
      })
      .fail(function() {
        console.log("There was an error...");
      });
  });

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

});
