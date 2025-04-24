let noteData=[]; // this array is used to store objects that contains sticky note's title title and content.
let generatedId=1;// this is for giving the unique id name to all notes element.

// if(localStorage.getItem("Storage")!==null)
// {
//     noteData=JSON.parse(localStorage.getItem("Storage"));
//     let lastIndex=noteData.length-1;
//     generatedId=noteData[lastIndex].id+1;
// }
if (localStorage.getItem("Storage") !== null) {
    noteData = JSON.parse(localStorage.getItem("Storage"));
    if (noteData.length > 0) {  // Check if noteData is not empty
        let lastIndex = noteData.length - 1;
        generatedId = noteData[lastIndex].id + 1;
    }
}
// if(localStorage.getItem("box")!==null)
//     {
//         notesData=JSON.parse(localStorage.getItem("box"));
//         if(notesData.length!==0)
//         {
//             let lastIndex=notesData.length-1;
//             generatedId=notesData[lastIndex].id+1;
//         }
//     }
    

function displayExistingNotes()
{
    noteData.forEach(function(oldNote,index){

            // Here, i create an element that creates the notes section
            let notes = document.createElement("div"); 
            notes.classList.add("notes");

            // Here, as above, i created the input feild in notes section
            let text = document.createElement("input");
            text.classList.add("note-title");
            text.setAttribute("type","text");
            text.setAttribute("placeholder","Sticky Title...");
            text.setAttribute("data-Id", oldNote.id);//new attribute will be added to all input feild.
            text.value=oldNote.title;
            text.onkeyup=updateTitle;// Here, on pressing any key the updateTitle function will be called.

            // Here also i do the same stuff as input section but this is for the content of sticky app.
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


            notes.appendChild(text); // this line is showing the text field.
            notes.appendChild(content);// this line is showing the content field.
            notes.append(deleteBtn);


            document.getElementById("box").appendChild(notes);// this line take the notes-container by "box named id" and showing the whole notes.

    })
}

displayExistingNotes();


function newNotes(){
    // Here, i create an element that creates the notes section
    let notes = document.createElement("div"); 
    notes.classList.add("notes");

    // Here, as above, i created the input feild in notes section
    let text = document.createElement("input");
    text.classList.add("note-title");
    text.setAttribute("type","text");
    text.setAttribute("placeholder","Sticky Title...");
    text.setAttribute("data-Id", generatedId);//new attribute will be added to all input feild.
    text.onkeyup=updateTitle;// Here, on pressing any key the updateTitle function will be called.


    // Here also i do the same stuff as input section but this is for the content of sticky app.
    let content = document.createElement("textarea");
    content.classList.add("content");
    content.setAttribute("placeholder","Content Here...")
    content.setAttribute("data-Id", generatedId);
    content.onkeyup=updateContent;

    let deleteBtn=document.createElement("img");
    deleteBtn.src="./img/delete.png";
    deleteBtn.setAttribute("data-id",generatedId);
    deleteBtn.onclick=deleteNote;

    notes.appendChild(text); // this line is showing the text field.
    notes.appendChild(content);// this line is showing the content field.
    notes.append(deleteBtn);

    document.getElementById("box").appendChild(notes);// this line take the notes-container by "box named id" and showing the whole notes.


    noteData.push({id:generatedId,title:"",content:""});// Here i store data in array named noteData and the datas that has stored in object type.
    generatedId++; // Here as the new notes creates the unique id value gets incremented. 

    localStorage.setItem("Storage",JSON.stringify(noteData));

}

function updateTitle(){
    let titleId = Number( this.getAttribute("data-Id")); // Here i extract the unique Id of each notes and assigned it to titleId.
    let titleValue = this.value;// Here i get the value or the text that has been entered in title section.

    //console.log(titleValue)
    let obj = noteData.find(function(note,index){ // Here, i am extracting the object from the array whose id is similar to "titleID" means the field where i am inputting some text.
        return note.id===titleId;
    })

    obj.title = titleValue; // Here, i am adding the value to the object of "noteData" array by taking the object id of the title in which i am inserting text.
    // console.log(obj);
    // console.log(noteData);

    localStorage.setItem("Storage",JSON.stringify(noteData));

}

function updateContent(){
    let contentId = Number( this.getAttribute("data-Id")); // Here i extract the unique Id of each notes and assigned it to titleId.
    let contentValue = this.value;// Here i get the value or the text that has been entered in title section.

    //console.log(titleValue)
    let obj = noteData.find(function(note,index){ // Here, i am extracting the object from the array whose id is similar to "titleID" means the field where i am inputting some text.
        return note.id===contentId;
    })

    obj.content = contentValue; // Here, i am adding the value to the object of "noteData" array by taking the object id of the title in which i am inserting text.
    // console.log(obj);
    // console.log(noteData);

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

