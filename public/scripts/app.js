 //Remove loading screen once DOM is loaded (prevent content flashing before layout animations)
 $(window).on("load", function() {
  $("#loader").fadeOut(300);
});


$(() => {


  /******  CLICK HANDLERS GO HERE *******/

  $(".edit_btn").on("click", function(e) {

    const $container =  $(".edit_password_container")[0];
    $($container).addClass("in_view");
    window.animateSideBarIn($container);

    //Replace edit form values with item values
    let inputs = [];
    const hiddenInfo = $($($(this)[0]).parents()[1]).find(".hidden_info")[0];
    const website = $($(hiddenInfo)[0]).find("span");

    inputs = $($container).find("input").slice(0, 5);
    inputs.each(function(i, el) {
      if ($($(website[i])[0]).attr('value') !== 'id') {
        $(el).val($($(website[i])[0]).text())
      } else {
        $($container).find("form").attr("action", `/passwords/${$($(website[i])[0]).text()}`)
      }
    })
  })

  //Close edit form when cancel button is clicked
  $(".cancel_btn").on("click", function() {
    //Reset to hidden state
    const $editContainer = $(".edit_password_container");
    const $createrContainer = $(this).closest(".create_new_password_container");
    window.animateSideBarOut($editContainer);
    window.animateSideBarOut($createrContainer);
    $(".viewport_overlay").toggleClass("is_hidden");
  })

  //Shows the add passord form when the + button is pressed
  $(".create_new_password").on("click", function() {
    //Un hiddens form
    const $container = $(".create_new_password_container");
    $container.addClass("in_view");
    window.animateSideBarIn($container);
    $(".viewport_overlay").removeClass("is_hidden");
    const $formFields = $container.find("input, select");
  })

  // Changes character counter when slider is adjusted
  $('.rangeInput').on('input', function() {
    const currentVal = $(this).val();
    $('.sliderVal').val(currentVal).text(currentVal);
  })
})


