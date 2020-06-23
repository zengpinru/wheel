const listContainer = document.getElementById('listContainer');
const leftCon = document.getElementById('leftCon');
const rightCon = document.getElementById('rightCon');
let index = 1;

leftCon.addEventListener('click', (e) => {
  index--;
  listContainer.classList.add('transition');
  listContainer.style.transform = `translate(-${ index * 600 }px, 0)`;
  if (index === 0) {
    index = 4;
    setTimeout(() => {
      listContainer.classList.remove('transition');
      listContainer.style.transform = `translate(-${ index * 600 }px, 0)`;
    }, 1000);
  }
});

rightCon.addEventListener('click', (e) => {
  index++;
  listContainer.classList.add('transition');
  listContainer.style.transform = `translate(-${ index * 600 }px, 0)`;
  if (index === 5) {
    index = 1;
    setTimeout(() => {
      listContainer.classList.remove('transition');
      listContainer.style.transform = `translate(-${ index * 600 }px, 0)`;
    }, 1000);
  }
});
