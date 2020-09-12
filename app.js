var playerCards = []
var compCards = []

let computerScore = 0;
let userScore = 0;


const result_div = document.querySelector('#result')

const showButton = document.querySelector('#show');
const playButton = document.querySelector('#play');
showButton.disabled = true;
let teenpattiGame = {
    'user': { 'scoreSpan': 'user', 'div': '.userBox', 'score': 0 },
    'comp': { 'scoreSpan': 'comp', 'div': '.compBox', 'score': 0 }
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
    x = ['f', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'k']
    y = ['C', 'H', 'D', 'S']
    cards = []
    for (i = 0; i < 3; i++) {
        card = x[Math.floor(Math.random() * 12)] + y[Math.floor(Math.random() * 4)]
        cards.push(card);
    }
    if (cards[0] == cards[1] || cards[1] == cards[2] || card[0] == card[2]) {

        compCardSelect();

    }
    else {
        return cards;
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
    game(playerCards, compCards);

}

function game(userCards, compCards) {

    userCardsSorted = sortCards(userCards);
    compCardsSorted = sortCards(compCards);
    userPriority = priority(userCardsSorted);
    compPriority = priority(compCardsSorted);

    whoWon = winner(userPriority, compPriority, userCardsSorted, compCardsSorted);
    //var whoWon = 'l';

    if (whoWon == 'w') {
        win();
    }
    else if (whoWon == 'l') {
        loss();
    }
    else {
        draw();
    }
}

function winner(usp, cop, uc, cc) {
    x = ['2', '3', '4', '5', '6', '7', '8', '9', '1', 'J', 'Q', 'k', 'f']
    if (usp < cop) {
        return 'w';
    }
    else if (cop < usp) {
        return 'l';
    }
    //same prioority
    //
    //
    //
    //triple
    else if (usp = cop && usp == '0') {
        if (x.indexOf(uc[0][0]) > x.indexOf(cc[0][0])) {
            return 'w';
        }
        else {
            return 'l';
        }
    }
    //color and seq
    else if (usp = cop && usp == '1') {
        if (x.indexOf(uc[0][0]) > x.indexOf(cc[0][0])) {
            return 'w';
        }
        else {
            return 'l';
        }

    }

    //seq
    else if (usp = cop && usp == '2') {
        if (x.indexOf(uc[0][0]) > x.indexOf(cc[0][0])) {
            return 'w';
        }
        else {
            return 'l';
        }

    }

    //same color
    else if (usp = cop && usp == '3') {
        if (x.indexOf(uc[0][0]) > x.indexOf(cc[0][0])) {
            return 'w';
        }
        else if (x.indexOf(uc[0][0]) = x.indexOf(cc[0][0])) {
            if (x.indexOf(uc[1][0]) > x.indexOf(cc[1][0])) {
                return 'w';
            }
            else if (x.indexOf(uc[1][0]) = x.indexOf(cc[1][0])) {
                if (x.indexOf(uc[2][0]) > x.indexOf(cc[2][0])) {
                    return 'w';
                }
                else {
                    return 'l';
                }
            }
        }
        else {
            return 'l';
        }

    }
    //pair
    else if (usp = cop && usp == '4') {
        sameComp = "";
        sameUser = "";
        diffComp = "";
        diffUser = "";

        //user same and different card
        if (usp[1] == usp[2] && usp[1] != usp[0]) {
            sameUser = usp[1];
            diffUser = usp[0];
        }
        else if (usp[0] == usp[1] && usp[1] != usp[2]) {
            sameUser = usp[1];
            diffUser = usp[2];
        }
        else {
            sameUser = usp[0];
            diffUser = usp[1];
        }

        //comp same and different card
        if (cop[1] == cop[2] && cop[1] != cop[0]) {
            sameComp = cop[1];
            diffComp = cop[0];
        }
        else if (cop[0] == cop[1] && cop[1] != cop[2]) {
            sameComp = cop[1];
            diffComp = cop[2];
        }
        else {
            sameComp = cop[0];
            diffComp = cop[1];
        }

        //conditions for same cards
        if (x.indexOf(sameUser) > x.indexOf(sameComp)) {
            return 'w';

        }
        else if (x.indexOf(sameUser) < x.indexOf(sameComp)) {
            return 'l';
        }
        else {
            if (x.indexOf(diffUser) > x.indexOf(diffComp)) {
                return 'w';
            }
            else {
                return 'l';
            }
        }



    }
    //single
    else if (usp = cop && usp == '5') {
        if (x.indexOf(uc[0][0]) > x.indexOf(cc[0][0])) {
            return 'w';
        }
        else if (x.indexOf(uc[0][0]) = x.indexOf(cc[0][0])) {
            if (x.indexOf(uc[1][0]) > x.indexOf(cc[1][0])) {
                return 'w';
            }
            else if (x.indexOf(uc[1][0]) = x.indexOf(cc[1][0])) {
                if (x.indexOf(uc[2][0]) > x.indexOf(cc[2][0])) {
                    return 'w';
                }
                else {
                    return 'l';
                }
            }
        }
        else {
            return 'l';
        }

    }



}


function sortCards(activePlayer) {
    x = ['2', '3', '4', '5', '6', '7', '8', '9', '1', 'J', 'Q', 'K', 'f']
    number1 = activePlayer[0][0]
    number2 = activePlayer[1][0]
    number3 = activePlayer[2][0]
    color1 = activePlayer[0][1]
    color2 = activePlayer[1][1]
    color3 = activePlayer[2][1]
    sortedPlayer = []
    //1st highest
    if (x.indexOf(number1) > x.indexOf(number2) && x.indexOf(number1) > x.indexOf(number2)) {
        sortedPlayer.push(activePlayer[0]);
        if (x.indexOf(number2) > x.indexOf(number3)) {
            sortedPlayer.push(activePlayer[1]);
            sortedPlayer.push(activePlayer[2]);

        }
        else {
            sortedPlayer.push(activePlayer[2]);
            sortedPlayer.push(activePlayer[1]);

        }

    }
    //second highest
    else if (x.indexOf(number2) > x.indexOf(number3)) {
        sortedPlayer.push(activePlayer[1]);
        if (x.indexOf(number1) > x.indexOf(number3)) {
            sortedPlayer.push(activePlayer[0]);
            sortedPlayer.push(activePlayer[2]);

        }
        else {
            sortedPlayer.push(activePlayer[2]);
            sortedPlayer.push(activePlayer[0]);

        }
    }
    //third highest
    else {
        sortedPlayer.push(activePlayer[2]);
        if (x.indexOf(number2) > x.indexOf(number1)) {
            sortedPlayer.push(activePlayer[1]);
            sortedPlayer.push(activePlayer[0]);

        }
        else {
            sortedPlayer.push(activePlayer[0]);
            sortedPlayer.push(activePlayer[1]);

        }



    }
    return sortedPlayer;


}

function priority(activePlayer) {
    x = ['2', '3', '4', '5', '6', '7', '8', '9', '1', 'J', 'Q', 'K', 'f']
    y = ['C', 'H', 'D', 'S']
    number1 = activePlayer[0][0]
    number2 = activePlayer[1][0]
    number3 = activePlayer[2][0]

    color = [activePlayer[0][1], activePlayer[1][1], activePlayer[2][1]]

    for (i = 0; i < 3; i++) {
        if (activePlayer[i][0] == 1) {
            color[i] = activePlayer[i][2];
        }
    }
    //console.log(color);


    //triple
    if (number1 == number2 && number2 == number3) {
        return 0;
    }
    //samecolor and sequence
    else if (color[1] == color[2] && color[2] == color[3] && x.indexOf(number1) == (x.indexOf(number2) + 1) && x.indexOf(number2) == (x.indexOf(number3) + 1)) {


        return 1;


    }
    //sequence
    else if (x.indexOf(number1) == (x.indexOf(number2) + 1) && x.indexOf(number2) == (x.indexOf(number3) + 1)) {
        return 2;
    }

    //same color
    else if (color[1] == color[2] && color[2] == color[0]) {
        return 3;
    }

    //pair
    else if (number1 == number2 || number2 == number3 || number1 == number3) {
        return 4;
    }
    else {
        return 5;
    }



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

function win() {
    userScore++;

    result_div.innerHTML = "you win";
    document.getElementById(user['scoreSpan']).innerHTML = userScore;


}

function loss() {
    computerScore++;
    result_div.innerHTML = "You loose";
    document.getElementById(comp['scoreSpan']).innerHTML = computerScore;


}
function draw() {
    result_div.innerHTML = "You Draw";



}

