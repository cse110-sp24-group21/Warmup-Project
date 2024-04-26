document.addEventListener("DOMContentLoaded", function() {   // Need to wait until the document is fully loaded to access html elements
    
    /* Upload JSON file and store in data directory */
    const fileUpload = document.getElementById("upload-file");
    const fileStream = document.getElementById("fileInput");
    const tasks = document.getElementsByClassName('task');  // Used to get a list of html elements with task class

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
        const listContainer = document.getElementById("list");
        listContainer.innerHTML = ''; // empty list
        // foreach loop through tasks
    }

    /* Toggle Functionality */
    for (var i = 0; i < tasks.length; i++) {
        const taskIcon = tasks[i].getElementsByClassName('task-icon')[0];  // get the task-icon element within a particular task
        const description = tasks[i].getElementsByClassName('description')[0];  // get the description element
        taskIcon.addEventListener('click', function() {
            if (taskIcon.src.endsWith('images/triangle-down.svg')) {
                taskIcon.src = 'images/triangle-right.svg';
                description.style.display = 'none';
            }
            else {
                taskIcon.src = './images/triangle-down.svg';
                description.style.display = 'block';
            }
        });
    }
});