window.onload = ()=>{
    document.body.addEventListener('click',(e)=> {
        let element = e.target;
        let elementListClass = element.classList;
        if(elementListClass.contains('add-car')){
            let content = element.parentNode.parentNode;
            let curseName = content.querySelector('.curse-name').textContent;
            let price = content.querySelector('.price').textContent;
            if(validateCurse(curseName)){
                addToCar(curseName,price);
            }else{
                alert("El curso "+ curseName +" ya está agregado");
            }  
        } else if (elementListClass.contains('remove-car')){
            let tr = element.parentNode.parentNode;
            deleteItem(tr);
        }
    });

    getItemsLocalStorage();
};

function addToCar(curseName,price){
    let carTable = document.querySelector('#lista-carrito');
    let bodyTable = carTable.querySelector('tbody');
    let tr = document.createElement('tr');
    let a = document.createElement('a');
    a.classList.add('remove-car');
    a.setAttribute('href','#');
    a.textContent = 'Eliminar';
    let cont = parseInt(document.querySelector('#cont-car').textContent)+1;
    let data = [curseName,price];
    let td;

    for (let i = 0; i < data.length; i++) {

        td = document.createElement('td');
        td.innerHTML = data[i];
        tr.appendChild(td);
    }

    td = document.createElement('td');
    td.appendChild(a);
    tr.appendChild(td);
    bodyTable.appendChild(tr);
    addToLocalStorage(curseName,price);
    changeCont('add');
}

function validateCurse(curseName){
    let carTable = document.querySelector('#lista-carrito');
    let data = carTable.querySelector('tbody').querySelectorAll('td');
    for (let i = 0; i < data.length; i++) {
        if (data[i].textContent == curseName){
            return false;
        }
    }
    return true;
}

function changeCont(action){
    let cont = document.querySelector('#cont-car');
    let num = parseInt(cont.textContent);
    if(action == 'add'){
        num++;
    }else{
        num--;
    }
    console.log(num);
    cont.textContent = num.toString();
}

function addToLocalStorage(curseName,cursePrice){
    localStorage.setItem(curseName,JSON.stringify({name:curseName,price:cursePrice}));
}

function getItemsLocalStorage(){
    if(localStorage.length > 0){

        for (let i = 0; i < localStorage.length; i++) {
            let name = localStorage.key(i);
            let curse = JSON.parse(localStorage.getItem(name));
            addToCar(curse.name,curse.price);
        }
    }
}

function deleteItem(tr){
    let parent = tr.parentNode;
    let name = tr.firstElementChild.textContent;
    deleteItemLocalStorage(name);
    parent.removeChild(tr);
    changeCont('');
}

function deleteItemLocalStorage(name){
    localStorage.removeItem(name);
}