// Переменная для отслеживания состояния поиска
let searchVisible = false;

// Получаем элементы
const searchToggle = document.getElementById('searchToggle');
const searchInput = document.getElementById('searchInput');

if (searchToggle && searchInput) {
    // Слушаем нажатие на кнопку поиска
    searchToggle.addEventListener('click', function () {
        if (!searchVisible) {
            searchInput.style.display = 'block'; // Показываем поле
            searchInput.focus(); // Ставим фокус на поле
            searchToggle.classList.add('active'); // Добавляем класс активности к кнопке
        } else {
            searchInput.style.display = 'none'; // Скрываем поле
            searchToggle.classList.remove('active'); // Убираем класс активности с кнопки
            searchInput.value = ''; // Очищаем поле ввода
            triggerSearch(); // Перезапускаем поиск, чтобы показать все карточки
        }
        searchVisible = !searchVisible; // Меняем состояние
    });
}

// Фильтрация карточек при вводе в поле поиска
if (searchInput) {
    searchInput.addEventListener('input', triggerSearch);
}

function triggerSearch() {
    let filter = searchInput.value.toLowerCase().trim(); // Получаем значение поиска и удаляем лишние пробелы
    let cards = document.querySelectorAll('.program-card'); // Получаем все карточки
    let foundAny = false; // Переменная для отслеживания наличия совпадений

    cards.forEach(function (card) {
        const title = card.querySelector('.program-title').textContent.toLowerCase(); // Получаем текст заголовка
        const description = card.querySelector('.program-description').textContent.toLowerCase(); // Получаем текст описания
        const tegsElement = card.querySelector('.program-tegs'); // Получаем элемент с тегами
        const tegs = tegsElement ? tegsElement.textContent.toLowerCase() : ''; // Получаем текст тегов, если элемент существует

        // Определяем видимость карточки
        const isVisible = title.includes(filter) || description.includes(filter) || tegs.includes(filter);

        // Отображаем или скрываем карточку
        card.style.display = isVisible ? '' : 'none';

        // Поднимаем карточки с совпадением в названии
        if (title.includes(filter)) {
            card.style.order = '0'; // Приоритетное отображение
        } else if (description.includes(filter)) {
            card.style.order = '1'; // Второстепенное отображение
        } else {
            card.style.order = '2'; // Низший приоритет для совпадений в тегах
        }

        foundAny = foundAny || isVisible; // Устанавливаем флаг, если нашли совпадение
    });

    // Если ни одна карточка не найдена, можно добавить логику для отображения сообщения пользователю
    if (!foundAny) {
        // Например, показать сообщение "Ничего не найдено"
    }


    // Проверяем контейнер для сообщения "Ничего не найдено"
    const cardContainer = document.querySelector('.programs-container'); // Убедитесь, что это правильный контейнер
    let messageElement = document.getElementById('no-results'); // Получаем элемент для сообщения

    if (!messageElement) {
        // Создаем элемент для сообщения, если его нет
        messageElement = document.createElement('p');
        messageElement.id = 'no-results'; // Устанавливаем id для этого элемента
        messageElement.textContent = 'Ничего не найдено.'; // Текст сообщения
        messageElement.style.color = 'red';
        messageElement.style.textAlign = 'center';
        messageElement.style.marginTop = '20px';
        messageElement.style.fontSize = '40px';
        messageElement.style.display = 'none'; // Скрываем по умолчанию
        cardContainer.appendChild(messageElement); // Добавляем элемент в контейнер карточек
    }

    // Показываем или скрываем сообщение в зависимости от результатов поиска
    messageElement.style.display = foundAny ? 'none' : 'block';
}
