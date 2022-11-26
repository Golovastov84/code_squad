$(function(){

    var startTime = 0;

    $('#registrationId').click(function(){
                $('#choiceLogin').css({display: 'none'});
                $('#registrationWindow').css({display: 'flex'});
        return false;
    });

    $('#saveUser').click(function(){
                    $('#registrationWindow').css({display: 'none'});
                    $('#gameSettings').css({display: 'flex'});
            return false;
        });


    $('#enterId').click(function(){
                $('#choiceLogin').css({display: 'none'});
                $('#inputWindow').css({display: 'flex'});
        return false;
    });

    $('#searchUser').click(function(){
                    $('#inputWindow').css({display: 'none'});
                    $('#gameSettings').css({display: 'flex'});
            return false;
        });

    $('#gameWithoutRegistrationId').click(function(){
                    $('#choiceLogin').css({display: 'none'});
                    $('#gameSettings').css({display: 'flex'});
            return false;
    });

    $('#startGame').click(function(){
        $('#gameSettings').css({display: 'none'});
        $('#pageContent').css({display: 'flex'});
        return false;
    });

    $('#sendId').click(function(){
        $('#pageContent').css({display: 'none'});
        $('#choiceLogin').css({display: 'flex'});
        return false;
    });

     currentTime(); /* Вызываем функция currentTime(), которая запускает весь процесс*/

 function currentTime() {
      startTime ++;
      /*var date = new Date();*/  /*создание экземпляра объекта класса Date ()*/

      var hour = Math.trunc(startTime / 60 / 60);
      var min = Math.trunc(startTime / 60) - hour * 60;
      var sec = startTime - min * 60;
      /*var hour = date.getHours() - startTime.getHours();
      var min = date.getMinutes() - startTime.getMinutes();
      var sec = date.getSeconds() - startTime.getSeconds();*/
      var t = setTimeout(function(){ currentTime() }, 1000); /* настаиваем таймер */
      hour = updateTime(hour);
      min = updateTime(min);
      sec = updateTime(sec);
    document.getElementById('inputTimerId').value = hour + " : " + min + " : " + sec;
    /*document.getElementById("inputTimerId").innerHTML = hour + " : " + min + " : " + sec;  adding time to the div */
    }

     function updateTime(k) {
      if (k < 10) {
        return "0" + k;
      }
      else {
        return k;
      }
    }

});
/*    $('#test_bottom').click(function(){
            let generateText = $('<a class="textFromTestBottom">Вы нажали тестовую кнопку</a>');
            let inBox1 = $('.experiment');
            inBox1.append(generateText);
            $('#user-put-form').css({display: 'flex'});
        });

    const appendUser = function(data){
        var userCode = '<a href="#" class="user-link" data-id="' +
            data.id + '">' + data.name + '</a><br>';
        $('#user-list')
            .append('<div>' + userCode + '</div>');
    };


    //Show adding Task form
    $('#show-add-user-form').click(function(){
        $('#user-form').css({display: 'flex'});
    });

//Closing adding Task form
    $('#user-form').click(function(event){
        if(event.target === this) {
            $(this).css({display: 'none'});
        }
    });

    $('#user-put-form').click(function(event){
        if(event.target === this) {
            $(this).css({display: 'none'});
            location.reload();
        }
    });

    //Getting Task
    $(document).on('click', '.user-link', function(){
        var link = $(this);
        var userId = link.data('id');

        $.ajax({
            method: "GET",
            url: '/users/' + userId,
            success: function(response)
            {

                    var code = '<div class="user-one"><button id="put-user" data-id="' + userId +
                    '">Редактировать</button><p></p><button id="dell-user" data-id="' + userId +
                    '">Удалить</button></div>';

                    link.parent().append(code);
                    numberClick = link.data('id');
                 $('#put-user').click(function(){
                   $('#user-put-form > form').html('');
                   let fillingUserPutForm = '<h2>Редактирование аккаунта</h2>';
                   fillingUserPutForm += '<label>Имя игрока </label>';
                   fillingUserPutForm += '<input type="text" name="name" value="' + response.name +
                   '">';
                   fillingUserPutForm += '<label>Пароль игрока</label>';
                   fillingUserPutForm += '<input type="text" name="password" value="' + response
                   .password + '">';
                   fillingUserPutForm += '<hr><button id="put-user-save" data-id="' + userId +
                   '">Редактировать</button>';
                   $('#user-put-form > form').append(fillingUserPutForm);
                   $('#user-put-form').css({display: 'flex'});
                   $('#put-user-save').click(function()
                       {
                           var data = $('#user-put-form form').serialize();
                           var link = $(this);
                           var userId = link.data('id');
                           $.ajax({
                               method: "PUT",
                               url: '/users/' + userId,
                               data: data,
                               success: function(response)
                               {
                                   $('#user-put-form').css('display', 'none');
                                   var user = {};
                                   user.id = response;
                                   var dataArray = $('#user-put-form form').serializeArray();
                                   for(i in dataArray) {
                                   // Было Task
                                       user[dataArray[i]['name']] = dataArray[i]['value'];
                                   }
                                   appendUser(user);
                               }
                           });
                           location.reload();
                           return false;
                       });
                });

                $('#dell-user').click(function(){
                   var link = $(this);
                   var userId = link.data('id');
                   $.ajax({
                       method: "DELETE",
                       url: '/users/' + userId,
                   });
                   location.reload();
                   return false;
                });
            },
            error: function(response)
            {
                if(response.status == 404) {
                    alert('Игрок не найден!');
                }
            }
        });
        return false;
    });



    //Adding Task
    $('#save-user').click(function()
    {
        var data = $('#user-form form').serialize();
        $.ajax({
            method: "POST",
            url: '/users/',
            data: data,
            success: function(response)
            {
                $('#user-form').css('display', 'none');
                var user = {};
                user.id = response;
                var dataArray = $('#user-form form').serializeArray();
                for(i in dataArray) {
                // Было Task
                    user[dataArray[i]['name']] = dataArray[i]['value'];
                }
                appendUser(user);
            }
        });
        return false;
    });*/


