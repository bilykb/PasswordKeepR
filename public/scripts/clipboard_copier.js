//Copy to clipboard logic goes here

$(() => {

  $('[data-toggle="tooltip"]').tooltip({
    animated: 'fade',
    placement: 'top',
    trigger: 'click'
  });

  const clipboard = new Clipboard('.clipboard_btn');
  clipboard.on('success', function(e) {

    setTimeout(() => {
      $("[data-toggle='tooltip']").tooltip('hide');
    }, 1000);
  });
  clipboard.on('error', function(e) {
    console.log(e);
  });

})
