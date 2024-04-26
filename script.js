var DEFAULT_TITLE_MESSAGE = "Unnamed Task List";
var DATA_FIELDS = ["title", "dueDate", "label", "details"];
/* Upload JSON file and store in data directory */

function isPlainObject(obj) {
    // Check if the object is not null and its type is "object"
    if (obj !== null && typeof obj === 'object') {
        // Get the object's prototype
        const proto = Object.getPrototypeOf(obj);
        // Check if the prototype is the default Object.prototype
        return proto === Object.prototype || proto === null;
    }
    return false;
}

// NOTE: Currently doesn't sort
function verifyAndSort(data) {
    // returnData is the sorted data to return, or it will return null (Not used currently)
    // returnData = [];
    if (Array.isArray(data)) {
        for (const element of data) {
            if (isPlainObject(element)) {
                // In future, it would add values into returnData in a sorted manner.
                for (const field of DATA_FIELDS) {
                    if (!(field in element)) {
                        console.log("does not have field: " + field);
                        return null;
                    }
                }
            }
            else {
                console.log("not obj");
                return null;
            }
        }
    }
    return data;
    // return returnData;
}

function importData() {
    let input = document.createElement('input');
    input.type = 'file';

    input.onchange = _ => {
        let toDisplay = null;
        let file = input.files[0];
        // Check if the file type is JSON or if the file name ends with ".json"
        // The console logging is temporary and will be replaced with shown text
        const errorArea = document.getElementById("error");
        errorArea.innerHTML = "";

        if (file.type === 'application/json' || file.name.endsWith('.json')) {
            // We are given a JSON file and can't save it without some server side code, so I will just verify it and send it to the display function
            const reader = new FileReader();

            reader.onload = function(event) {
                const jsonData = JSON.parse(event.target.result);

                if (Array.isArray(jsonData)) {
                    // Something else will need to be done
                    console.log("Its an Array");
                    if (verified(jsonData)) {
                        // display(jsonData);
                    }
                    else {
                        errorArea.innerHTML = 'Array is not in the correct format.';
                    }
                }
                else if (isPlainObject(jsonData)) {
                    if (!("title" in jsonData)) {
                        // Add a temporary title
                        jsonData["title"] = DEFAULT_TITLE_MESSAGE;
                    }
                    if (!("data" in jsonData)) {
                        errorArea.innerHTML = 'JSON has no data field.';
                    }
                    else {
                        datas = verifyAndSort(jsonData["data"]);
                        if (datas === null) {
                            errorArea.innerHTML = 'Data field is not in the correct format.';
                        }
                        else {
                            toDisplay = jsonData;
                            toDisplay["data"] = datas;
                            display(toDisplay);
                        }
                    }
                }
                else {
                    // Something is wrong, return error
                    errorArea.innerHTML = 'JSON file is not an object or Array';
                }
            };

            reader.readAsText(file);
        }
        else {
            errorArea.innerHTML = 'File is not a JSON file.';
        }
    };

    input.click();
}
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
                + '<p class="due-date">'+ taskData.data[i].dueDate + '</p>'
                + '<p class="description" style="display: none;">' + taskData.data[i].details + '</p>'
                + '</li>';
    }
}