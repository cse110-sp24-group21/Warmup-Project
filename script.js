
/* Upload JSON file and store in data directory */
const fileUpload = document.getElementById("upload-file");
const fileStream = document.getElementById("fileInput");

fileUpload.addEventListener('click', function() {
    fileStream.click();
});

fileStream.addEventListener('change', function(event) {
    const newFile = event.target.files[0];
})