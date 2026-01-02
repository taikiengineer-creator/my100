'use strict';

let items = [];

function initializeList() {
  const container = document.getElementById('itemsGrid');

  for (let i = 1; i <= 100; i++) {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'item';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox';
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        itemDiv.classList.add('completed');
      } else {
        itemDiv.classList.remove('completed');
      }
      updateProgress();
      saveToStorage();
    });

    const numberSpan = document.createElement('span');
    numberSpan.className = 'item-number';
    numberSpan.textContent = i + '.';

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'item-input';
    input.placeholder = 'やりたいことを入力...';
    input.addEventListener('input', saveToStorage);

    itemDiv.appendChild(checkbox);
    itemDiv.appendChild(numberSpan);
    itemDiv.appendChild(input);
    container.appendChild(itemDiv);

    items.push({checkbox, input, itemDiv});
  }

  loadFromStorage();
}

function updateProgress() {
  const completed = items.filter(item => item.checkbox.checked).length;
  const percentage = completed;

  document.getElementById('progressFill').style.width = percentage + '%';
  document.getElementById('progressFill').textContent = percentage + '%';
  document.getElementById('completedPercentage').textContent = completed;
}

function saveToStorage() {
  const data = items.map(item => ({
    text: item.input.value,
    checked: item.checkbox.checked
  }));
  localStorage.setItem('bucketList', JSON.stringify(data));
}

function loadFromStorage() {
  const saved =localStorage.getItem('bucketList');
  if (saved) {
    const data = JSON.parse(saved);
    data.forEach((item, index) => {
      if (items[index]) {
        items[index].input.value = item.text;
        items[index].checkbox.checked = item.checked;
        if (item.checked) {
          items[index].itemDiv.classList.add('completed');
        }
      }
    });
    updateProgress();
  }
}

function saveList() {
  alert('保存しました!');
}

function clearAll() {
  if (confirm('本当にクリアしますか?')) {
    items.forEach(item => {
      item.input.value = '';
      item.checkbox.checked = false;
      item.itemDiv.classList.remove('completed');
    });
    localStorage.removeItem('bucketList');
    updateProgress();
  }
}

initializeList();
