function attachEvents() {
const url=`http://localhost:3030/jsonstore/messenger`;

const sendBtn=document.getElementById("submit");
const refreshBtn=document.getElementById("refresh");
const textArea=document.getElementById("messages");

sendBtn.addEventListener("click",onSubmit);
refreshBtn.addEventListener("click",getAll)


async function onSubmit(e){
    let nameRef=document.querySelector("input[name='author']")
    let msgRef=document.querySelector("input[name='content']");
    let name=nameRef.value;
    let msgText=msgRef.value;
    let data={
        method:"POST",
        headers:{"Content-type": "aplication/json"},
        body:JSON.stringify({author:name,content:msgText})
    }
    let res=await fetch(url,data);
    nameRef.value="";
    msgRef.value="";


}

async function getAll(e){
    const response=await fetch(url);
    const data= await response.json();
    const value=Object.values(data);
    value.forEach(msg=>{
        textArea.value +=`${msg.author}: ${msg.content}\n`;
    })
    textArea.value=textArea.value.trim();
    
}

}

attachEvents();