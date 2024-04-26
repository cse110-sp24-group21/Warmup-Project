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
    let toDisplay = null;
    input.type = 'file';

    input.onchange = _ => {
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
                console.log(jsonData);

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

    if (toDisplay != null) {
        display(toDisplay);
    }
}

function display(taskData) {
    const listContainer = document.getElementById("list");
    listContainer.innerHTML = ''; // empty list
    // foreach loop through tasks
}