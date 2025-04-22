"use strict"

//------------------------------------------------------------------------появление бекграунда у шапки при прокрутки вниз
window.addEventListener('scroll', () => {
  if(pageYOffset > 50) {
    document.querySelector('.header').classList.add('header__bg');
  } else {
    document.querySelector('.header').classList.remove('header__bg');
  }
});
//------------------------------------------------------------------------появление бекграунда у шапки при прокрутки вниз

//------------------------------------------------------------------------search
const searchButtons = document.querySelectorAll('.search__btn');
const searchWindows = document.querySelectorAll('.search__window');
const searchCloseButtons = document.querySelectorAll('.search__label_close');

searchButtons.forEach((searchBtn, index) => {
  const searchWindow = searchWindows[index]; // Привязываем соответствующее окно к каждой кнопке
  const searchClose = searchCloseButtons[index]; // Привязываем соответствующую кнопку закрытия
  const searchInput = searchWindow.querySelector('.search__label_input'); // Находим поле ввода внутри окна

  // Открытие/закрытие окна при клике на кнопку поиска
  searchBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    searchWindow.classList.toggle('_act'); // Открываем/закрываем конкретное окно поиска
  });

  // Закрытие окна при клике на кнопку закрытия
  searchClose.addEventListener("click", function (e) {
    e.stopPropagation();
    searchWindow.classList.remove('_act'); // Закрываем окно при клике на кнопку закрытия
  });

  // Закрытие окна при клике вне его области
  document.addEventListener("click", function (e) {
    if (!searchBtn.contains(e.target) && !searchWindow.contains(e.target)) {
      searchWindow.classList.remove('_act'); // Закрываем окно, если клик вне кнопки или окна
    }
  });

  // Изменение цвета бордера при вводе текста
  searchInput.addEventListener('input', function () {
    if (this.value.trim() !== '') {
      searchWindow.classList.add('search__window--active'); // Добавляем класс, если поле не пустое
    } else {
      searchWindow.classList.remove('search__window--active'); // Убираем класс, если поле пустое
    }
  });
});
//------------------------------------------------------------------------search


//------------------------------------------------------------------------выпадающие списки в хедере
const menuButtons = document.querySelectorAll('.menu__button');
const menuLists = document.querySelectorAll('.menu__list_wrapper');

// Функция для закрытия всех списков
const closeAllMenus = () => {
  menuLists.forEach(list => list.classList.remove('open'));
  menuButtons.forEach(button => button.classList.remove('open'));
};

// Обработчик клика на кнопки
menuButtons.forEach((button, index) => {
  button.addEventListener('click', (event) => {
    event.stopPropagation(); // Останавливаем всплытие, чтобы не сработал document.click
    const isOpen = menuLists[index].classList.contains('open');

    // Закрываем все меню перед открытием текущего
    closeAllMenus();

    // Открываем текущее меню, если оно было закрыто
    if (!isOpen) {
      menuLists[index].classList.add('open');
      button.classList.add('open');
    }
  });
});

// Обработчик клика на документ
document.addEventListener('click', (event) => {
  const isClickInsideMenu = event.target.closest('.menu__list') || event.target.closest('.menu__button');

  // Если клик был вне меню и кнопки, закрываем все меню
  if (!isClickInsideMenu) {
    closeAllMenus();
  }
});
//------------------------------------------------------------------------выпадающие списки в хедере


//------------------------------------------------------------------------Меню-Бургер
const burgerMenu = document.querySelector('.burger');
const menuBody= document.querySelector('.menu');

if(burgerMenu) {
    burgerMenu.addEventListener("click", function (e) {
      burgerMenu.classList.toggle('_active');
      menuBody.classList.toggle('_active');
    });
}
//------------------------------------------------------------------------закрытие меню при клике вне его
document.addEventListener ('click', (e) => {
  if (!burgerMenu.contains(e.target)) {
    menuBody.classList.remove('_active');
    burgerMenu.classList.remove('_active');
  }
})
//------------------------------------------------------------------------закрытие меню при клике вне его

