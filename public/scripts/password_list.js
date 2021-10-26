//Scripts for password list

$(() => {

  //Show buttons/name on hover
  $(".hidden").mouseenter(function() {
    $(this).css("opacity", "1");
  }).mouseleave( function() {
    $(this).css("opacity", "0");
  });

})
