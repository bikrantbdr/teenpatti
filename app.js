var playerCards = []
var compCards = []

const showButton = document.querySelector('#show');
const playButton = document.querySelector('#play');
showButton.disabled = true;
let teenpattiGame = {
    'user': { 'scoreSpan': '#userResult', 'div': '.userBox', 'score': 0 },
    'comp': { 'scoreSpan': '#compResult', 'div': '.compBox', 'score': 0 }
};

const user = teenpattiGame['user']
const comp = teenpattiGame['comp']

document.querySelector('#play').addEventListener('click', teenpattiPlay);
document.querySelector('#clear').addEventListener('click', teenpattiClear);
document.querySelector('#show').addEventListener('click', teenpattiShow);

function playerCardSelect() {
    x = ['f', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'k']
    y = ['C', 'H', 'D', 'S']
    cards = []
    for (i = 0; i < 3; i++) {
        card = x[Math.floor(Math.random() * 12)] + y[Math.floor(Math.random() * 4)]
        cards.push(card);
    }
    if (cards[0] != cards[1] && cards[1] != cards[2] && cards.length == 3) {
        return cards;
    }
    else {
        playerCardSelect();
    }
}

function compCardSelect() {
    x = ['f', '2', '3', '4', '5', '6', '7', '8', '9', 'J', 'Q', 'k']
    y = ['C', 'H', 'D', 'S']
    cards = []
    for (i = 0; i < 3; i++) {
        card = x[Math.floor(Math.random() * 12)] + y[Math.floor(Math.random() * 4)]
        cards.push(card);
    }
    if (cards[0] != cards[1] && cards[1] != cards[2] && cards.length == 3) {

        return cards;

    }
    else {
        compCardSelect();
    }
}



function teenpattiPlay() {
    playerCards = playerCardSelect();

    for (i = 0; i < 3; i++) {
        showPlayerCard(playerCards[i]);
    }
    showButton.disabled = false;
    playButton.disabled = true;

}

function teenpattiShow() {
    removeBackCards();
    compCards = compCardSelect();
    if (playerCards[0] == compCards[0] || playerCards[0] == compCards[1] || playerCards[0] == compCards[2] || playerCards[1] == compCards[0] || playerCards[1] == compCards[1] || playerCards[1] == compCards[2] || playerCards[2] == compCards[0] || playerCards[2] == compCards[1] || playerCards[2] == compCards[2]) {
        compCards = compCardSelect();
    }
    for (i = 0; i < 3; i++) {
        showCompCard(compCards[i]);
    }
    showButton.disabled = true;

}
function removeBackCards() {
    let cimages = document.querySelector('.compBox').querySelectorAll('img');
    for (i = 0; i < cimages.length; i++) {
        cimages[i].remove();
    }
}

function showPlayerCard(card) {

    let playerCardImage = document.createElement('img');
    let compBackImage = document.createElement('img');
    playerCardImage.src = 'img/' + card + '.jpg';
    document.querySelector(user['div']).appendChild(playerCardImage);
    compBackImage.src = 'img/back.jpg';
    document.querySelector(comp['div']).appendChild(compBackImage);

}

function showCompCard(card) {
    let compCardImage = document.createElement('img');
    compCardImage.src = 'img/' + card + '.jpg';
    document.querySelector(comp['div']).appendChild(compCardImage);

}



function teenpattiClear() {
    let images = document.querySelector('.userBox').querySelectorAll('img');
    for (i = 0; i < images.length; i++) {
        images[i].remove();
    }
    let cimages = document.querySelector('.compBox').querySelectorAll('img');
    for (i = 0; i < cimages.length; i++) {
        cimages[i].remove();
    }
    playButton.disabled = false;
}