//----------------------------------------------------------------------код для открытия меню в футере
const footerTitles = document.querySelectorAll('.footer__title');

footerTitles.forEach(title => {
    title.addEventListener('click', () => {
        // Находим соответствующий элемент .footer__list
        const footerList = title.nextElementSibling;

        // Проверяем, что следующий элемент существует и имеет класс .footer__list
        if (footerList && footerList.classList.contains('footer__list')) {
            // Переключаем класс 'view' у .footer__title и .footer__list
            title.classList.toggle('view');
            footerList.classList.toggle('view');
        }
    });
});
//----------------------------------------------------------------------код для открытия меню в футере


//------------------------------------------------------------------------Fancybox
document.addEventListener("DOMContentLoaded", function () {
  if (typeof Fancybox !== "undefined" && typeof Fancybox.bind === "function") {
      Fancybox.bind("[data-fancybox]", {
          // Кастомные опции
      });
  }
});
//------------------------------------------------------------------------Fancybox

//------------------------------------------------------------------------Слайдеры
document.addEventListener('DOMContentLoaded', () => {
  // Находим все уникальные группы на странице
  const groups = [...new Set(
    Array.from(document.querySelectorAll('[data-swiper-group]'))
      .map(el => el.dataset.swiperGroup)
  )];
  // Инициализируем каждую группу отдельно
  groups.forEach(group => {
    const slidersInGroup = document.querySelectorAll(
      `[data-swiper-group="${group}"]`
    );
    slidersInGroup.forEach((slider, sliderIndex) => {
      // Находим ВСЕ кнопки группы и выбираем нужные по индексу
      const allPrevButtons = document.querySelectorAll(
        `[data-swiper-prev="${group}"]`
      );
      const allNextButtons = document.querySelectorAll(
        `[data-swiper-next="${group}"]`
      );
      new Swiper(slider, {
        navigation: {
          prevEl: allPrevButtons[sliderIndex],
          nextEl: allNextButtons[sliderIndex],
        },
        loop: false,
        slidesPerView: 'auto',
        spaceBetween: 20,
        speed: 1000,
        breakpoints: {
          320: { slidesPerView: 1.2 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }
      });
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // Находим все уникальные группы
  const groups = [...new Set(
    Array.from(document.querySelectorAll('.two-slide[data-swiper-group]'))
      .map(el => el.dataset.swiperGroup)
  )];

  groups.forEach(group => {
    const sliders = document.querySelectorAll(
      `.two-slide[data-swiper-group="${group}"]`
    );

    sliders.forEach((slider, index) => {
      // Находим все кнопки группы и выбираем нужные по индексу
      const prevButtons = document.querySelectorAll(
        `[data-swiper-prev="${group}"]`
      );
      const nextButtons = document.querySelectorAll(
        `[data-swiper-next="${group}"]`
      );

      new Swiper(slider, {
        direction: 'horizontal',
        loop: false,
        spaceBetween: 24,
        speed: 1000,
        autoHeight: false,
        navigation: {
          prevEl: prevButtons[index],
          nextEl: nextButtons[index],
        },
        breakpoints: {
          320: {
            slidesPerView: 1.1,
            spaceBetween: 16
          },
          640: {
            slidesPerView: 1
          },
          980: {
            slidesPerView: 2
          }
        }
      });
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // Находим все уникальные группы
  const groups = [...new Set(
    Array.from(document.querySelectorAll('.one-slide[data-swiper-group]'))
      .map(el => el.dataset.swiperGroup)
  )];

  groups.forEach(group => {
    const sliders = document.querySelectorAll(
      `.one-slide[data-swiper-group="${group}"]`
    );

    sliders.forEach((slider, index) => {
      // Находим все кнопки группы и выбираем нужные по индексу
      const pButtons = document.querySelectorAll(
        `[data-swiper-prev="${group}"]`
      );
      const nButtons = document.querySelectorAll(
        `[data-swiper-next="${group}"]`
      );

      new Swiper(slider, {
        direction: 'horizontal',
        loop: false,
        spaceBetween: 20,
        speed: 1000,
        autoHeight: false,
        slidesPerView: 1,
        navigation: {
          prevEl: pButtons[index],
          nextEl: nButtons[index],
        }
      });
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // Находим все уникальные группы на странице
  const groups = [...new Set(
    Array.from(document.querySelectorAll('.four-slide[data-swiper-group]'))
      .map(el => el.dataset.swiperGroup)
  )];
  // Инициализируем каждую группу отдельно
  groups.forEach(group => {
    const slidersFour = document.querySelectorAll(
      `.four-slide[data-swiper-group="${group}"]`
    );
    slidersFour.forEach((slider, sliderIndex) => {
      // Находим ВСЕ кнопки группы и выбираем нужные по индексу
      const allPrevButtons = document.querySelectorAll(
        `[data-swiper-prev="${group}"]`
      );
      const allNextButtons = document.querySelectorAll(
        `[data-swiper-next="${group}"]`
      );
      new Swiper(slider, {
        navigation: {
          prevEl: allPrevButtons[sliderIndex],
          nextEl: allNextButtons[sliderIndex],
        },
        loop: false,
        slidesPerView: 'auto',
        spaceBetween: 20,
        speed: 1000,
        breakpoints: {
          320: { slidesPerView: 1.2 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 4 }
        }
      });
    });
  });
});

//------------------------------------------------------------------------Слайдеры

//-----------------------------------------------------------------------поиск врачей по словам
const searchInput = document.getElementById('searchInput');

if (searchInput) { // Проверяем, существует ли элемент с id="searchInput"
  searchInput.addEventListener('input', function() {
    const searchText = this.value.toLowerCase(); // Получаем текст из инпута и приводим к нижнему регистру
    const filterItems = document.querySelectorAll('.filter__item'); // Находим все блоки .filter__item

    filterItems.forEach(item => {
      const links = item.querySelectorAll('a'); // Находим все элементы <a> внутри текущего .filter__item
      const header = item.querySelector('h3'); // Находим заголовок <h3> внутри текущего .filter__item

      let hasMatch = false; // Флаг для проверки наличия совпадений в текущем .filter__item

      links.forEach(link => {
        const linkText = link.textContent.toLowerCase(); // Получаем текст элемента <a> и приводим к нижнему регистру
        if (searchText === '' || !linkText.includes(searchText)) {
          // Если инпут пустой или текст не совпадает, добавляем opacity: 0.5 и убираем filter__color
          link.style.opacity = '0.5';
          link.classList.remove('filter__color');
        } else {
          // Если текст совпадает, убираем opacity и добавляем filter__color
          link.style.opacity = '1';
          link.classList.add('filter__color');
          hasMatch = true; // Устанавливаем флаг, что есть совпадение
        }
      });
      // Управляем opacity для заголовка <h3>
      if (hasMatch) {
        header.style.opacity = '1'; // Если есть совпадение, заголовок остается полностью видимым
      } else {
        header.style.opacity = '0.5'; // Если совпадений нет, заголовок становится полупрозрачным
      }
    });
    // Если инпут пустой, возвращаем всем элементам opacity: 1 и убираем highlight
    if (searchText === '') {
      const allLinks = document.querySelectorAll('.filter__item a');
      const allHeaders = document.querySelectorAll('.filter__item h3');
      allLinks.forEach(link => {
        link.style.opacity = '1';
        link.classList.remove('filter__color');
      });
      allHeaders.forEach(header => header.style.opacity = '1');
    }
  });
}
//-----------------------------------------------------------------------поиск врачей по словам


//-----------------------------------------------------------------------поиск по заболеванием
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.querySelector('.filter__search input');
  if (!searchInput) return;

  const diseaseItems = document.querySelectorAll('.guide__lists li a');
  const searchClose = document.querySelector('.filter__search_close');
  const guideLists = document.querySelectorAll('.guide__lists');

  // Создаем элемент для сообщения "Ничего не найдено" (изначально скрытый)
  const createNoResultsMessage = () => {
    const message = document.createElement('div');
    message.textContent = 'Ничего не найдено';
    message.className = 'no-results';
    message.style.display = 'none'; // Сообщение скрыто по умолчанию
    return message;
  };

  // Добавляем сообщение в каждый guide__lists
  guideLists.forEach(list => {
    list.appendChild(createNoResultsMessage());
  });

  // Остальной код без изменений...
  function checkVisibleItems() {
    let hasVisibleItems = false;
    diseaseItems.forEach(item => {
      if (item.parentElement.style.display !== 'none') {
        hasVisibleItems = true;
      }
    });
    return hasVisibleItems;
  }

  function filterDiseases() {
    const searchTerm = searchInput.value.toLowerCase();
    const noResultsMessages = document.querySelectorAll('.no-results');
    
    if (searchTerm === '') {
      diseaseItems.forEach(item => {
        item.parentElement.style.display = '';
      });
      noResultsMessages.forEach(msg => {
        msg.style.display = 'none';
      });
      return;
    }
    
    diseaseItems.forEach(item => {
      const diseaseName = item.textContent.toLowerCase();
      item.parentElement.style.display = diseaseName.includes(searchTerm) ? '' : 'none';
    });

    const hasVisibleItems = checkVisibleItems();
    
    noResultsMessages.forEach(msg => {
      msg.style.display = hasVisibleItems ? 'none' : 'flex';
    });
  }

  function clearSearch() {
    searchInput.value = '';
    filterDiseases();
  }

  searchInput.addEventListener('input', function() {
    clearTimeout(this.filterTimeout);
    this.filterTimeout = setTimeout(filterDiseases, 300);
  });
  
  if (searchClose) {
    searchClose.addEventListener('click', clearSearch);
  }
});
//-----------------------------------------------------------------------поиск по заболеванием


//-----------------------------------------------------------------------сортировка по атрибутам

class FilterGallery {
  constructor(container) {
    this.container = container;
    this.filterMenuList = this.container.querySelectorAll('.filtermenu__list li');
    this.postsContainer = this.container.querySelector('.filtermenu__container');
    this.posts = Array.from(this.postsContainer.querySelectorAll('.post'));
    
    // Инициализация первой активной вкладки
    const firstActiveItem = this.container.querySelector('.filtermenu__list li[data-filter]');
    if (firstActiveItem) {
      const targetFilter = firstActiveItem.getAttribute('data-filter');
      this.updateMenu(targetFilter);
      this.updateGallery(targetFilter);
    }
    
    this.filterMenuList.forEach(item => item.addEventListener('click', (event) => this.onClickFilterMenu(event)));
  }

  onClickFilterMenu(event) {
    const target = event.target.closest('li');
    if (!target) return;
    
    const targetFilter = target.getAttribute('data-filter');
    if (!targetFilter) return;
    
    this.updateMenu(targetFilter);
    this.updateGallery(targetFilter);
  }

  updateMenu(targetFilter) {
    this.filterMenuList.forEach(item => {
      item.classList.toggle('active_', item.getAttribute('data-filter') === targetFilter);
    });
  }

  updateGallery(targetFilter) {
    const postsToShow = targetFilter === 'all'
      ? this.posts
      : this.posts.filter(post => post.classList.contains(targetFilter));
    
    const postsToHide = this.posts.filter(post => !postsToShow.includes(post));

    // Анимация перехода
    this.postsContainer.style.opacity = 0;
    setTimeout(() => {
      postsToHide.forEach(post => post.style.display = 'none');
      postsToShow.forEach(post => post.style.display = '');
      this.postsContainer.style.opacity = 1;
    }, 300);
  }
}
// Инициализация всех галерей на странице
document.querySelectorAll('.filtermenu').forEach(menuContainer => {
  new FilterGallery(menuContainer);
});

//-----------------------------------------------------------------------сортировка по атрибутам

//-----------------------------------------------------------------------кон для анимации иконак в блоке ваше здоровье
document.addEventListener('scroll', () => {
  // Вызываем функцию обновления позиции иконок с фиктивным событием мыши
  updateIconsPosition({ clientX: 0, clientY: 0 });
});

function updateIconsPosition(e) {
  const icons = document.querySelectorAll('.mission__icon');
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  icons.forEach((icon, index) => {
    const rect = icon.getBoundingClientRect();
    const iconX = rect.left + rect.width / 2;
    const iconY = rect.top + rect.height / 2;

    const deltaX = mouseX - iconX;
    const deltaY = mouseY - iconY;

    // Настройте силу смещения (можно регулировать)
    const strength = 0.05;

    // Применяем смещение в зависимости от положения курсора
    const translateX = deltaX * strength;
    const translateY = deltaY * strength;

    // Добавляем разные направления для каждой иконки
    if (index % 2 === 0) {
      icon.style.transform = `translate(${translateX}px, ${translateY}px)`;
    } else {
      icon.style.transform = `translate(${-translateX}px, ${-translateY}px)`;
    }
  });
}
//-----------------------------------------------------------------------кон для анимации иконак в блоке ваше здоровье

//------------------------------------------------------------------------select выпадающий список
document.querySelectorAll('.dropdown').forEach(function(dropDownWrapper) {
  const dropDownBtn = dropDownWrapper.querySelector('.dropdown__button');
  const dropDownList = dropDownWrapper.querySelector('.dropdown__list');
  const dropDownListItems = dropDownList.querySelectorAll('.dropdown__list_item');
  const dropDownInput = dropDownWrapper.querySelector('.dropdown__input_hidden');

  // Функция для закрытия текущего дропдауна
  function closeCurrentDropdown() {
    dropDownList.classList.remove('dropdown__list--active');
    dropDownBtn.classList.remove('dropdown__button--active');
  }

  // Открыть/закрыть текущий дропдаун
  dropDownBtn.addEventListener('click', function (e) {
    e.stopPropagation(); // Остановить всплытие события
    e.preventDefault(); // Предотвращаем отправку формы
    const isActive = dropDownList.classList.contains('dropdown__list--active');

    // Закрываем все дропдауны перед открытием текущего
    document.querySelectorAll('.dropdown__list--active').forEach(function(activeList) {
      activeList.classList.remove('dropdown__list--active');
    });
    document.querySelectorAll('.dropdown__button--active').forEach(function(activeButton) {
      activeButton.classList.remove('dropdown__button--active');
    });

    // Если текущий дропдаун не был активным, открываем его
    if (!isActive) {
      dropDownList.classList.add('dropdown__list--active');
      dropDownBtn.classList.add('dropdown__button--active');
    }
  });

  // Выбор элемента списка
  dropDownListItems.forEach(function (listItem) {
    listItem.addEventListener('click', function (e) {
      e.stopPropagation(); // Остановить всплытие события
      e.preventDefault(); // Предотвращаем отправку формы
      dropDownBtn.innerText = this.innerText;
      dropDownBtn.focus();
      dropDownInput.value = this.dataset.value;
      closeCurrentDropdown(); // Закрываем текущий дропдаун после выбора
    });
  });

  // Закрытие при клике снаружи
  document.addEventListener('click', function (e) {
    if (!dropDownWrapper.contains(e.target)) {
      closeCurrentDropdown(); // Закрываем только текущий дропдаун
    }
  });

  // Закрытие при нажатии Tab или Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Tab' || e.key === 'Escape') {
      closeCurrentDropdown(); // Закрываем только текущий дропдаун
    }
  });
});

// Инициализация кнопки после загрузки
function initMyButton() {
  const myButton = document.getElementById('myButton');
  
  if (myButton && myButton.style.display !== 'none') {
    myButton.addEventListener('click', function(event) {
      event.preventDefault();
    });
  }
}
window.onload = initMyButton;
//----------------------------------------------------очистка выпадающего списка и других инпутов
const chooseReset = document.querySelector('.choose__reset');
if (chooseReset) { // Проверяем, существует ли элемент с классом .choose__reset
  chooseReset.addEventListener('click', function(e) {
    // Очищаем все выпадающие списки
    document.querySelectorAll('.dropdown').forEach(function(dropDownWrapper) {
      const dropDownBtn = dropDownWrapper.querySelector('.dropdown__button');
      const dropDownInput = dropDownWrapper.querySelector('.dropdown__input_hidden');

      // Сбрасываем текст кнопки и значение скрытого input
      dropDownBtn.innerText = 'выберите'; // Или любой другой текст по умолчанию
      dropDownInput.value = ''; // Очищаем значение input
    });
  });
}
//----------------------------------------------------очистка выпадающего списка и других инпутов

//------------------------------------------------------------------------select выпадающий список

//------------------------------------------------------------------------появление контента при клике на кнопку more
const buttonMore = document.querySelectorAll('.button-more');
buttonMore.forEach(btn => {
    btn.addEventListener('click', () => {
        // Переключаем класс 'view' у самой кнопки
        btn.classList.toggle('view');
        // Находим все элементы с классом .content-more
        const contentMoreElements = document.querySelectorAll('.content-more');
        // Переключаем класс 'view' у всех элементов .content-more
        contentMoreElements.forEach(content => {
            content.classList.toggle('view');
        });
    });
});
//------------------------------------------------------------------------появление контента при клике на кнопку more

//------------------------------------------------------------------------Акардион в Type
document.addEventListener('DOMContentLoaded', function() {
  const accordions = document.querySelectorAll('.accordion__details--mod');
  const isMobile = window.matchMedia('(max-width: 767px)').matches;

  // Инициализация - на мобильных закрываем все кроме первого
  if (isMobile) {
    accordions.forEach((accordion, index) => {
      if (index !== 0) {
        accordion.removeAttribute('open');
      }
    });
  }

  // Добавляем обработчики клика для всех аккордеонов
  accordions.forEach(accordion => {
    const summary = accordion.querySelector('.accordion__summary');
    
    summary.addEventListener('click', function(e) {
      // Если это мобильная версия, закрываем другие аккордеоны
      if (isMobile || window.matchMedia('(max-width: 767px)').matches) {
        accordions.forEach(otherAccordion => {
          if (otherAccordion !== accordion) {
            otherAccordion.removeAttribute('open');
          }
        });
      }
      
      // На десктопе позволяем открывать/закрывать независимо
      // (если нужно на десктопе тоже поведение "только один открыт",
      // уберите этот блок if и оставьте только код выше)
      if (!isMobile && !window.matchMedia('(max-width: 767px)').matches) {
        e.preventDefault(); // Отменяем стандартное поведение
        const isOpen = accordion.hasAttribute('open');
        if (isOpen) {
          accordion.removeAttribute('open');
        } else {
          accordion.setAttribute('open', '');
        }
      }
    });
  });

  // Обработчик изменения размера окна
  window.addEventListener('resize', function() {
    const currentIsMobile = window.matchMedia('(max-width: 767px)').matches;
    
    if (currentIsMobile && !isMobile) {
      // Переключились на мобильный вид - закрываем все кроме первого
      accordions.forEach((accordion, index) => {
        if (index !== 0) {
          accordion.removeAttribute('open');
        }
      });
    }
  });
});
////------------------------------------------------------------------------Акардион в Type
