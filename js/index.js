var siteNameInput = document.getElementById("siteNameInput");
var siteURLInput = document.getElementById("siteURLInput");
var arrInput = [];
if (localStorage.getItem("infoSite") != null) {
    arrInput = JSON.parse(localStorage.getItem("infoSite"));
    disPlaySite();
}
function submit() {
    var infoSite = {
        name: siteNameInput.value,
        url: siteURLInput.value,
    }
    arrInput.push(infoSite);
    localStorage.setItem("infoSite", JSON.stringify(arrInput));

    disPlaySite();
    clearInput();
}
function disPlaySite() {
    var play = " ";
    for (var i = 0; i < arrInput.length; i++) {
        play += `
        <tr>
                    <td>${i}</td>
                    <td>${arrInput[i].name}</td>
                    <td><button id="visitInput" type="button" class="btn btn-success" onclick="visitInput()"><i class="fa-solid fa-eye"></i>
                            Visit</button>
                    </td>
                    <td><button id="deleteInput" type="button" class="btn btn-danger"onclick="checkDelete(${i})"><i class="fa-solid fa-trash"></i>
                            Delete</button>
                    </td>
                </tr> `
    }
    document.getElementById("tbody").innerHTML = play;

}
function clearInput() {
    siteNameInput.value = "";
    siteURLInput.value = "";
}
function deleteInput(siteIndex) {

    arrInput.splice(siteIndex, 1);
    disPlaySite();
    localStorage.setItem("infoSite", JSON.stringify(arrInput));

}
function visitInput() {
    siteURLInput = document.getElementById("siteURLInput").value;
    window.open(siteURLInput, "_blank");

}
function checkDelete(siteIndex) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            deleteInput(siteIndex);
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        }
    });
}