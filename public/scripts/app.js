import { animateSideBarIn, animateSideBarOut } from '../scripts/anim.js'

$(() => {

  /******  CLICK HANDLERS GO HERE *******/


  $(".edit_btn").on("click", function(e) {
    const $container =  $(this).closest("li").next();
    $container.addClass("in_view");
    animateSideBarIn($container);
  })

  //Close edit form when cancel button is clicked
  $(".cancel_btn").on("click", function() {
    //Reset to hidden state
    const $editContainer = $(this).closest(".edit_password_container");
    const $createrContainer = $(this).closest(".create_new_password_container");
    animateSideBarOut($editContainer);
    animateSideBarOut($createrContainer);
    $(".viewport_overlay").toggleClass("is_hidden");
  })

  //Shows the add passord form when the + button is pressed
  $(".create_new_password").on("click", function() {
    //Un hiddens form
    const $container = $(".create_new_password_container");
    $container.addClass("in_view");
    animateSideBarIn($container);
    $(".viewport_overlay").removeClass("is_hidden");
    const $formFields = $container.find("input, select");
  })

  // Changes character counter when slider is adjusted
  $('#passwordLength').on('input', function() {
    const currentVal = $(this).val();
    $('#sliderVal').val(currentVal).text(currentVal);
  })
})


