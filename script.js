// для бургера
const burgerOpen = document.querySelector('.menu__burger');
const burger = document.querySelector('.burger');
const burgerClose = burger.querySelector('.burger__button');

// кнопка для запроса с сервера, категория товара
const links = document.querySelectorAll('.menu__link');
// spinner
const spinner = document.querySelector('.spinner');


// /////////////// создание карточек ////////////////////////
const cards = document.querySelector('.cards');
const groupElement = document.querySelector('.cards__groups');
const elementTemplate = document.querySelector('.element-template').content;
let initialCards = [
  { 
    url: "./img/img-1.png",
    title: "Dali"
  },
  { 
    url: "./img/img-2.png",
    title: "Cabasse"
  },
  { 
    url: "./img/img-3.png",
    title: "Rega naia"
  },
  { 
    url: "./img/img-4.png",
    title: "Fiio"
  },
];
 

function createCard(card) {
  const element = elementTemplate.querySelector('.card').cloneNode(true);
  const elImage = element.querySelector('.img');
  elImage.src = card.url;
  const elTitle = element.querySelector('.title');
  elTitle.textContent = card.title;
  
  return element;
}

function inserstCard(element) {
    cards.append(createCard(element));  
}

initialCards.forEach(function(card){
inserstCard(card);
});

// ////////////////////////////////////////////////////////////////

// слушатель для бургера
burgerOpen.addEventListener('click', () => {
    burger.classList.add('burger_open');
    burgerOpen.classList.add('menu__burger_hidden');
});
burgerClose.addEventListener('click', () => {
    burger.classList.remove('burger_open');
    burgerOpen.classList.remove('menu__burger_hidden');
});

// запрос к серверу по клику
links.forEach((link) => {
    link.addEventListener('click', () => {
        spinner.classList.remove('hidden');
        fetch('https://api.nomoreparties.co/beatfilm-movies',{
            method: 'GET',
            headers: {'Content-type': 'application/json; charset=UTF-8',}
        })
        .then(res => res.json())
        .then((data) => {
            const newCards = Array.from({ length: 5 },
                (_, i) => ({ image: data[i+1].image.url, title: data[i+1].nameRU }));
            
            let arrCards = [];
            for (let i = 0; i < newCards.length; i++) {
                
                let elCard = 
                { 
                    url: `https://api.nomoreparties.co/${newCards[i].image}`,
                    title: newCards[i].title
                };
                
                arrCards.push(elCard);
        
            }
          
            function inserstCard(element) {
                groupElement.append(createCard(element));  
            }
                
            arrCards.forEach(function(card){
                inserstCard(card);
            });
            cards.classList.add('hidden');
            groupElement.classList.remove('hidden');
            burger.classList.remove('burger_open');
            burgerOpen.classList.add('menu__burger_hidden');
        })
        .catch(err => console.log(err))
        .finally(() => {
            spinner.classList.add('hidden');
         });

    });
})

// включает темный режим
onclick="document.body.classList.toggle('dark-mode')";

// выпадающее меню категории
function toggleDropdown(menuId) {
    const dropdownMenu = document
    .getElementById(menuId);
    dropdownMenu.classList.toggle('hidden');
}
