$(document).ready(function() {
  $(".user-info").submit(function(event) {
    event.preventDefault();
    $.post("/", $(this).serialize())
      .done(function(user) {
        console.log(user);
        user = JSON.parse(user);
        console.log("Life expectancy: " + user.life_expectancy);
      })
      .fail(function() {
        console.log("There was an error...");
      });
  });
});
