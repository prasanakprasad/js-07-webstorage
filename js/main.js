function addItem(item) {
    const itemHTML = '<div class="card" style="width: 18rem;">\n' +
        '    <div class="card-body">\n' +
        '        <h5 class="card-title">' + item.name + '</h5>\n' +
        '        <p class="card-text">' + item.pantone_value + '</p>\n' +
        '        <div style="background:' + item.color + ';">' + item.color + '</div>\n' +
        '    </div>\n' +
        '</div>\n' +
        '<br/>';
    const itemsContainer = document.getElementById("list-items");
    itemsContainer.innerHTML += itemHTML;
}

// addItem({ "id": 1, "name": "cerulean", "year": 2000, "color": "#98B2D1", "pantone_value": "15-4020" });

function fetchColorsList() {
    //TODO implement this function // 
    fetch('https://reqres.in/api/unknown')
        .then(response => response.json())
        .then(clist => {
            const clistData = clist.data;
            clistData.forEach(function (item) {
                addItem(item);
            });
            /* for (const item in clist) {
                console.log("individual item",item);
            } */
            localStorage.setItem('clist', JSON.stringify(clist.data));
        });
}

function loadColorsFromStorage() {
    //TODO implement this function
    const cList = JSON.parse(localStorage.getItem('clist'));
    // const cList = localStorage.getItem('clist');
    console.log("Retrieving from local storage \n", cList);
    console.log("type is", typeof (cList));
    cList.forEach(item => addItem(item));
}

fetchColorsList();
loadColorsFromStorage();
document.querySelector('#submit').addEventListener('click', () => {
    document.querySelector('#list-items').innerHTML = "";
});
document.querySelector('#load').addEventListener('click', () => {
    loadColorsFromStorage();
});