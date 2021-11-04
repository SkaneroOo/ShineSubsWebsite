
var txt = "Można przesyłać plik.";

var up = document.getElementById("uploader");
up.innerText = txt;

function sleep() {
    return
}

function click() {
    console.log("klik")
    var x = document.getElementById("upload-video");
    if ('files' in x) {
        if (x.files.length == 0) {
            console.log("Select one or more files.");
        } else {
            up.innerText = "Przesyłanie pliku..."
            let file = x.files[0]
            let req = new XMLHttpRequest();
            let formData = new FormData();
            var response;
            req.onreadystatechange=function() {
                if (req.readyState==4 && req.status==200){
                    console.log("file sent")
                    up.innerText = "Przesłano plik. Można przesyłąć kolejne pliki."
                }
            }
            formData.append("file", file);
            req.open("POST", "/private/uploadfile", true);
            req.onload = function (e) {
                if (req.readyState === 4) {
                    if (req.status === 200) {
                        console.log(req.responseText);
                    } else {
                        console.error(req.statusText);
                    }
                }
            }
            req.send(formData)
        }
    }
}

const button = document.getElementById("button");

button.addEventListener("click", event => {
    click();
})