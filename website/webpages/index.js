'use strict';

window.onload = function () {
  document.getElementById('new-li').addEventListener('click', addlistElement);
  document.getElementById('new-head').addEventListener('click', addHeader);
  document.getElementById('delete-selected').addEventListener('click', deleteElement);
  document.getElementById('bin').addEventListener('drop', drop);
  document.getElementById('bin').addEventListener('dragover', (e) => { e.preventDefault(); });
  document.getElementById('bin').addEventListener('dragend', (e) => { e.preventDefault(); });
  document.getElementById('sort').addEventListener('click', sortHeadings);
  document.getElementById('save-button').addEventListener('click', save);
  document.getElementById('load-button').addEventListener('click', load);
  document.addEventListener('keydown', e => {
    let keyEvent = document.event ? event : e;
    if (keyEvent.keyCode === 83 && (keyEvent.ctrlKey || keyEvent.commandKey) && keyEvent.shiftKey){
      showSaves();
    }
    if (keyEvent.keyCode === 90 && (keyEvent.ctrlKey || keyEvent.commandKey)){
      undo();
    }
  });
  document.getElementById('textarea').addEventListener('drop', drop);
  document.getElementById('textarea').addEventListener('dragover', (e) => { e.preventDefault(); });
  document.getElementById('textarea').addEventListener('dragend', (e) => { e.preventDefault(); });

}

const showSaves = function() {
  const savefiles = window.localStorage.getItem('savelist');
  alert("Current save files are: " + savefiles);
}

const undo = function() {
  if (undo){
    lastparent.appendChild(undosave);
    undosave = null;
    lastparent = null;
  }
}


const addListeners = function() {
  document.querySelectorAll('ul, li').forEach((e) => e.addEventListener('click', selectElement));
  document.querySelectorAll('ul, li').forEach((e) => e.addEventListener('dragstart', dragElementStarted));
  document.querySelectorAll('ul, li').forEach((e) => e.addEventListener('dragover', (e) => { e.preventDefault(); }));
  document.querySelectorAll('ul, li').forEach((e) => e.addEventListener('dragend', (e) => { e.preventDefault(); }));
  document.querySelectorAll('ul, li').forEach((e) => e.addEventListener('drop', drop));
}

let saves = [];
let savestring = null;

const save = function() {
  if (selected){
    selected.classList.remove('selected');
    selected = null;
  }
  let fileName = prompt("File Name: ", "");
  if (fileName == null || fileName == "" || fileName.includes(" ") || fileName.length > 20) {
    alert("Error: Invalid FileName");
  }
  else {
    saves.push(fileName);
    const savefile = document.getElementById('textarea').innerHTML;
    window.localStorage.setItem(fileName, savefile);
    saves.push(window.localStorage.getItem('savelist'));
    if(saves.length >= 2){
      savestring = saves.join(', ');
    }
    else{
      savestring = saves;
    }
    window.localStorage.setItem('savelist', savestring);
  }
}

const load = function() {
  let fileName = prompt("FileName: ", "");
  if (fileName == null || fileName == "" || fileName == " ") {
    alert("Error: Invalid FileName");
  }
  else {
    const savefile = window.localStorage.getItem(fileName);
    document.getElementById('textarea').innerHTML = savefile;
    addListeners();
  }
}

let undosave = null;
let lastparent = null;

const deleteElement = function() {
  if (selected != null) {
    if (selected.children.length == 0){
      undosave = selected;
      lastparent = selected.parentNode;
      selected.parentNode.removeChild(selected);
      selected = null;
    }
  }
}

const sortHeadings = function() {
  let swap = null;
  let eles = null;
  let i = null;
  let swapping = true;
  while (swapping) {
    swapping = false;
    eles = document.getElementsByTagName('ul');
    for (i = 0; i < (eles.length - 1); i++){
      swap = false;
      if (eles[i].innerHTML.toLowerCase() > eles[i + 1].innerHTML.toLowerCase()) {
        swap = true;
        break;
      }
    }
    if (swap) {
      eles[i].parentNode.insertBefore(eles[i + 1], eles[i]);
      swapping = true;
    }
  }
}



const addlistElement = function() {
  if (selected != null) {
    const newlistelement = document.createElement('li');
    newlistelement.className = 'new-li';
    newlistelement.contenteditable = true;
    newlistelement.setAttribute('draggable', 'true');
    selected.appendChild(newlistelement);
    addListeners();
  }
}

const addHeader = function () {
  const newHeader = document.createElement('ul');
  newHeader.className = 'new-ul';
  newHeader.textContent = '-';
  newHeader.setAttribute('contenteditable', 'true');
  newHeader.setAttribute('draggable', 'true');
  newHeader.id = 'Head';
  const ul = document.getElementById('textarea');
  ul.appendChild(newHeader);
  addListeners();
}

let selected = null;
let dragParent = null;
let dragObject = null;

const selectElement = function(e) {
  if (selected) {
    selected.classList.remove('selected');
  }
  selected = e.target;
  selected.classList.add('selected');
}

function dragElementStarted(e) {
  dragObject = e.target;
  dragParent = e.target.parentElement;
 }

function drop(e) {
  e.preventDefault();
  if (e.target === document.getElementById('bin'))
  {
    dragParent.removeChild(dragObject);
    dragObject = null;
    dragParent = null;

  }
  e.target.appendChild(dragObject);
}
