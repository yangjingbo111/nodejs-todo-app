$(document).ready(function(){

  $('#item-form').on('submit', function(){
    console.log('submit ...');

    var item = $('#new-item'); // the selector must be write
    var todo = {item: item.val()};
    // console.log(todo);
    $.ajax({
      url: '/todo',
      type: 'POST',
      data: todo,
      success: function(data){
        console.log(data);
        location.reload();
      }
    });
    return false;
  });

  $("li").on('click', function(event){
    // event.preventDefault();
    var item = $(this).text();//.replace(/ /g, "-");
    console.log(item, "is about to delete");
    $.ajax({
      url: '/todo/' + item,
      type: 'DELETE',
      success: function(result){
        console.log('ajax request send ok, and receive the correct response');
        location.reload();
      }
    });
  });

});
