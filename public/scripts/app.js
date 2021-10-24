$(() => {

  // EDIT PASSWORDS CLICK HANDLERS

  $(".edit_btn").on("click", function(e) {
    const $container =  $(".edit_password_container");
    $container.fadeIn(200);
    const $formFields = $container.find("input, select");

    //This request will be modularized later on
    $.post('/api/passwords', (data) => {
      console.log(data)
    })


    $formFields.each((i, field) => {
      $(field).val('this will be the current value');
    })
  })

  //Close edit form when cancel button is clicked
  $(".cancel_btn").on("click", function() {
    //Reset to hidden state
    $($(this).parents()[2]).fadeOut(200);
  })
})

