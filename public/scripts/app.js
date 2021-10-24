// // Client facing scripts here

$(() => {



  //Show edit passwords container on click
  $(".edit_btn").on("click", function(e) {
    $(".edit_password_container").fadeIn(200);
  })

  //Close edit form when cancel button is clicked
  $(".cancel_btn").on("click", function() {
    //Reset to hidden state
    $($(this).parents()[2]).fadeOut(200);
  })
})


// //Log in form config
// $(() => {
//   // const $loginContainer = $("#login_container");
//   // const $passwordsContainer = $("#passwords_container");

//   // $.get('/user/login', function(user) {
//   //   if (!user) {
//   //     return
//   //   }

//   // })

// });
