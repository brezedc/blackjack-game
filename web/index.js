let types = {
    0: "Spades",
    1: "Hearts",
    2: "Diamonds",
    3: "Clubs",
};

let cards = {
    1: 11,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    11: 10,
    12: 10,
    13: 10,
};

let other = {
    1: "ace",
    11: "jack",
    12: "queen",
    13: "king",
};

$(document).ready(function () {
    function getCard() {
        let type = Math.floor(Math.random() * 4);
        let card = Math.floor(Math.random() * 13) + 1;

        return {
            type: type,
            card: card,
        };
    }

    function startGame() {
        player = [];
        dealer = [];
        player.sum = 0;
        dealer.sum = 0;

        let playerCard = getCard();

        if (other[playerCard.card]) {
            filename = `${other[playerCard.card]}_of_${types[playerCard.type].toLowerCase()}.png`;
        } else {
            filename = `${cards[playerCard.card]}_of_${types[playerCard.type].toLowerCase()}.png`;
        }

        let playercard = new Image();
        playercard.src = `./cards/${filename}`;
        $("#player").append(playercard);
        $("#playersum").text(`Sum: ${playerCard.card}`);

        let dealerCard = getCard();

        if (other[dealerCard.card]) {
            filename = `${other[dealerCard.card]}_of_${types[dealerCard.type].toLowerCase()}.png`;
        } else {
            filename = `${cards[dealerCard.card]}_of_${types[dealerCard.type].toLowerCase()}.png`;
        }

        let dealercard = new Image();
        dealercard.src = `./cards/${filename}`;
        $("#dealer").append(dealercard);
        $("#dealersum").text(`Sum: ${dealerCard.card}`);

        hiddenCard = new Image();
        hiddenCard.src = "./cards/backside.png";
        $("#dealer").append(hiddenCard);
    }

    function stand() {}

    $("#startGame").on("click", function () {
        $("#startScreen").hide();
        $("#game").show();
        startGame();
    });

    $("#hit").on("click", function () {
        let playerCard = getCard();

        if (other[playerCard.card]) {
            filename = `${other[playerCard.card]}_of_${types[playerCard.type].toLowerCase()}.png`;
        } else {
            filename = `${cards[playerCard.card]}_of_${types[playerCard.type].toLowerCase()}.png`;
        }

        let playercard = new Image();
        playercard.src = `./cards/${filename}`;
        $("#player").append(playercard);
        $("#playersum").text(`Sum: ${player.sum + cards[playerCard.card]}`);
    });

    $("#stand").on("click", function () {
        stand();
    });
});
