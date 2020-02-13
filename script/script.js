$(function() {
  console.log("ready!");
  $("#myImg").hover(
    function() {
      $(this).attr("src", "animatedImg.gif");
    },
    function() {
      $(this).attr("src", "staticImg.jpg");
    }
  );
});
