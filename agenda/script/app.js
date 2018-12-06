var agendaStorage = [];
var rawStorage = window.localStorage.getItem('agendaStorage');
if(rawStorage){
    agendaStorage =  JSON.parse(window.localStorage.getItem('agendaStorage'));
}

var agendaDataStructure = [
];

document.addEventListener("DOMContentLoaded", function() {
    console.log('dom loaded');
    loadHeader();
    loadFooter();
    reactToLoaders();
    initCheckboxes(); 
});

function initCheckboxes(){
   var allCheckboxes = document.querySelectorAll('ul>li>input[type="checkbox"]');

   allCheckboxes.forEach(element => {
      getCheckboxStateFromLocalStorage(element);
      element.addEventListener('change', calcualteProgress);
   });

   //initial calculations
   calcualteProgress();

}

function getCheckboxStateFromLocalStorage(checkboxEl){
   for(var i =0; i<agendaStorage.length; i++){
      if(checkboxEl.id == agendaStorage[i].inputId){
         checkboxEl.checked = agendaStorage[i].checked;
      }
   }
}

function calcualteProgress(){
   var changedInputEl = this;
   updateValueInLocalStorage(changedInputEl);

   var allCathegories =  document.querySelectorAll('.cathegory');
   var totalProggress = document.querySelector('#totalProgress');

   totalProggress.value = 0;
   allCathegories.forEach(cathegory => {
      var cathegoryProgressBar = cathegory.querySelector('progress');
      var checkedInputs = cathegory.querySelectorAll('input[type="checkbox"]:checked');
      cathegoryProgressBar.value=0;
      checkedInputs.forEach(checkedInput =>{
         cathegoryProgressBar.value = parseInt(cathegoryProgressBar.value) +  parseInt(checkedInput.value);
      });
      totalProggress.value = parseInt(totalProggress.value) +  parseInt(cathegoryProgressBar.value);
   });

}

function updateValueInLocalStorage(inputEl){

   if (agendaStorage && agendaStorage.length){
      var updated = false;
      for(var i=0; i<agendaStorage.length; i++){
         if(inputEl.id == agendaStorage[i].inputId){
            agendaStorage[i].checked =  inputEl.checked;
            updated = true;
         }
      }
      if(!updated){
         agendaStorage.push({inputId:inputEl.id, checked:inputEl.checked});
      }
      window.localStorage.setItem('agendaStorage', JSON.stringify(agendaStorage));
   }
   else{
      agendaStorage.push({inputId:inputEl.id, checked:inputEl.checked});
      window.localStorage.setItem('agendaStorage', JSON.stringify(agendaStorage));
   }
}

function reactToLoaders(){
   document.addEventListener('headerLoaded', function (e) {
      console.log('header loaded');
   }, false);
   document.addEventListener('footerLoaded', function (e) {
      console.log('footer loaded');
   }, false);

}