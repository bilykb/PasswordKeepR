$(() => {

  // EDIT PASSWORDS CLICK HANDLERS

  $(".edit_btn").on("click", function(e) {
    console.log('is clicked')
    const $container =  $(this).closest("li").find(".edit_password_container");
    console.log($container)
    $container.addClass("in_view");
  })

  //Close edit form when cancel button is clicked
  $(".cancel_btn").on("click", function() {
    //Reset to hidden state
    $($(this).parents()[3]).removeClass("in_view");
  })

  //Shows the add passord form when the + button is pressed
  $(".create_new_password").on("click", function() {
    //Un hiddens form
    const $container =  $(".create_new_password_container");
    $container.addClass("in_view");
    const $formFields = $container.find("input, select");

  })
})

