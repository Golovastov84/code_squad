$(function(){

    var timerTime = 0;
    var startTime = new Date();
    var idName = -1;
    var idGame = -1;
    var name = "";
    var password = "";
    var passwordVerification = "";
    var checks = [];
    var textAllCheck = "";
    var maximumNumber = 0;
    var totalTasks = 0;
    var firstNumber = 0;
    var arithmeticOperation = "";
    var secondNumber = 0;
    var resultCorrect = 0;
    var playerScore = "";
    var totalTasksFinal = 0;
    var correctlyFinal = 0;
    var wrongFinal = 0;

    $('#registrationId').click(function(){
    $('#choiceLogin').css({display: 'none'});
    $('#registrationWindow').css({display: 'flex'});
    return false;
    });

    $('#saveUser').click(function(){

        var dataDoc = $('#registrationWindow form').serialize();
        name = document.getElementById('registrationNameId').value;
        password = document.getElementById('registrationPasswordId').value;
        passwordVerification = document.getElementById('registrationVerificationId').value;
        if(password !== passwordVerification){
            alert("Введите одинаковые пароли.");
            /*$('#choiceLogin').css({display: 'none'});
            $('#registrationWindow').css({display: 'flex'});
            document.getElementById('registrationNameId').value = name;
            document.getElementById('registrationPasswordId').value = password;*/
        } else {
        $.ajax({
            method: "POST",
            url: '/users/',
            data: dataDoc,
            success: function(response)
            {
                idName = response;
                if(idName == -1){
                    alert("Данное имя уже занято.");
                    document.getElementById('registrationNameId').value = name;
                    document.getElementById('registrationPasswordId').value = password;
                    document.getElementById('registrationVerificationId').value = passwordVerification;
                } else  {
                /*document.getElementById('taskTextId').value = idName;*/

                $('#registrationWindow').css({display: 'none'});
                $('#gameSettings').css({display: 'flex'});
                }
            }
        });
        /*document.getElementById('registrationNameId').value = "";
        document.getElementById('registrationPasswordId').value = "";
        document.getElementById('registrationVerificationId').value = "";*/
        }
        return false;
    });


    $('#enterId').click(function(){
                $('#choiceLogin').css({display: 'none'});
                $('#inputWindow').css({display: 'flex'});

        return false;
    });

    $('#searchUser').click(function(){
        var dataDoc = $('#inputWindow form').serialize();
        name = document.getElementById('nameId').value;
        password = document.getElementById('passwordId').value;
        $.ajax({
            method: "GET",
            url: '/users/' + name,
            success: function(response)
           {
               idName = response.id;
               passwordVerification = response.password;
               if(passwordVerification !== password){
                alert("Пароль не верен. ");
                document.getElementById('nameId').value = name;
               } else {
                   $('#inputWindow').css({display: 'none'});
                   $('#gameSettings').css({display: 'flex'});
                   /*document.getElementById('maximumValueId').value = name;*/
               }
               /*var documentTypeId = '';
               for (var document of response) {
                   var nameDocument = '';
                   documentTypeId = document.typeId;
                   var idDocument = document.id;
                   functionGetTypeDocument(documentTypeId, idDocument);
               };*/
           },
           error: function(response)
               {
                   if(response.status == 404) {
                       alert('Игрок с таким именем не зарегистрирован!');
                   }
               }
        });
        return false;
    });

    $('input[type="checkbox"]').change(function()
    {
      if(this.checked == true)
      {
        checks.push(this.value);
           /*alert('you need to be fluent in English to apply for the job');*/
      }

      return false;
    });

$('#gameWithoutRegistrationId').click(function(){
                    $('#choiceLogin').css({display: 'none'});
                    $('#gameSettings').css({display: 'flex'});
            return false;
    });

    $('#startGame').click(function(){
        maximumNumber = document.getElementById('maximumValueId').value;
        if(checks.length == 0){
            alert('Выберете не менее 1 арифметического действия!');
        } else if(maximumNumber < 1){
           alert('Укажите максимальное число в задачах не менее 1!');
        } else {

        $('#gameSettings').css({display: 'none'});
        $('#pageContent').css({display: 'flex'});

         /*document.getElementById('totalTasksId').value = 3;
         totalTasksFinal = document.getElementById('totalTasksId').value;
         document.getElementById('correctlyId').value = 0;
         document.getElementById('wrongId').value = 0;
         document.getElementById('leftId').value = totalTasksFinal;*/
         gameLaunch();
        currentTime(); /* Вызываем функция currentTime(), которая запускает весь процесс*/
       /* for(var i = 0; i < 20; i++){*/
        creatingTask();
        calculationTask();
        /*}*/

        }
        return false;
    });

$('#resetGame').click(function(){
   $('#pageContent').css({display: 'none'});
   $('#areYouSure').css({display: 'flex'});
    return false;
});

$('#yesResetId').click(function(){ /*сброс игры*/
   $('#areYouSure').css({display: 'none'});
   resetGameData();
   checks = [];
   totalTasksFinal, correctlyFinal, wrongFinal = 0;
   $('#gameSettings').css({display: 'flex'});
    return false;
});

$('#noResetId').click(function(){ /*продолжение игры*/
   $('#pageContent').css({display: 'flex'});
   $('#areYouSure').css({display: 'none'});
    return false;
});

   /* $('#sendId').click(function(){
        $('#pageContent').css({display: 'none'});
        $('#choiceLogin').css({display: 'flex'});
        return false;
    });*/

$('#dialingButtons button').click(function(){
    playerScore += this.value;
    /*alert(playerScore);*/
    document.getElementById('resultId').value = playerScore;
    return false;
});

$('#clearId').click(function(){
    playerScore = "";
    document.getElementById('resultId').value = playerScore;
    return false;
});



$('#sendId').click(function(){
     playerScore = document.getElementById('resultId').value;
    if(playerScore == ""){
    /*$('#resultId').css({background-color: 'red'});*/
    alert('Введите результат рассчета.');
    } else {
    if (playerScore == resultCorrect){
    /*alert('Верно.');*/

    ++document.getElementById('correctlyId').value;
    correctlyFinal = document.getElementById('correctlyId').value;
    } else{
    ++document.getElementById('wrongId').value;
    wrongFinal = document.getElementById('wrongId').value;
    }
    --document.getElementById('leftId').value;
    playerScore = "";
    creatingTask();
    calculationTask();
    document.getElementById('resultId').value = "";
    }
    if(document.getElementById('leftId').value == 0){
    /*alert('Игра завершилась')*/
    $('#pageContent').css({display: 'none'});
    resetGameData();
    /*checks = [];
    document.getElementById('maximumValueId').value = "";
    uncheck();*/
    /*$('input[type="checkbox"]').change(function(){
        *//*this.defaultChecked;*//*
        this.defaultValue;
        return false;
    });*/
    if(name == ""){
        $('#safeGameResults').css({display: 'none'});
        }
    $('#gameResults').css({display: 'flex'});
    document.getElementById('totalTasksFinalId').value = totalTasksFinal;
    document.getElementById('correctlyFinalId').value = correctlyFinal;
    document.getElementById('wrongFinalId').value = wrongFinal;

    }
    return false;
});

function uncheck(){
     var uncheck = document.getElementsByTagName('input');
     for(var i=0;i<uncheck.length;i++){
          if(uncheck[i].type=='checkbox'){
            uncheck[i].checked=false;
          }
     }
}



$('#safeGameResults').click(function(){
/*Надо реализовать сохранение в базу данных результатов*/

        document.getElementById('idUserId').value = idName;

        document.getElementById('nameUserId').value = name;

        document.getElementById('startTimeId').value = formatDate(startTime);

        document.getElementById('timerId').value = timerFromString(timerTime);

        document.getElementById('complexityId').value = checks.length * maximumNumber;
        document.getElementById('resultSafeId').value = Math.trunc(correctlyFinal * 100 / totalTasksFinal);
        document.getElementById('completenessId').value = 100;
        totalTasksFinal, correctlyFinal, wrongFinal = 0;

        var dataGame = $('#gameResultsForSafe form').serialize();



    $.ajax({
        method: "POST",
        url: '/games/',
        data: dataGame,
        success: function(response)
        {
            var game = 0;
            game.id = response;
//          получение id game
//            document.getElementById('idPeopleForDocument').value = response;
//            var dataArray = $('#game-form form').serializeArray();
//            for(i in dataArray) {
//                game[dataArray[i]['header']] = dataArray[i]['value'];
//            }
            $('#gameResults').css({display: 'none'});
            $('#game-list').css({display: 'flex'});
//            $('#gameResultsForSafe').css({display: 'flex'});

        }
    });
 return false;
});

$('#newGame').click(function(){
    resetGameData();
    checks = [];
    totalTasksFinal, correctlyFinal, wrongFinal = 0;
    $('#gameResults').css({display: 'none'});
    $('#gameSettings').css({display: 'flex'});
    return false;
});

$('#home').click(function(){
    resetGameData();
    checks = [];
    totalTasksFinal, correctlyFinal, wrongFinal = 0;
    $('#gameResults').css({display: 'none'});
    $('#choiceLogin').css({display: 'flex'});
    return false;
});

function gameLaunch(){
    startTime = new Date();
    timerTime = 0;
    totalTasks = document.getElementById('numberTasksId').value;
    document.getElementById('totalTasksId').value = totalTasks;
    totalTasksFinal = document.getElementById('totalTasksId').value;
    correctlyFinal = 0;
    wrongFinal = 0;
     document.getElementById('correctlyId').value = 0;
     document.getElementById('wrongId').value = 0;
     document.getElementById('leftId').value = totalTasksFinal;
}

function resetGameData(){
    uncheck();
    document.querySelectorAll('.partProgress > input').value = "";
    document.querySelectorAll('.partResults > input').value = "";
}

function formatDate(date) {
   return date.getFullYear() + '/' +
      (date.getMonth() + 1) + '/' +
      date.getDate() + ' ' +
      date.getHours() + ':' +
      date.getMinutes();
   }

function currentTime() {
        if(checks.length != 0){
        timerTime ++;
        /*создание экземпляра объекта класса Date ()*/

        /* var hour = Math.trunc(timerTime / 60 / 60);
        var min = Math.trunc(timerTime / 60) - hour * 60;
        var sec = timerTime - min * 60;*/

        var t = setTimeout(function(){ currentTime() }, 1000); /* настаиваем таймер */
        /* hour = updateTime(hour);
        min = updateTime(min);
        sec = updateTime(sec);*/
        document.getElementById('inputTimerId').value = timerFromString(timerTime);
        }
}

    function timerFromString(timerTime){
        var hour = Math.trunc(timerTime / 60 / 60);
        var min = Math.trunc(timerTime / 60) - hour * 60;
        var sec = timerTime - min * 60;
        hour = updateTime(hour);
        min = updateTime(min);
        sec = updateTime(sec);
    return hour + " : " + min + " : " + sec;
    }

     function updateTime(k) {
      if (k < 10) {
        return "0" + k;
      }
      else {
        return k;
      }
    }

function creatingTask() {

    taskText = "";
    firstNumber = getRandomArbitrary(1, maximumNumber);
    taskText += firstNumber;
    arithmeticOperation = checks[getRandomArbitrary(0, checks.length)];
    taskText += arithmeticOperation;
    secondNumber = getRandomArbitrary(1, maximumNumber);
    taskText += secondNumber;
    taskText += " =";
    document.getElementById('taskTextId').value = taskText;
}

function getRandomArbitrary(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

function calculationTask() {
    switch (arithmeticOperation) {
      case ' * ':
        resultCorrect = firstNumber * secondNumber;
        /*alert( '*' );*/
        break;
      case ' + ':
        resultCorrect = firstNumber + secondNumber;
        break;
      case ' - ':
        resultCorrect = firstNumber - secondNumber;
        break;
      default:
        resultCorrect = firstNumber / secondNumber;
    }
    /*alert(resultCorrect);*/
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


