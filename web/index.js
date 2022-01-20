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
    let balance = 1000;
    $("#bal").text(balance + "$");

    function startGame(bet) {
        Game = {
            player: [],
            dealer: [],
            active: true,
            betting: bet ?? false,
        };

        Game.player.sum = 0;
        Game.dealer.sum = 0;

        let i = 0;
        let loop = setInterval(() => {
            let playerCard = getCard();

            if (other[playerCard.card]) {
                filename = `${other[playerCard.card]}_of_${types[playerCard.type].toLowerCase()}.png`;
            } else {
                filename = `${cards[playerCard.card]}_of_${types[playerCard.type].toLowerCase()}.png`;
            }

            let playercard = new Image();
            playercard.src = `./cards/${filename}`;
            $("#player").append(playercard);
            Game.player.sum += cards[playerCard.card];
            $("#playersum").text(`Your Hand: ${Game.player.sum}`);

            i++;
            if (i == 2) {
                clearInterval(loop);
            }
        }, 500);

        let dealerCard = getCard();

        if (other[dealerCard.card]) {
            filename = `${other[dealerCard.card]}_of_${types[dealerCard.type].toLowerCase()}.png`;
        } else {
            filename = `${cards[dealerCard.card]}_of_${types[dealerCard.type].toLowerCase()}.png`;
        }

        let dealercard = new Image();
        dealercard.src = `./cards/${filename}`;
        $("#dealer").append(dealercard);
        Game.dealer.sum += cards[dealerCard.card];

        $("#dealersum").text(`Dealers Hand: ${Game.dealer.sum}`);

        hiddenCard = new Image();
        hiddenCard.src = "./cards/backside.png";
        hiddenCard.id = "hidden";
        $("#dealer").append(hiddenCard);

        if (Game.betting) {
            if (balance >= 100) {
                balance -= 100;
                $("#bal").text(balance + "$");
                $("#bet").show();
                $("#betamount").text(100 + "$");
            } else {
                Game.betting = false;
            }
        }

        if (Game.player.sum == 21) {
            Game.active = false;
            showBanner("You got a Blackjack and won!", "rgba(9, 111, 55, 0.8)");
            if (Game.betting) {
                handleBet("win");
            }
        }
    }

    function getCard() {
        let type = Math.floor(Math.random() * 4);
        let card = Math.floor(Math.random() * 13) + 1;

        return {
            type: type,
            card: card,
        };
    }

    function stand() {
        Game.active = false;
        if (hiddenCard) {
            hiddenCard.remove();
        }

        if (Game.dealer.sum < 17) {
            let dealerCard = getCard();

            if (other[dealerCard.card]) {
                filename = `${other[dealerCard.card]}_of_${types[dealerCard.type].toLowerCase()}.png`;
            } else {
                filename = `${cards[dealerCard.card]}_of_${types[dealerCard.type].toLowerCase()}.png`;
            }

            let dealercard = new Image();
            dealercard.src = `./cards/${filename}`;
            $("#dealer").append(dealercard);

            if (dealerCard.card === 1) {
                if (Game.dealer.sum + 11 > 21) {
                    Game.dealer.sum += 1;
                } else {
                    Game.dealer.sum += 11;
                }
            } else {
                Game.dealer.sum += cards[dealerCard.card];
            }
            $("#dealersum").text(`Dealers Hand: ${Game.dealer.sum}`);

            setTimeout(() => {
                stand();
            }, 1000);
        } else {
            if (Game.dealer.sum == 21) {
                showBanner("Dealer got a blackjack, you lost.", "rgba(111, 33, 9, 0.8)");
            } else if (Game.dealer.sum > 21) {
                showBanner("Dealer busted, you win!", "rgba(9, 111, 55, 0.8)");
                if (Game.betting) {
                    handleBet("win");
                }
            } else if (Game.player.sum > Game.dealer.sum) {
                showBanner("You won!", "rgba(9, 111, 55, 0.8)");
                if (Game.betting) {
                    handleBet("win");
                }
            } else if (Game.player.sum < Game.dealer.sum) {
                showBanner("You lost!", "rgba(111, 33, 9, 0.8)");
            } else {
                showBanner("It's a push!", "rgba(146, 148, 12, 0.8)");
                if (Game.betting) {
                    handleBet("push");
                }
            }
        }
    }

    function showBanner(text, color) {
        $("#banner").show();
        $("#banner").css("background-color", color);
        $("#bannerMessage").text(text);

        $("#bet").hide();
    }

    function handleBet(action) {
        if (action == "win") {
            balance += 200;
            $("#bal").text(balance + "$");
        } else if (action == "push") {
            balance += 100;
            $("#bal").text(balance + "$");
        }
    }

    $("#restart").on("click", function () {
        $("#banner").hide();
        $("#dealer").empty();
        $("#player").empty();
        startGame();
    });

    $("#restartBet").on("click", function () {
        $("#banner").hide();
        $("#dealer").empty();
        $("#player").empty();
        startGame(true);
    });

    $("#startGame").on("click", function () {
        $("#startScreen").hide();
        $("#game").show();
        startGame();
    });

    $("#startGameBet").on("click", function () {
        $("#startScreen").hide();
        $("#game").show();
        startGame(true);
    });

    $("#hit").on("click", function () {
        if (Game.active) {
            let playerCard = getCard();

            if (playerCard.card === 1) {
                if (Game.player.sum + 11 > 21) {
                    Game.player.sum += 1;
                } else {
                    Game.player.sum += 11;
                }
            } else {
                Game.player.sum += cards[playerCard.card];
            }
            $("#playersum").text(`Your Hand: ${Game.player.sum}`);

            if (Game.player.sum > 21) {
                Game.active = false;
                showBanner("You Busted!", "rgba(111, 33, 9, 0.8)");
            } else if (Game.player.sum == 21) {
                Game.active = false;
                showBanner("You got a Blackjack and won!", "rgba(9, 111, 55, 0.8)");
                if (Game.betting) {
                    handleBet("win");
                }
            }

            if (other[playerCard.card]) {
                filename = `${other[playerCard.card]}_of_${types[playerCard.type].toLowerCase()}.png`;
            } else {
                filename = `${cards[playerCard.card]}_of_${types[playerCard.type].toLowerCase()}.png`;
            }

            let playercard = new Image();
            playercard.src = `./cards/${filename}`;
            $("#player").append(playercard);
        }
    });

    $("#stand").on("click", function () {
        if (Game.active) {
            stand();
        }
    });
});
