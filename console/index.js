const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

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

startGame();

function startGame() {
    dealer = [];
    player = [];

    dealer.hand = [];
    dealer.score = 0;
    dealer.isBusted = false;

    player.hand = [];
    player.score = 0;

    let playerCard = drawCard();
    let dealerCard = drawCard();

    player.score += cards[playerCard];
    player.hand.push(getCard(playerCard));

    dealer.score += cards[dealerCard];
    dealer.hand.push(getCard(dealerCard));

    console.log(`Dealer: ${dealer.hand[0]}${dealer.score !== dealer.hand[0] ? ` - ${dealer.score}` : ""}\n\nPlayer: ${player.hand[0]}${player.score !== player.hand[0] ? ` - ${player.score}` : ""}`);

    const ask = () => {
        rl.question("\n\nHit or stand? (h/s): ", function (choice) {
            if (choice === "h") {
                playerCard = drawCard();
                player.hand.push(getCard(playerCard));
                player.score += cards[playerCard];

                console.log(`You drew a ${getCard(playerCard)} (${cards[playerCard]})\n`);
                console.log(`Dealer: ${dealer.score}\n\nPlayer: ${player.score}`);

                if (player.score > 21) {
                    rl.question("\nYou busted!\n\nDo you want to play again? (y/n)", function (pa) {
                        if (pa == "y") {
                            startGame();
                        } else {
                            return rl.close();
                        }
                    });
                } else if (player.score === 21) {
                    rl.question("\nBlackjack! You won.\n\nDo you want to play again? (y/n)", function (pa) {
                        if (pa == "y") {
                            startGame();
                        } else {
                            return rl.close();
                        }
                    });
                } else {
                    ask();
                }
            } else if (choice === "s") {
                stand();
                rl.close();
            } else {
                ask();
            }
        });
    };
    ask();
}

function stand() {
    if (dealer.score < 17) {
        let dealerCard = drawCard();
        dealer.hand.push(getCard(dealerCard));
        dealer.score += cards[dealerCard];
        console.log(`Dealer drew a ${getCard(dealerCard)} (${cards[dealerCard]}) [Dealer Total:  ${dealer.score}]\n`);

        stand();
    } else {
        if (dealer.score > 21) {
            console.log("Dealer busted! You win!");
        } else if (player.score > dealer.score) {
            console.log("You win!");
        } else if (player.score < dealer.score) {
            console.log("Dealer wins!");
        } else {
            console.log("It's a push!");
        }

        rl.question("\nDo you want to play again? (y/n) ", function (pa) {
            if (pa == "y") {
                startGame();
            } else {
                return rl.close();
            }
        });
    }
}

function drawCard() {
    let card = Math.floor(Math.random() * 13) + 1;

    return card;
}

function getCard(card) {
    switch (card) {
        case 1:
            return "Ace";
        case 11:
            return "Jack";
        case 12:
            return "Queen";
        case 13:
            return "King";
        default:
            return card;
    }
}
