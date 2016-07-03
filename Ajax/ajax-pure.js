var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:3000/contact/carlo');
xhr.setRequestHeader('Authorization', 'basic dmFzc2FsbG9jYXJsbzoxMjM0');
xhr.send(null);

xhr.onreadystatechange = function () {
    var DONE = 4; // readyState 4 means the request is done.
    var OK = 200; // status 200 is a successful return.
    if (xhr.readyState === DONE) {
        if (xhr.status === OK)
            console.info(xhr.responseText); // 'This is the returned text.'
    }
}