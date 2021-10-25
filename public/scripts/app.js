$(() => {

  // EDIT PASSWORDS CLICK HANDLERS

  $(".edit_btn").on("click", function(e) {
    const $container =  $(".edit_password_container");
    $container.addClass("in_view");
    const $formFields = $container.find("input, select");
    console.log($(this).parents()[1].attr());
  })

  //Close edit form when cancel button is clicked
  $(".cancel_btn").on("click", function() {
    //Reset to hidden state
    $($(this).parents()[2]).removeClass("in_view");
  })

  $(".edit_password_container form").on("submit", function() {
    const $editedValues = $(this).serialize();
  })


  //Shows the add passord form when the + button is pressed
  $(".create_new_password").on("click", function() {
    //Un hiddens form
    const $container =  $(".create_new_password_container");
    $container.addClass("in_view");
    const $formFields = $container.find("input, select");

    //This request will be modularized later on
    $.post('/api/passwords', (data) => {
      console.log('data.....', data)
    })

  })

})

