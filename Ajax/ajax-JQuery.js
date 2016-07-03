$(function () {
    $.ajax({
        url: 'http://localhost:3000/contact/carlo',
        method: 'GET',
        headers: {
            'authorization': 'basic dmFzc2FsbG9jYXJsbzoxMjM0'
        },
    }).then(function success(response){
        console.info(response);
    });
});