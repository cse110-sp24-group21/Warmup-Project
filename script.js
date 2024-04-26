
/* Upload JSON file and store in data directory */

function importData() {
    let input = document.createElement('input');
    input.type = 'file';

    input.onchange = _ => {
        let file = input.files[0];
        // Check if the file type is JSON or if the file name ends with ".json"
        // The console logging is temporary and will be replaced with shown text
        if (file.type === 'application/json' || file.name.endsWith('.json')) {
            // We are given a JSON file and can't save it without some server side code, so I will just verify it and send it to the display function
            const reader = new FileReader();

            reader.onload = function(event) {
                const jsonData = JSON.parse(event.target.result);
                console.log(jsonData);

                if (Array.isArray(jsonData)) {
                    // Something else will need to be done
                    console.log("Its an Array");
                }
                else if (jsonData !== null && typeof jsonData === 'object' && jsonData.constructor === Object) {
                    if (!("title" in jsonData)) {
                        // Add a temporary title
                        jsonData["title"] = "Unnamed Task List";
                    }
                    display(jsonData);
                }
                else {
                    // Something is wrong, return error
                    console.log("I don't know what type it is");
                }
            };

            reader.readAsText(file);
        }
        else {
            console.log('File is not a JSON file.');
        }
    };

    input.click();
}

function display(taskData) {
    const listContainer = document.getElementById("list");
    listContainer.innerHTML = ''; // empty list
    // foreach loop through tasks
}