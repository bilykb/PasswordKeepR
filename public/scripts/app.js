$(() => {

  /******  CLICK HANDLERS GO HERE *******/


  $(".edit_btn").on("click", function(e) {
    const $container =  $(this).closest("li").next();
    $container.addClass("in_view");
    $(".viewport_overlay").removeClass("is_hidden");
  })

  //Close edit form when cancel button is clicked
  $(".cancel_btn").on("click", function() {
    //Reset to hidden state
    $(this).closest(".edit_password_container").removeClass("in_view");
    $(this).closest(".create_new_password_container").removeClass("in_view");
    $(".viewport_overlay").toggleClass("is_hidden");
  })

  //Shows the add passord form when the + button is pressed
  $(".create_new_password").on("click", function() {
    //Un hiddens form
    const $container = $(".create_new_password_container");
    $container.addClass("in_view");
    $(".viewport_overlay").removeClass("is_hidden");
    const $formFields = $container.find("input, select");
  })

  // Changes character counter when slider is adjusted
  $('#passwordLength').on('input', function() {
    const currentVal = $(this).val();
    $('#sliderVal').val(currentVal).text(currentVal);
  })
})


