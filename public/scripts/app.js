// // Client facing scripts here

const createPasswordTemplate = `
  <div class="create_new_password_container">
    <h2>Create a new password</h2>
    <form method="POST" action="/">
      <label for="website">Website</label>
      <input type="text" name="website" class="form-control">
      <label for="name">Name</label>
      <input type="text" name="name" class="form-control">
      <label for="category">Category</label>
      <select name="categories" id="categories" class="form-control">
        <option value="blah"></option>
        <option value="test"></option>
        <option value="label"></option>
        <option value="yes"></option>
      </select>
      <label for="login">Log in</label>
      <input type="text" name="login" class="form-control">
      <label for="password">Password</label>
      <input type="text" name="password" class="form-control">
      <div class="form_btns">
        <button type="submit" class="btn btn-primary">Create</button>
        <button type="button" class="btn btn-danger">Cancel</button>
      </div>
    </form>
  </div>
`


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
