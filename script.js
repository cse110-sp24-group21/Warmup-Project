// Code for Color Mode Switch Display

// Extract elements
let bodyElem = document.body;
const colorBtnImg = document.getElementById("color-mode");
let containerElem = document.getElementsByClassName("container")[0];
let taskIcons = document.getElementsByClassName("task-icon");

// Color change function based on current color mode
function colorChange() {
    if(containerElem.classList[1] == "light-mode") {
        // change to dark mode
        containerElem.style.backgroundColor = "#081236";
        containerElem.style.color = "white";
        containerElem.classList.replace("light-mode", "dark-mode");
        bodyElem.style.backgroundColor = "#0C1121";
        bodyElem.classList.replace("light-mode", "dark-mode");
        for(let i = 0; i < taskIcons.length; i++) {
            taskIcons[i].classList.replace("light-mode-icon", "dark-mode-icon");
            if (taskIcons[i].classList[2] == "right-icon") {
                taskIcons[i].src = "images/triangle-right-white.svg";
            }
            else {
                taskIcons[i].src = "images/triangle-down-white.svg";
            }
        }
    }
    else {
        // change to light mode
        containerElem.style.backgroundColor = "white";
        containerElem.style.color = "black";
        containerElem.classList.replace("dark-mode", "light-mode");
        bodyElem.style.backgroundColor = "white";
        bodyElem.classList.replace("dark-mode", "light-mode");
        for(let i = 0; i < taskIcons.length; i++) {
            taskIcons[i].classList.replace("dark-mode-icon", "light-mode-icon");
            if (taskIcons[i].classList[2] == "right-icon") {
                taskIcons[i].src = "images/triangle-right-black.svg";
            }
            else {
                taskIcons[i].src = "images/triangle-down-black.svg";
            }
        }
    }
};

/* Toggle Functionality */
function toggleIcon(el) {
    const task = el.parentNode;
    const description = task.getElementsByClassName('description')[0];
    //change from down to right
    if (el.classList[2] == 'down-icon') {
        el.classList.replace('down-icon', 'right-icon');
        description.style.display = 'none';
        if (el.classList[1] == 'light-mode-icon') {
            el.src = 'images/triangle-right-black.svg';
        }
        else {
            el.src = 'images/triangle-right-white.svg';
        }
    }
    // change from right to down
    else {
        el.classList.replace('right-icon', 'down-icon')
        description.style.display = 'block';
        if (el.classList[1] == 'light-mode-icon') {
            el.src = 'images/triangle-down-black.svg';
        }
        else {
            el.src = 'images/triangle-down-white.svg';
        }
    }
}

/* WORK IN PROGRESS */

/* Upload JSON file and store in data directory */
function upload() {
    document.getElementById('fileInput').click();
    const fileStream = document.getElementById('fileInput');
    const newFile = fileStream.target.files[0];
    if (newFile && newFile.type == 'application/json') {
        const r = new FileReader();
        // will implement (first read raw JSON)
    }
}

function display(taskData) {
    const listContainer = document.getElementById("list");
    listContainer.innerHTML = ''; // empty list
    // foreach loop through tasks
}