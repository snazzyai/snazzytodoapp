$('document').ready(function(){
    $('.delete-todo').on('click', deleteTodo)

    function deleteTodo(){
        let confirmation = confirm('do you want to delete this todo-item?');
        if(confirmation){
            $.ajax({
                type: 'DELETE',
                url: '/todos/delete/'+$(this).data('id')
            }).done(function(response){
              return false;
            });
            document.location.reload();
        }
      
        else{
            return false;
        }


    }
})