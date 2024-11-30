// для бургера
const burgerOpen = document.querySelector('.menu__burger');
const burger = document.querySelector('.burger');
const burgerClose = burger.querySelector('.burger__button');
// кнопка для запроса с сервера
const links = document.querySelectorAll('.menu__link');
// картинки и названия
const imgs = document.querySelectorAll('.img');
const titles = document.querySelectorAll('.title');
// для бургера
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
        fetch('https://api.nomoreparties.co/beatfilm-movies',{
            method: 'GET',
            headers: {'Content-type': 'application/json; charset=UTF-8',}
        })
        .then(res => res.json())
        .then((data) => {
            const newCards = Array.from({ length: 5 },
                (_, i) => ({ image: data[i+1].image.url, title: data[i+1].nameRU }));
            localStorage.setItem('newCards', JSON.stringify(newCards));
            console.log(newCards);
            const dataCard = JSON.parse(localStorage.getItem('newCards') || '[]');
            console.log(dataCard);
    
            
            for (let i = 0; i < dataCard.length; i++) { 
                imgs.forEach((img, i) => { 
                    img.src = `https://api.nomoreparties.co/${dataCard[i+1].image}`;
                });
                titles.forEach((title, i) => {
                    title.textContent = dataCard[i+1].title;
                });
            }
        })
        .catch(err => console.log(err));

        burger.classList.remove('burger_open');
        burgerOpen.classList.remove('menu__burger_hidden');
    });
})
// включает темный режим
onclick="document.body.classList.toggle('dark-mode')";

function toggleDropdown(menuId) {
    const dropdownMenu = document
    .getElementById(menuId);
    dropdownMenu.classList.toggle('hidden');
}
