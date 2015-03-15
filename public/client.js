$(document).ready(function() {

  $(".user-form").submit(function(event) {
    event.preventDefault();
    $.post("/", $(this).serialize())
      .done(function(user) {
        user = JSON.parse(user);
        console.log("Life expectancy: " + user.life_expectancy);
        var life_expectancy = user.life_expectancy;
        $(".clock").text(getDeathDate(life_expectancy));
      })
      .fail(function() {
        console.log("There was an error...");
      });
  });

  function getDeathDate(life_expectancy) {
    var deathDate = new Date();
    console.log("Now: " + deathDate);
    var deathYear = deathDate.getFullYear() + Math.round(life_expectancy);
    deathDate.setFullYear(deathYear);
    console.log("Death Date: " + deathDate);
    return deathDate;
  };
});
