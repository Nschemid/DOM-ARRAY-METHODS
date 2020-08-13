const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// Fetch random user and add money
async function getRandomUser() {
    // No need to do that because it is async-> type async
    //fetch('https://randomuser.me/api').then(res => res.json())
    //.then(data => )
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}` ,
        money: Math.floor(Math.random() * 1000000)
    };
    addData(newUser);
}

// double eveones money
function doubleMoney(){
    data = data.map(user => {
        return {...user, money: user.money * 2}
        
    });
    console.log(data);

    updateDOM();
}

// Add new objt to data arr
function addData(obj){
    data.push(obj);

    updateDOM();
}
// Sort users by richest
function sortByRichest(){
    data.sort((a,b) => b.money - a.money);

    updateDOM();
}

//filter only millionaires
function showMillionaires(){
    //data = data.filter(user => user.money > 1000000);
    data = data.filter(function(user){
        return user.money > 1000000;
    });

    updateDOM();
}

// Calculate the total wealth
function calculateWealth(){

    const wealth = data.reduce((accumulated,user) => (accumulated += user.money), 0);

    const wealthElement = document.createElement('div');
    wealthElement.innerHTML= `<h3> Total wealth:<strong> ${formatMoney(wealth)} </strong></h3>`
    main.appendChild(wealthElement);
}


// Update DOM
function updateDOM(providedData= data){
    //Clear main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML =`<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    });
}

// Format number as money
function formatMoney(number){
    return '$'+(number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Event Listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);


