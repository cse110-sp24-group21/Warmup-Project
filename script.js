
/* Upload JSON file and store in data directory */
const fileUpload = document.getElementById("upload-file");
const fileStream = document.getElementById("fileInput");

fileUpload.addEventListener('click', function() {
    fileStream.click();
});

fileStream.addEventListener('change', function(event) {
    const newFile = event.target.files[0];
    if (newFile && newFile.type == 'application/json') {
        const r = new FileReader();
        // will implement (first read raw JSON)
    }
});

function display(taskData) {
    const listTitle=document.getElementsByClassName("title");
    listTitle[0].innerHTML=taskData.title;
    //populating the list of tasks (?)
    const listContainer = document.getElementById("list");
    listContainer.innerHTML = ''; // empty list
    const arrow = (containerElem.classList[1] == "light-mode")? 
            '<img src="images/triangle-right-black.svg" alt="Task Icon "class="task-icon light-mode-icon right-icon" onclick="toggleIcon(this)">'
            : '<img src="images/triangle-right-white.svg" alt="Task Icon "class="task-icon dark-mode-icon right-icon" onclick="toggleIcon(this)">';
    for(let i=0; i<taskData.data.length; i++){
        listContainer.innerHTML += '<li class="task">'
                + arrow 
                + '<input class="checkbox" type="checkbox">'
                + '<h3 class="taskName">' + taskData.data[i].title + '</h3>'
                + '<p class="due-date">'+ taskData.data[i].dueDate + '</p>';
                + '<p class="description" style="display: none;">' + taskData.data[i].details + '</p>'
                + '</li>';
    }
}