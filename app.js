function stringToColor(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var color = '#';
    for (var i = 0; i < 3; i++) {
        var value = (hash >> (i * 8)) & 0xFF;
        color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
}
function log(a){console.log(a)}

function colorUser(a){
    let color = stringToColor(a.find('.username').text());
    console.log(color);
    a.find('.userPicture').css('background-color', color);
}
function colorUsers(){
    for(let i = 0; i < $('#commentSection').children().length; i++){
        let comment = $('#commentSection').children()[i];
        
        let username = $(comment).find('.username').text();
        let img = $(comment).find('.userPicture');
        log(username);
        $(img).css('background-color', stringToColor(username));
    }
}

let username = $('#username');
let message = $('#message');

colorUsers();

$('#submitButton').on('click', function() {
    $('#commentSection').prepend(`
        <li class="comment">
            <div class="commentProfileText">
                <img class="userPicture" src="images/user.png" alt="User.png">
                <h2 class="username">${username.val()}</h2>
                <p class="commentMessage">${message.val()}</p>
            </div>
            <div class="commentButtons">
                <button class="editButton"><img class="clickIcon" src="images/edit.png" alt="Edit comment"></button>
                <button class="deleteButton"><img class="clickIcon" src="images/delete.png" alt="Delete comment"></button>
            </div>
        </li>
    `);
    colorUsers();
});

$('#commentSection').on('click', '.deleteButton', function(){
    $(this).parent(this).parent(this).remove();
});

$('#commentSection').on('click', '.editButton', function(){
    let parent = $(this).parents('.commentButtons');
    let message = $(this).parents('.commentButtons').prev().children('.commentMessage');

    let t = $(this).parents('.commentButtons').prev().children('.commentMessage').text();
    let width = message.width();
    let height = message.height();
    let userWidth = message.prev().width();
    let userHeight = message.prev().height();

    message.replaceWith(`
        <textarea class="editCommentMessage">${message.text()}</textarea>
    `);
    $(parent).prev().children('.editCommentMessage').css("width", (width+'px'));
    $(parent).prev().children('.editCommentMessage').css("height", (height+'px'));
    
    $(this).replaceWith(`
        <button class="saveButton"><img class="clickIcon" src="images/save.png" alt="Edit comment"></button>
    `);
    
    console.log(t);
});
$('#commentSection').on('click', '.saveButton', function(){
    let parent = $(this).parents('.commentButtons');
    let message = $(this).parents('.commentButtons').prev().children('.editCommentMessage');

    let t = $(this).parents('.commentButtons').prev().children('.editCommentMessage').text();
    // let width = message.width();
    // let height = message.height();

    message.replaceWith(`
        <p class="commentMessage">${message.val()}</p>
    `);
    
    $(this).replaceWith(`
        <button class="editButton"><img class="clickIcon" src="images/edit.png" alt="Edit comment"></button>
    `);
});