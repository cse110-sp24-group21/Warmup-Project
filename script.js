
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
    const listContainer = document.getElementById("list");
    listContainer.innerHTML = ''; // empty list
    // foreach loop through tasks
}