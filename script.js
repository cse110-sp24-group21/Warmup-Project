
/* Upload JSON file and store in data directory */
const fileUpload = document.getElementById("upload-file");
const fileStream = document.getElementById("fileInput");

// fileUpload.addEventListener('click', function() {
//     fileStream.click();
// });

// fileStream.addEventListener('change', function(event) {
//     const newFile = event.target.files[0];
//     if (newFile && newFile.type == 'application/json') {
//         const r = new FileReader();
//         // will implement (first read raw JSON)
//     }
// });

// function display(taskData) {
//     const listContainer = document.getElementById("list");
//     listContainer.innerHTML = ''; // empty list
//     // foreach loop through tasks
// }



let bodyElem = document.body;
const colorBtnImg = document.getElementById("color-mode");
let containerElem = document.getElementsByClassName("container")[0];
let lightButtons = document.getElementsByClassName("light-icon");
let darkButtons = document.getElementsByClassName("dark-icon");

function colorChange() {
    console.log(containerElem.classList[1]);
    console.log(bodyElem.classList[0]);
    if(containerElem.classList[1] == "light-mode") {
        // change to dark mode
        containerElem.style.backgroundColor = "#081236";
        containerElem.style.color = "white";
        containerElem.classList.remove("light-mode");
        containerElem.classList.add("dark-mode");
    }
    else {
        // change to light mode
        containerElem.style.backgroundColor = "white";
        containerElem.style.color = "black";
        containerElem.classList.remove("dark-mode");
        containerElem.classList.add("light-mode");
    }
    if(bodyElem.classList[0] == "light-mode") {
        // change to dark-mode
        bodyElem.style.backgroundColor = "#0C1121";
        bodyElem.classList.remove("light-mode");
        bodyElem.classList.add("dark-mode");
    }
    else {
        bodyElem.style.backgroundColor = "white";
        bodyElem.classList.remove("dark-mode");
        bodyElem.classList.add("light-mode");
    }
    if(lightButtons[0].style.display == "none") {
        // make sure its displayed and hide dark
        for(let i = 0; i < lightButtons.length; i++) {
            lightButtons[i].style.display = "block";
            darkButtons[i].style.display = "none";
        }
    }
    else {
        // make sure dark is displayed and hide light
        for(let i = 0; i < darkButtons.length; i++) {
            darkButtons[i].style.display = "block";
            lightButtons[i].style.display = "none";
        }
    }
};

// colorBtnImg.addEventListener("click", function() {
//     if(containerElem.classList[1] == "light-mode") {
//         // change to dark mode
//         containerElem.style.backgroundColor = "#081236";
//         containerElem.style.color = "white";
//     }
//     else {
//         // change to light mode
//         containerElem.style.backgroundColor = "white";
//         containerElem.style.color = "black";
//     }
//     if(bodyElem.classList[0] == "light-mode") {
//         // change to dark-mode
//         bodyElem.style.backgroundColor = "#0C1121";
//     }
//     else {
//         bodyElem.style.backgroundColor = "white";
//     }
// });