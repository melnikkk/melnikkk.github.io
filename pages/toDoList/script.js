let toDoArr = [];
let inProgressArr = [];
let doneArr = [];

let toDoListCounter = 0;
let inProgressListCounter = 0;
let doneListCounter = 0;

let targetId = 0;

const toDoForm = document.forms.toDoForm;

const listToDo = document.getElementById('to-do-list');
const listInProgress = document.getElementById('in-progress-list');
const listDone = document.getElementById('done-list');

const clearBtn =document.querySelectorAll('.clear');
const counterElement = document.querySelectorAll('.counter');

const inputTitle = document.getElementById('todo-title');
const inputDeadline = document.getElementById('todo-deadline');

const errorWindow = document.getElementById('error-window');
const contineBtn = document.getElementById('contine-btn');

const confirmWindow = document.getElementById('confirm-window');



function getFromLocal(key, arr, list, btnText) {
    arr = JSON.parse(localStorage.getItem(key));

    if (arr && arr.length) {
        for (let i = 0; i < arr.length; i++) {
            addListItem(list, arr, i, btnText);
        }

        if (btnText === 'Take it') {
            toDoArr = arr;
            toDoListCounter = arr.length;
            updateCounter(counterElement[0], toDoListCounter);

        } else if (btnText === 'Done') {
            inProgressArr = arr;
            inProgressListCounter = arr.length;
            updateCounter(counterElement[1], inProgressListCounter);

        } else if (btnText === 'Redo') {
            doneArr = arr;
            doneListCounter = arr.length;
            updateCounter(counterElement[2], doneListCounter);
        }
    }
}

function delElementFromInProgress() {
    confirmWindow.classList.remove('active');
        
    deleteElement(targetId, inProgressArr);
    updateCounter(counterElement[1], --inProgressListCounter);
}

function addListItem(list, arr, counter, btnText) {
    return list.insertAdjacentHTML('beforeend', `
        <li class="todo-item" data-id=${arr[counter].id}>
            <div class="item-text">
                <p class="text">${arr[counter].title}</p>
                <p class="deadline">Deadline: ${arr[counter].deadline}</p>
            </div>
            <div class="item-btns">
                <button class="btn" value="takeIt">${btnText}</button>
                <button class="btn" value="delete">Delete</button>
            </div>
        </li> 
    `);
}

function updateCounter(element, counter) {
    element.innerHTML = counter;
}

function deleteElement(itemId, arr) { 
    let delItem = document.querySelector(`[data-id='${itemId}']`)
    
    delItem.remove();
    arr.splice(arr.findIndex(item => item.id === +itemId), 1);  
}



toDoForm.onsubmit = () => {
    if (inputTitle.value) {
        toDoArr.push({title: inputTitle.value, deadline: inputDeadline.value, id: Date.now()});

        addListItem(listToDo, toDoArr, toDoListCounter, 'Take it');
        updateCounter(counterElement[0], ++toDoListCounter);

        toDoForm.reset();

        localStorage.setItem('toDoArr', JSON.stringify(toDoArr));

        return false; 

    } else {
        const noValueWindow = document.getElementById('error-no-value')
        noValueWindow.classList.add('active');
        document.getElementById('ok-btn').addEventListener('click', () => {noValueWindow.classList.remove('active')});
    }
}

document.addEventListener('DOMContentLoaded', () => {
    getFromLocal('toDoArr', toDoArr, listToDo, 'Take it');
    getFromLocal('inProgressArr', inProgressArr, listInProgress, 'Done');
    getFromLocal('doneArr', doneArr, listDone, 'Redo');
});

document.getElementById('confirm-btn').addEventListener('click', delElementFromInProgress); 

document.getElementById('cancel-btn').addEventListener('click', () => confirmWindow.classList.remove('active'));


