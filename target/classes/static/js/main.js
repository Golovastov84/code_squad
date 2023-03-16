$(function(){

    var objectPage = document;
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
    var chatText = "Some text";
    var commentText = "";
    var ratingComment = 0;


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
        } else {
            $.ajax({
                method: "POST",
                url: '/users/',
                data: dataDoc,
                success: function(response){
                    idName = response;
                    if(idName == -1){
                        alert("Данное имя уже занято.");
                        document.getElementById('registrationNameId').value = name;
                        document.getElementById('registrationPasswordId').value = password;
                        document.getElementById('registrationVerificationId').value = passwordVerification;
                    } else  {
                        $('#registrationWindow').css({display: 'none'});
                        $('#pageContent').css({display: 'flex'});
                    }
                }
            });
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
            success: function(response){
                idName = response.id;
                passwordVerification = response.password;
                if(passwordVerification !== password){
                    alert("Пароль не верен. ");
                    document.getElementById('nameId').value = name;
                } else {
                   $('#inputWindow').css({display: 'none'});
                   $('#pageContent').css({display: 'flex'});

                }
            },
            error: function(response)
            {
               if(response.status == 404) {
                   alert('Участник с таким именем не зарегистрирован!');
               }
            }
        });
        return false;
    });


    $('.goHome').click(function(){
        objectPage = this.parentNode.parentNode;
        $(objectPage).css({display: 'none'});
        $('#areYouSureClearLogin').css({display: 'flex'});
        return false;
    });

    $('#yesClearLogin').click(function(){
        resetGameData();
        checks = [];
        totalTasksFinal, correctlyFinal, wrongFinal = 0;
        name, password, passwordVerification = "";
        localStorage.clear();
        location.reload();
    });

    $('#noClearLogin').click(function(){
        $(objectPage).css({display: 'flex'});
        $('#areYouSureClearLogin').css({display: 'none'});
        return false;
    });

    $('#sendId').click(function(){
        playerScore = document.getElementById('resultId').value;
        if(playerScore == ""){
            alert('Введите результат рассчета.');
        } else {
            ratingComment = getRandomArbitrary(0, 5);
            if(ratingComment < 1){
            alert('Комментарий нуждается в улучшении, его рейтинг меньше 1');
            } else {

            commentText = document.getElementById('resultId').value;
            document.getElementById('resultId').value = "";
            $('#pageContent').css({display: 'none'});

        document.getElementById('idUserId').value = idName;
        document.getElementById('chatTextId').value = chatText;
        document.getElementById('commentTimeId').value = formatDate(new Date());
        document.getElementById('commentId').value = commentText;
        document.getElementById('ratingId').value = ratingComment;
        var dataComment = $('#gameResultsForSafe form').serialize();
        $.ajax({
            method: "POST",
            url: '/comments/',
            data: dataComment,
            success: function(response){
            }
        });
        // To Do
        /*document.getElementById("game-list-data").value = '<div class="game-list-one"  th:each="comment :
        ${comments}"><div class="text_header" th:text=${comment.id}></div><div class="text_header" th:text=${comment
        .name}></div> <div class="text_header" th:text=${comment.text}> </div> <div class="text_header"
        th:text=${comment.commentTime}> </div> <div class="text_header" th:text=${comment.comment}> </div> <div
        class="text_header" th:text=${comment.rating}></div></div>';*/
        /*$.ajax({
            method: "GET",
            url: '/comments/',
            success: function(response)
            {
                for (var comment of response)
             {
                *//*var code = '<div class="text_header">' + comment.id + '</div><div class="text_header">' + comment.name +
                 '</div><div class="text_header">' + comment.text + '</div><div class="text_header">' + comment
                 .commentTime + '</div><div class="text_header">' +
                 comment.comment + '</div><div class="text_header">' + comment.rating + '</div>';
                $('#game-list-data').append('<div>' + code + '</div>');*//*}
            }
        });*/
        localStorage.setItem("myName",name);
        localStorage.setItem("myPassword",password);
        localStorage.setItem("myIdName",idName);
         $('.goHome').css({display: 'flex'});
          /*$('#game-list').css({display: 'flex'});*/
           location.reload();
          }

         }
        totalTasksFinal, correctlyFinal, wrongFinal = 0;

        return false;
    });

    $('.newGame').click(function(){
    if(localStorage.length == 0){
    /*if(name == "" && password == ""){*/
        $('#game-list').css({display: 'none'});
        $('#choiceLogin').css({display: 'flex'});
    } else {
        name = localStorage.getItem("myName");
        password = localStorage.getItem("myPassword");
        idName = localStorage.getItem("myIdName");
        $('#game-list').css({display: 'none'});
        $('#pageContent').css({display: 'flex'});
        }
        return false;
    });



    function formatDate(date) {
        return date.getFullYear() + '/' +
        updateTime((date.getMonth() + 1)) + '/' +
        updateTime(date.getDate()) + ' ' +
        updateTime(date.getHours()) + ':' +
        updateTime(date.getMinutes());
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
        else  {
            return k;
        }
    }



    function getRandomArbitrary(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        //Максимум не включается, минимум включается
        return Math.floor(Math.random() * (max - min)) + min;
    }

});



