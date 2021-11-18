let ls = localStorage;
showNotes();

//Add Notes
function addNote() {
    let temp;
    let notes = ls.getItem('notes');
    let title = document.getElementById('addTitle');

    if (notes == null)
        notesArr = [];
    else
        notesArr = JSON.parse(notes);

    let str = title.value;

    for (let i = str.length; i >= 0; i--) {
        if (str[i] == 'h' && str[i + 1] == 't')
            notesArr.push(str.slice(i, start));

        if (str[i] == 'h')
            var start = i;
    }

    ls.setItem('notes', JSON.stringify(notesArr));
    title.value = '';
    showNotes();
}
//Show Notes
function showNotes() {
    let notes = ls.getItem('notes');

    if (notes == null)
        notesArr = [];
    else
        notesArr = JSON.parse(notes);

    let html = "";
    let display = document.getElementById('notes');

    for (i = 0; i < notesArr.length; i++) {
        html +=
            ` <div id="${i}" class="card box border-primary m-1 mx-3 d-flex flex-row align-items-center" style="min-width:25rem">
            <p class="card-header text-primary w-100" id="addTitle">${notesArr[i]}
            </p>
            <i class="fas fa-trash-alt float-right btn mr-3" onclick="deleteNote(${i})"></i>
            </div>`;
    }

    if (notesArr.length != 0)
        display.innerHTML = html;
    else
        display.innerHTML = "Nothing to show! Add Notes...";
}
//Delete Notes
function deleteNote(i) {
    let notes = ls.getItem('notes');

    if (notes == null) {
        notesArr = [];
    }
    else {
        notesArr = JSON.parse(notes);
    }

    notesArr.splice(i, 1);
    ls.setItem("notes", JSON.stringify(notesArr));
    showNotes();

}
function deleteAll() {
    let check = confirm("Are you want to delete all links");
    let notes = ls.getItem('notes');
    if (notes == null)
        notesArr = [];
    else
        notesArr = JSON.parse(notes);

    if (check)
        ls.clear('notes');

    showNotes();
}
//Open All links
function openAll() {
    let notes = ls.getItem('notes');

    if (notes == null)
        notesArr = [];
    else
        notesArr = JSON.parse(notes);

    for (i = 0; i < notesArr.length; i++)
        window.open(notesArr[i]);
}
//Theme Changer
document.documentElement.style.setProperty('--x', ls.getItem('theme'));
function darkmode() {
    if (ls.getItem('theme') != 1) {
        document.documentElement.style.setProperty('--x', '1');
        ls.setItem("theme", 1);
    } else {
        document.documentElement.style.setProperty('--x', '-1');
        ls.setItem("theme", -1);
    }
}

let search = document.getElementById('searchTxt');
search.addEventListener('input', () => {
    let box = document.getElementsByClassName('box');
    let txt = search.value;

    Array.from(box).forEach(function (element) {
        let linkTxt = element.getElementsByTagName('p')[0].innerText;

        if(linkTxt.includes(txt)) {
            console.log(txt)
        console.log(linkTxt)
            element.style.display = 'flex';
        }
        else
            element.style.display = 'none';
    })
})