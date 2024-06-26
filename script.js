var DEFAULT_TITLE_MESSAGE = "Unnamed Task List";
var DATA_FIELDS = ["title", "dueDate", "label", "details"];
var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
/* Upload JSON file and store in data directory */

function getYear(str) {
    return parseInt(str.substring(str.indexOf(',') + 2, str.length));
}

function getMonth(str) {
    return MONTHS.indexOf(str.substring(0, 3));    
}

function getDay(str) {
    return parseInt(str.substring(str.indexOf(' ') + 1, str.indexOf(',')));    
}

/**
 * This method sorts our dates since they are stored as strings
 * 
 * @param list of dates
 * @returns sorted list of dates
 */

function sortDates(datas) {
    return datas.sort((task1, task2) => {
        let date1 = task1.dueDate;
        let date2 = task2.dueDate;

        //sort by year first
        let year1 = getYear(date1);
        let year2 = getYear(date2);
        if (year1 !== year2) {
            return year1 - year2;
        }
        //then sort by month
        let month1 = getMonth(date1);
        let month2 = getMonth(date2);
        if (month1 < month2) {
            return -1;
        } else if (month1 > month2) {
            return 1;
        }
        //then sort by day
        let day1 = getDay(date1);
        let day2 = getDay(date2);
        if (day1 !== day2) {
            return day1 - day2;
        }
        return 0; //dates are the same
    });
}

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

function verifyAndSort(data) {
    if (Array.isArray(data)) {
        for (const element of data) {
            if (isPlainObject(element)) {
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
    data = sortDates(data);
    return data;
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
    const image = el.getElementsByTagName('img')[0];
    //change from down to right
    if (image.classList[2] == 'down-icon') {
        image.classList.replace('down-icon', 'right-icon');
        description.style.display = 'none';
        if (image.classList[1] == 'light-mode-icon') {
            image.src = 'images/triangle-right-black.svg';
        }
        else {
            image.src = 'images/triangle-right-white.svg';
        }
    }
    // change from right to down
    else {
        image.classList.replace('right-icon', 'down-icon')
        description.style.display = 'block';
        if (image.classList[1] == 'light-mode-icon') {
            image.src = 'images/triangle-down-black.svg';
        }
        else {
            image.src = 'images/triangle-down-white.svg';
        }
    }
}

//updates all checkBoxs to have strikethrough functionality 
function strikeName(){

    let checkbox = document.querySelectorAll(".checkbox");
    let taskName = document.querySelectorAll(".taskName");

    checkbox.forEach((current, idx) => {
        current.addEventListener("change", () => {
            if(current.checked){
                taskName[idx].classList.add("strikethrough");
            } else{
                taskName[idx].classList.remove("strikethrough");
            }
        });
    } );
};

//makes default page have strikethrough functionality
strikeName();

function display(taskData) {
    const listTitle=document.getElementsByClassName("title");
    listTitle[0].innerHTML=taskData.title;
    //populating the list of tasks (?)
    const listContainer = document.getElementById("list");
    listContainer.innerHTML = ''; // empty list
    const arrow = (containerElem.classList[1] == "light-mode")? 
            '<button class="dropdown-btn" onclick="toggleIcon(this)"><img src="images/triangle-right-black.svg" alt="Task Icon "class="task-icon light-mode-icon right-icon" onclick="toggleIcon(this)"></button>'
            : '<button class="dropdown-btn" onclick="toggleIcon(this)"><img src="images/triangle-right-white.svg" alt="Task Icon "class="task-icon dark-mode-icon right-icon" onclick="toggleIcon(this)"></button>';
    for(let i=0; i<taskData.data.length; i++){
        listContainer.innerHTML += '<li class="task">'
                + arrow 
                + '<input class="checkbox" type="checkbox">'
                + '<h3 class="taskName">' + taskData.data[i].title + '</h3>'
                + '<p class="due-date">'+ taskData.data[i].dueDate + '</p>'
                + '<p class="description" style="display: none;">' + taskData.data[i].details + '</p>'
                + '</li>';
    }
    //updates all new checkboxes with strikethrough functionality
    strikeName();
}