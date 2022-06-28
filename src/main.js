async function getData(url) {
    let response = await fetch(url);
    if (response.ok) {
        return response.json();
    } else {
        console.error('Помилка HTTP: ' + response.status);
    }
}

function renderList(array) {
    let lis = '';
    for (let el of array) {
            if (!el) {
            return;
        }
        lis += `<li data-id="${el.id}" class="item">${el.title}</li>`;
    }
    const list = document.getElementById('list');
    clickListener(list)
    try {
        list.innerHTML = lis;
    } catch (status) {
        console.error('Something went wrong', status);
    }
    return lis;
}

getData ('https://jsonplaceholder.typicode.com/albums')
    .then((data) => {
        renderList(data);
    })

function renderPhotos(array) {
    let lis = '';
    for (let el of array) {
            if (!el) {
            return;
        }
        lis += `<img data-id="${el.id}" src="${el.thumbnailUrl}"> <p>${el.title}</p>`;
    }
    const list = document.getElementById('photo');
    try {
        list.innerHTML = lis;
    } catch (status) {
        console.error('Something went wrong', status);
    }
    return lis;
}

getData ('https://jsonplaceholder.typicode.com/photos?albumId=1')
    .then ((data) => {
        renderPhotos(data)
    })

function clickListener(el) {
    el.addEventListener('click', (event) => {
        if (event.target.classList.contains("item")) {
            const id = event.target.getAttribute('data-id')
            getData (`https://jsonplaceholder.typicode.com/photos?albumId=${id}`)
                .then ((data) => {
                    renderPhotos(data)
                })
        } 
    })
}

