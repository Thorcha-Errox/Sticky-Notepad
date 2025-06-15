let noteData=[]; 
let generatedId=1;

if (localStorage.getItem("Storage") !== null) {
    noteData = JSON.parse(localStorage.getItem("Storage"));
    if (noteData.length > 0) { 
        let lastIndex = noteData.length - 1;
        generatedId = noteData[lastIndex].id + 1;
    }
}
function displayExistingNotes()
{
    noteData.forEach(function(oldNote,index){

            let notes = document.createElement("div"); 
            notes.classList.add("notes");

          
            let text = document.createElement("input");
            text.classList.add("note-title");
            text.setAttribute("type","text");
            text.setAttribute("placeholder","Sticky Title...");
            text.setAttribute("data-Id", oldNote.id);
            text.value=oldNote.title;
            text.onkeyup=updateTitle;

            
            let content = document.createElement("textarea");
            content.classList.add("content");
            content.setAttribute("placeholder","Content Here...")
            content.setAttribute("data-Id", oldNote.id);
            content.value=oldNote.content;
            content.onkeyup=updateContent;

            let deleteBtn=document.createElement("img");
            deleteBtn.src="./img/delete.png";
            deleteBtn.setAttribute("data-id",oldNote.id);
            deleteBtn.onclick=deleteNote;


            notes.appendChild(text); 
            notes.appendChild(content);
            notes.append(deleteBtn);


            document.getElementById("box").appendChild(notes);
    })
}

displayExistingNotes();


function newNotes(){
    let notes = document.createElement("div"); 
    notes.classList.add("notes");

    let text = document.createElement("input");
    text.classList.add("note-title");
    text.setAttribute("type","text");
    text.setAttribute("placeholder","Sticky Title...");
    text.setAttribute("data-Id", generatedId);
    text.onkeyup=updateTitle;

    let content = document.createElement("textarea");
    content.classList.add("content");
    content.setAttribute("placeholder","Content Here...")
    content.setAttribute("data-Id", generatedId);
    content.onkeyup=updateContent;

    let deleteBtn=document.createElement("img");
    deleteBtn.src="./img/delete.png";
    deleteBtn.setAttribute("data-id",generatedId);
    deleteBtn.onclick=deleteNote;

    notes.appendChild(text); 
    notes.appendChild(content);
    notes.append(deleteBtn);
    document.getElementById("box").appendChild(notes);

    noteData.push({id:generatedId,title:"",content:""});// Here i store data in array named noteData and the datas that has stored in object type.
    generatedId++; 

    localStorage.setItem("Storage",JSON.stringify(noteData));

}

function updateTitle(){
    let titleId = Number( this.getAttribute("data-Id")); 
    let titleValue = this.value;
    let obj = noteData.find(function(note,index){
        return note.id===titleId;
    })

    obj.title = titleValue; 
    localStorage.setItem("Storage",JSON.stringify(noteData));

}

function updateContent(){
    let contentId = Number( this.getAttribute("data-Id")); 
    let contentValue = this.value;

   
    let obj = noteData.find(function(note,index){ 
        return note.id===contentId;
    })

    obj.content = contentValue; 


    localStorage.setItem("Storage",JSON.stringify(noteData));


}

function deleteNote()
{

    let deleteId=Number(this.getAttribute("data-id"));
    
    let index=noteData.findIndex(function(note,index){
        return note.id===deleteId;
    })

    noteData.splice(index,1);

    this.parentNode.remove();

    localStorage.setItem("Storage",JSON.stringify(noteData));

}

