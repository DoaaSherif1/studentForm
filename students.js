window.addEventListener("load",function(){


    //selections
    let addButton=this.document.querySelector("input[value=Add]");
    let studentsTable=this.document.querySelectorAll("table")[1];
    let nameTextBox=document.querySelector("input[name=studentName]");
    let gradeTextBox=document.querySelector("input[name=studentGrade]");
    let nameTextBoxError=document.querySelectorAll("span")[0];
    let gradeTextBoxError=document.querySelectorAll("span")[1];
    let row,studentGrade;


    //events
    addButton.onclick=function(){
        let departmentValue=document.querySelector("input[name=Department]:checked").value;

        //1- create tr
        let trElm=document.createElement("tr"); //<tr></tr>
        trElm.classList.add(departmentValue);

      //2- create td 
        let tdElm=document.createElement("td"); //<td></td>
        //pascal case
        const switchString=(nameTextBox)=>{
    
          const words=nameTextBox.split(" ");
          for(let i=0;i<words.length;i++){
              words[i]=words[i][0].toUpperCase()+ words[i].toLowerCase().substring(1);
          }
      
          return words.join(" ");
      }
        tdElm.innerText=switchString(nameTextBox.value);  //<td>......</td>
        
        
        let tdElm2=document.createElement("td");
        
        if(gradeTextBox.value>100||gradeTextBox.value==""){
          gradeTextBoxError.classList.remove("hidden");
          return;
        }else{
          gradeTextBoxError.classList.add("hidden");
          tdElm2.innerText=gradeTextBox.value;

          
        }
      
        
        trElm.append(tdElm);
        trElm.append(tdElm2);
        //repeated names
        let studentNames=[];
        for(let i=0;i<studentsTable.children.length;i++){
          studentNames.push(studentsTable.children[i].children[0].innerText);
        }
        if(studentNames.indexOf(switchString(nameTextBox.value))!=-1){
          return;
        }
        

        //-- delete
        let deleteImg=document.createElement("img");
        deleteImg.src="./images/delete.svg";
        deleteImg.height="20";
        deleteImg.onclick=function(){
            this.parentElement.parentElement.remove();
        }

        tdElm=document.createElement("td");
        tdElm.append(deleteImg);
        trElm.append(tdElm);

        //4- tr-> table
        studentsTable.append(trElm);
        
      }


    
    
    gradeTextBox.onkeypress=function(event){  
      if(isNaN(event.key))
      {
          event.preventDefault();
          gradeTextBoxError.classList.remove("hidden");
      }else{
        gradeTextBoxError.classList.add("hidden");
        
      }
  }

    nameTextBox.onblur=function(){
    
      if(this.value==""){
      nameTextBoxError.classList.remove("hidden");
      return;
      }
      else
      nameTextBoxError.classList.add("hidden");
  }
  let filter=document.getElementById("filter");

  filter.addEventListener("change",function(){
    for(let i=0;i<studentsTable.children.length;i++){
      row=studentsTable.children[i];
      row.style.display="";
    }
    if(filter.value=='success'){
      for(let i=0;i<studentsTable.children.length;i++){
        studentGrade=Number(studentsTable.children[i].children[1].innerText);
        if(studentGrade<50){
          row=studentsTable.children[i];
          row.style.display='none';
        }
      }
    }
  if(filter.value=='fail'){
    for(let i=0;i<studentsTable.children.length;i++){
      studentGrade=new Number(studentsTable.children[i].children[1].innerText);
      if(studentGrade>=50){
        row=studentsTable.children[i];
        row.style.display='none';
      }
    }
  }
  if(filter.value=='all'){
    for(let i=0;i<studentsTable.children.length;i++){
      row=studentsTable.children[i];
      row.style.display='';
    }
  }
  });
  
  

});//load

function searchElm(){
  let input=document.getElementById("input");
  let filter=input.value.toUpperCase();
  let table=document.getElementById("mytable");
  let tr=table.getElementsByTagName("tr");
  for(let i=0;i<tr.length;i++){
    let td=tr[i].getElementsByTagName("td")[0];
    if(td){
      if(td.innerHTML.toUpperCase().indexOf(filter)>-1){
        tr[i].style.display="";

      }else{
        tr[i].style.display="none";
      }
    }
  }
}