listToDo.addEventListener('click', (event) => {
    let {target} = event;
    let itemId = target.closest('li').dataset.id;  

    if (!target.matches('button')) return;

    if (target.value === 'takeIt') {
             
        if (inProgressArr.length < 5) {
            let elementId = toDoArr.findIndex(item => item.id === +itemId);
            
            inProgressArr.push(toDoArr[elementId]);
            
            deleteElement(itemId, toDoArr);
            
            inProgressArr[inProgressListCounter].id = Date.now();
            
            addListItem(listInProgress, inProgressArr, inProgressListCounter, 'Done');                     
            updateCounter(counterElement[1], ++inProgressListCounter);
            updateCounter(counterElement[0], --toDoListCounter);
            
            
        } else {
            errorWindow.classList.add('active');
            contineBtn.addEventListener('click', () => errorWindow.classList.remove('active'));
        }

        localStorage.setItem('toDoArr', JSON.stringify(toDoArr));
        localStorage.setItem('inProgressArr', JSON.stringify(inProgressArr));
    }

    if (target.value === 'delete') { 
        deleteElement(itemId, toDoArr);
        updateCounter(counterElement[0], --toDoListCounter);  
    }
});


listInProgress.addEventListener('click', (event) => {
    let {target} = event;
    let itemId = target.closest('li').dataset.id;   
    
    if (!target.matches('button')) return;

    if (target.value === 'takeIt') {
        let elementId = inProgressArr.findIndex(item => item.id === +itemId);
        
        doneArr.push(inProgressArr[elementId]);
        
        deleteElement(itemId, inProgressArr);
        
        doneArr[doneListCounter].id = Date.now();

        addListItem(listDone, doneArr, doneListCounter, 'Redo');
        updateCounter(counterElement[2], ++doneListCounter);
        updateCounter(counterElement[1], --inProgressListCounter);
    }

    if (target.value === 'delete') {   
        confirmWindow.classList.add('active');
        targetId = itemId;     
    }  

    localStorage.setItem('inProgressArr', JSON.stringify(inProgressArr));
    localStorage.setItem('doneArr', JSON.stringify(doneArr));
});


listDone.addEventListener('click', (event) => {
    let {target} = event;
    let itemId = target.closest('li').dataset.id;

    if (target.value === 'takeIt') {
        let elementId = doneArr.findIndex(item => item.id === +itemId);

        toDoArr.push(doneArr[elementId]);

        deleteElement(itemId, doneArr);

        toDoArr[toDoListCounter].id = Date.now();

        addListItem(listToDo, toDoArr, toDoListCounter, 'Take it');
        updateCounter(counterElement[0], ++toDoListCounter);
        updateCounter(counterElement[2], --doneListCounter);

    }

    if (target.value === 'delete') {
        deleteElement(itemId, doneArr);
        updateCounter(counterElement[2], --doneListCounter);
    } 
    
    localStorage.setItem('toDoArr', JSON.stringify(toDoArr));
    localStorage.setItem('doneArr', JSON.stringify(doneArr));
});


clearBtn[0].addEventListener('click', () => {
    listToDo.innerHTML = '';
    counterElement[0].innerHTML = '0';
    toDoListCounter = 0;
    toDoArr.length = 0;
    localStorage.setItem('toDoArr', JSON.stringify(toDoArr));
});

clearBtn[1].addEventListener('click', () => {
    const clearWindow = document.getElementById('clear-window');
    const clearConfirmBtn = document.getElementById('confirm-clear-btn');
    const clearCancelBtn = document.getElementById('cancel-clear-btn');

    clearWindow.classList.add('active');

    clearConfirmBtn.addEventListener('click', () => {
        clearWindow.classList.remove('active');
        listInProgress.innerHTML = '';
        counterElement[1].innerHTML = '0';
        inProgressListCounter = 0;
        inProgressArr.length = 0;
    });

    localStorage.setItem('inProgressArr', JSON.stringify(inProgressArr));

    clearCancelBtn.addEventListener('click', () => clearWindow.classList.remove('active'));
});

clearBtn[2].addEventListener('click', () => {
    listDone.innerHTML = '';
    counterElement[2].innerHTML = '0';
    doneListCounter = 0;
    doneArr.length = 0;
    localStorage.setItem('doneArr', JSON.stringify(doneArr));
});