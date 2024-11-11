
let todo_Input=document.querySelector("#newtodoinput")
let taskList=document.querySelector("#taskList")

let deletebtn=document.querySelector("#delete")
let editbtn;
let count=0;
let editIcon=document.querySelector("#edit");
let htmldate;
let click=false
let isEdit=false
function formatedDate(){
  date=new Date()
 return (date.toString().split(' ').slice(1,4).join('/')+"/"+date.toString().split(' ').slice(4,5).map((e)=>e.split('').slice(0,5).join('')))
}

// function addtodo(e){
//   console.log(e)
// }

let add=document.querySelector("#addtodobutton")
add.addEventListener('click',()=>{
     click=true
    if(todo_Input.value!==""&&click){
        isEdit=false
// console.log(todo_Input.value)
if(click){   
fetch('/home', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',  // Tells the server that we're sending JSON
  },
  body: JSON.stringify({ desc:todo_Input.value, date:formatedDate(),count:count }),  // Sends the text input in a JSON object
})
    // Parse the JSON response from the server
  .then(data => {
    // console.log('Server response:');  
  })

  .catch(error => {
    console.error('Error:', error); 
  });
  
    }
todo_Input.value = "";

}
location.reload();

})

function deletetodo(id){
     
fetch(`/home/read/${id}`, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',  // Tells the server that we're sending JSON
  },
  
})
  .then((res)=>res.json())  
  .then(data => {
    // console.log('Server response:', data);  
  })

  .catch(error => {
    console.error('Error:', error); 
  });
  location.reload();
}

  function convertToInput(idtag,id){
    const pTag = document.getElementById(idtag);
    
    const text =pTag.textContent
    if(pTag){
    const input = document.createElement("input");
    input.type = "text";
    input.value = text;
    input.id = idtag;
    // input.classList.add("md:min-w-64");
    pTag.replaceWith(input);
    
    let editbtn =document.querySelector("#edit")
    moveCursorToEnd(input)
 editbtn.addEventListener('click',()=>{
   fetch(`/home/read/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',  // Tells the server that we're sending JSON
    },
    body:JSON.stringify({ desc:input.value ,date:formatedDate()})
  })
  // .then(response => response.json())
    .then(data => {
      // console.log('Server response:', data);  
    })
  
    .catch(error => {
      console.error('Error:', error); 
    });

location.reload();
  
})   
    }
}
function moveCursorToEnd(input) {
                            //start index ,   last index
  input.setSelectionRange(input.value.length, input.value.length);
  input.focus(); 
}