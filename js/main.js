'use strict';

const addItems = document.querySelector(".add-items");
const itemList = document.querySelector(".plates");
const items = JSON.parse(localStorage.getItem('items')) || [];

addItems.addEventListener('submit', addItem);
itemList.addEventListener('click', toggleDone);

function addItem(e) {
  e.preventDefault();
  const text = (this.querySelector('[name=item]')).value;
  const item = {
    text,
    done: false
  };

  items.push(item);
  populateList(items, itemList);
  localStorage.setItem('items', JSON.stringify(items));
  this.reset();
}

function populateList(plates = [], plateList) {
  plateList.innerHTML = plates.map((plate, i) => {
    return `
    <li>
    <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
        <label for="item${i}">${plate.text}</label>
    </li>
    `;
  }).join('');
}

function toggleDone(e) {
  if (!e.target.matches('input')) return;
  const itemSelected = event.target;
  const indexOfItemSelected = itemSelected.dataset.index;
  items[indexOfItemSelected].done = !items[indexOfItemSelected].done;
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
}

populateList(items, itemsList);




