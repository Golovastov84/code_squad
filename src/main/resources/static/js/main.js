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
                        /*gameLaunch();*/
                       /* currentTime();*/ /* Вызываем функция currentTime(), которая запускает весь процесс*/
                       /* creatingTask();*/
                       /* calculationTask();*/
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
                  /* gameLaunch();*/
                  /* currentTime();*/ /* Вызываем функция currentTime(), которая запускает весь процесс*/
                   /*creatingTask();*/
                  /* calculationTask();*/
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
        location.reload();
    });

    $('#noClearLogin').click(function(){
        $(objectPage).css({display: 'flex'});
        $('#areYouSureClearLogin').css({display: 'none'});
        return false;
    });

    /*$('input[type="checkbox"]').change(function(){
        if(this.checked == true){
            if(this.value === " * " || this.value === " / "){
            checks.push(this.value);
            checks.push(this.value);
            }
            else{
            checks.push(this.value);
            }
        }
        return false;
    });*/

    /*$('#gameWithoutRegistrationId').click(function(){
        $('#choiceLogin').css({display: 'none'});
        $('#gameSettings').css({display: 'flex'});
        return false;
    });*/

    /*$('#startGame').click(function(){
        maximumNumber = document.getElementById('maximumValueId').value;
        if(checks.length == 0){
            alert('Выберете не менее 1 арифметического действия!');
        } else if(maximumNumber < 1){
            alert('Укажите максимальное число в задачах не менее 1!');
        } else {
            $('#gameSettings').css({display: 'none'});
            $('#pageContent').css({display: 'flex'});
            gameLaunch();
            currentTime(); *//* Вызываем функция currentTime(), которая запускает весь процесс*//*
            creatingTask();
            calculationTask();
        }
        return false;
    });

    $('#resetGame').click(function(){
        $('#pageContent').css({display: 'none'});
        $('#areYouSure').css({display: 'flex'});
        return false;
    });

    $('#yesResetId').click(function(){ *//*сброс игры*//*
        $('#areYouSure').css({display: 'none'});
        resetGameData();
        checks = [];
        totalTasksFinal, correctlyFinal, wrongFinal = 0;
        document.getElementById('numberTasksId').value = 10;
        document.getElementById('maximumValueId').value = 10;
        document.getElementById('resultId').value = "";
        $('#gameSettings').css({display: 'flex'});
        return false;
    });

    $('#noResetId').click(function(){ *//*продолжение игры*//*
        $('#pageContent').css({display: 'flex'});
        $('#areYouSure').css({display: 'none'});
        return false;
    });*/

    /*$('#dialingButtons button').click(function(){
        playerScore += this.value;
        document.getElementById('resultId').value = playerScore;
        return false;
    });*/

    /*$('#clearId').click(function(){
        playerScore = "";
        document.getElementById('resultId').value = playerScore;
        return false;
    });*/

    $('#sendId').click(function(){
        playerScore = document.getElementById('resultId').value;
        if(playerScore == ""){
            alert('Введите результат рассчета.');
        } else {
            ratingComment = getRandomArbitrary(0, 5);
            if(ratingComment < 1){
            alert('Комментарий нуждается в улучшении, его рейтинг меньше 1');
            } else {


           /* if (playerScore == resultCorrect){
                ++document.getElementById('correctlyId').value;
                correctlyFinal = document.getElementById('correctlyId').value;
            } else{
                ++document.getElementById('wrongId').value;
                wrongFinal = document.getElementById('wrongId').value;
            }
            --document.getElementById('leftId').value;
            playerScore = "";
            creatingTask();*/
            /*calculationTask();*/
            commentText = document.getElementById('resultId').value;
            document.getElementById('resultId').value = "";
            $('#pageContent').css({display: 'none'});
            }
        }
        /*document.getElementById('idUserId').value = idName;*/
        document.getElementById('nameUserId').value = name;
        document.getElementById('chatTextId').value = chatText;
        document.getElementById('commentTimeId').value = formatDate(new Date());
        document.getElementById('commentId').value = commentText;
        document.getElementById('ratingId').value = ratingComment;
        /*document.getElementById('resultSafeId').value = Math.trunc(correctlyFinal * 100 / totalTasksFinal);
        document.getElementById('completenessId').value = 100;*/
        var dataComment = $('#gameResultsForSafe form').serialize();
        $.ajax({
            method: "POST",
            url: '/games/',
            data: dataComment,
            success: function(response){
                /*var chat = 0;
                chat.id = response;
                *//*$('#gameResults').css({display: 'none'});*//*
                var gameCode = '<div class="game-list-one"> <div class="text_header">' + name +
                '</div>';
                gameCode += '<div class="text_header">' + chatText + '</div>';
                gameCode += '<div class="text_header">' + document.getElementById('commentTimeId').value + '</div>';
                gameCode += '<div class="text_header">' + timerFromString(timerTime) + '</div>';
                gameCode += '<div class="text_header">' + checks.length * maximumNumber + '</div>';
                gameCode += '<div class="text_header">' + Math.trunc(correctlyFinal * 100 / totalTasksFinal) + '</div>';
                gameCode += '<div class="text_header">' + 100 + '</div></div>';
                $('.game-list-data').append(gameCode);*/

            }
        });
        document.getElementByClass("game-list-data").innerHTML = "<div class="game-list-one"  th:each="comment :
        ${comments}"><div class="text_header" th:text=${comment.nameUser}></div> <div class="text_header"
        th:text=${comment.text}> </div> <div class="text_header" th:text=${comment.commentTime}> </div> <div
        class="text_header" th:text=${comment.comment}> </div> <div class="text_header" th:text=${comment.rating}>
        </div></div>";
        $.ajax({
            method: "GET",
            url: '/comments',
            success: function(response)
            {
            /*var documentTypeId = '';*/
                for (var comment of response)
             {
                var code = '<div class="text_header">' + comment.name + '</div><div class="text_header">' + comment
                .text + '</div><div class="text_header">' + comment.commentTime + '</div><div class="text_header">' +
                 comment.comment + '</div><div class="text_header">' + comment.rating + '</div>';
                /*<a href="#" class="type-document-link" data-id="' + idDocument +'">' +
                           response.name + '</a><br>';*/
                $('.game-list-data').append('<div>' + code + '</div>');}
            }
            /*,
            error: function(response)
            {
                if(response.status == 404) {
                    alert('Тип документа не найден!');
                }
            }*/
        });
         $('#game-list').css({display: 'flex'});
        totalTasksFinal, correctlyFinal, wrongFinal = 0;
        /*if(document.getElementById('leftId').value == 0){
            $('#pageContent').css({display: 'none'});
            resetGameData();
            if(name == ""){
                $('#safeGameResults').css({display: 'none'});
            }
            $('#gameResults').css({display: 'flex'});
            *//*document.getElementById('totalTasksFinalId').value = totalTasksFinal;
            document.getElementById('correctlyFinalId').value = correctlyFinal;
            document.getElementById('wrongFinalId').value = wrongFinal;*//*
        }*/
        return false;
    });

    /*function uncheck(){
        var uncheck = document.getElementsByTagName('input');
        for(var i=0;i<uncheck.length;i++){
            if(uncheck[i].type=='checkbox'){
                uncheck[i].checked=false;
            }
        }
    }*/

    /*$('#safeGameResults').click(function(){
        document.getElementById('idUserId').value = idName;
        document.getElementById('nameUserId').value = name;
        document.getElementById('chatTextId').value = chatText;
        document.getElementById('commentTimeId').value = formatDate(new Date());
        document.getElementById('commentId').value = commentText;
        document.getElementById('ratingId').value = ratingComment;
        *//*document.getElementById('resultSafeId').value = Math.trunc(correctlyFinal * 100 / totalTasksFinal);
        document.getElementById('completenessId').value = 100;*//*
        var dataGame = $('#gameResultsForSafe form').serialize();
        $.ajax({
            method: "POST",
            url: '/games/',
            data: dataGame,
            success: function(response){
                var game = 0;
                game.id = response;
                *//*$('#gameResults').css({display: 'none'});*//*
                var gameCode = '<div class="game-list-one"> <div class="text_header">' + name +
                '</div>';
                gameCode += '<div class="text_header">' + formatDate(startTime) + '</div>';
                gameCode += '<div class="text_header">' + timerFromString(timerTime) + '</div>';
                gameCode += '<div class="text_header">' + checks.length * maximumNumber + '</div>';
                gameCode += '<div class="text_header">' + Math.trunc(correctlyFinal * 100 / totalTasksFinal) + '</div>';
                gameCode += '<div class="text_header">' + 100 + '</div></div>';
                $('.game-list-data').append(gameCode);
                $('#game-list').css({display: 'flex'});
            }
        });
        totalTasksFinal, correctlyFinal, wrongFinal = 0;
        return false;
    });*/

    $('.newGame').click(function(){
        /*resetGameData();*/
        /*checks = [];
        commentText = "";
        totalTasksFinal, correctlyFinal, wrongFinal = 0;*/
        $('#game-list').css({display: 'none'});
        $('#pageContent').css({display: 'flex'});
        return false;
    });



    /*function gameLaunch(){
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
    }*/

    /*function resetGameData(){
        uncheck();
        *//*document.querySelectorAll('.partProgress > input').value = "";
        document.querySelectorAll('.partResults > input').value = "";*//*
    }*/

    function formatDate(date) {
        return date.getFullYear() + '/' +
        updateTime((date.getMonth() + 1)) + '/' +
        updateTime(date.getDate()) + ' ' +
        updateTime(date.getHours()) + ':' +
        updateTime(date.getMinutes());
    }

    /*function currentTime() {
        if(checks.length != 0){
            timerTime ++;
            var t = setTimeout(function(){ currentTime() }, 1000); *//* настаиваем таймер *//*
            document.getElementById('inputTimerId').value = timerFromString(timerTime);
        }
    }*/

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


    /*function creatingTask() {
        taskText = "";
        firstNumber = getRandomArbitrary(1, maximumNumber);
        taskText += firstNumber;
        arithmeticOperation = checks[getRandomArbitrary(0, checks.length)];
        taskText += arithmeticOperation;
        secondNumber = getRandomArbitrary(1, maximumNumber);
        taskText += secondNumber;
        taskText += " =";
        document.getElementById('taskTextId').value = taskText;
    }*/

    function getRandomArbitrary(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        //Максимум не включается, минимум включается
        return Math.floor(Math.random() * (max - min)) + min;
    }

   /* function calculationTask() {
        switch (arithmeticOperation) {
            case ' * ':
            resultCorrect = firstNumber * secondNumber;
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
    }*/
});



