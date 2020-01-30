let comments = [];
loadComments();

let doc = document;
const inputName = doc.getElementById("name");
const commentTextarea = doc.getElementById("comment");
let button = doc.getElementById("button");


function keyDown(e){
    if(e.keyCode == 17)
        ctrl = true;
    else if(e.keyCode == 13 && ctrl)
        button.click();
}

function keyUp(e){
    if(e.keyCode == 17)
        ctrl = false;
}
button.addEventListener("click", (event) => {
    event.preventDefault ()
    let comment = {
        name : inputName.value,
        comment: commentTextarea.value,
        time: Math.floor(Date.now())
    }
    commentTextarea.value = "";
    inputName.value = "";
    comments.push(comment);
    saveComments();
    showComments();
})

function saveComments (){
    localStorage.setItem("comments", JSON.stringify(comments))
}

function loadComments () {
    if(localStorage.getItem("comments")) comments = JSON.parse(localStorage.getItem("comments"));
    showComments();
}

function showComments  () {
    let commentField = document.getElementById("comment_file");
    let out = "";
    comments.forEach(item => {
        item.name == 0 || item.comment == 0 ? out.style = `
        display: none;` :
         out += `<div>
                    <h2 class="name">${item.name}</h2>
                    <span class="text_right small">${timeConverter(item.time)}</span>
                    <div class="comment">
                        <p class="stl">${item.comment}</p>
                        <div class="triangle"></div>
                        <div class="triangle1"></div>
                    </div>
                </div>`

        })
    commentField.innerHTML = out;
}

function timeConverter (UNIX_timestamp)  {
    let a = new Date(UNIX_timestamp);
    let months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    let sec = a.getSeconds();
    let time = date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
    return time
}






