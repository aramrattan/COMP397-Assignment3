//storing controls in varibles
var btnSpin = document.getElementById("btnSpin");
var btnReset = document.getElementById("btnReset");
var btnQuit = document.getElementById("btnQuit");
var lblMoney = document.getElementById("lblMoney");
var lblJackpot = document.getElementById("lblJackpot");
var txtBet = document.getElementById("txtBet");
var image1 = document.getElementById("image1");
var image2 = document.getElementById("image2");
var image3 = document.getElementById("image3");

/**
 * function to validate whether the bet is more than the amount of money
 * 
 * @method 
 * @return {void}
 */
function validateBet() {
    if (Number(txtBet.textContent) <= Number(lblMoney.textContent))
    {
        btnSpin.disable=true;
    }
}

var playerMoney = 1000;
var winnings = 0;
var jackpot = 5000;
var playerBet = 10;
var spinResult;
var character = "";
var winRatio = 0;
var tweety = 0;
var sylvester = 0;
var hector = 0;


/* Utility function to show Player Stats */
function showPlayerStats()
{
    lblJackpot.textContent("Jackpot: " + jackpot);
    lblMoney.textContent("Player Money: " + playerMoney);
   
}

/* Utility function to reset all fruit tallies */
function resetFruitTally() {
    tweety = 0;
    sylvester = 0;
    hector = 0;
}

/* Utility function to reset the player stats */
function resetAll() {
    playerMoney = 1000;
    jackpot = 5000;
    playerBet = 0;
}


/* Check to see if the player won the jackpot */
function checkJackPot() {
    /* compare two random values */
    var jackPotTry = Math.floor(Math.random() * 51 + 1);
    var jackPotWin = Math.floor(Math.random() * 51 + 1);
    if (jackPotTry == jackPotWin) {
        alert("You Won the $" + jackpot + " Jackpot!!");
        playerMoney += jackpot;
        jackpot = 1000;
    }
}

/* Utility function to show a win message and increase player money */
function showWinMessage() {
    playerMoney += winnings;
    lblMoney.textContent(winnings);
    resetFruitTally();
    checkJackPot();
}

/* Utility function to show a loss message and reduce player money */
function showLossMessage() {
    playerMoney -= playerBet;
    lblMoney.textContent(playerMoney);
    resetFruitTally();
}

/* Utility function to check if a value falls within a range of bounds */
function checkRange(value, lowerBounds, upperBounds) {
    if (value >= lowerBounds && value <= upperBounds)
    {
        return value;
    }
    else {
        return !value;
    }
}

/* When this function is called it determines the betLine results.
e.g. Tweety - Sylvester - Hector */
function Reels() {
    var betLine = [];
    var outCome = [0, 0, 0];

    for (var spin = 0; spin < 3; spin++) {
        outCome[spin] = Math.floor((Math.random() * 60) + 1);
        switch (outCome[spin]) {
            case checkRange(outCome[spin], 1, 20):  // 33% probability
                betLine[spin] = 2;
                hector++;
                break;
            case checkRange(outCome[spin], 21, 40): // 33% probability
                betLine[spin] = 0;
                tweety++;
                break;
            case checkRange(outCome[spin], 41, 60): // 33% probability
                betLine[spin] = 1;
                sylvester++;
                break;
        }
    }
    return betLine;
}

/* This function calculates the player's winnings, if any */
function determineWinnings()
{
    if (hector == 0)
    {
        if (tweety == 3) {
            winnings = playerBet * 10;
        }
        else if(sylvester == 3) {
            winnings = jackpot;
            alert("I did, I did tee a puddy tat! ")
        }
        else if (hector <= 3) {
            winnings = playerBet * 30;
        }
        else if (tweety == 2) {
            winnings = playerBet * 2;
        }
        else if (sylvester == 2) {
            winnings = playerBet * 2;
        }
        else {
            winnings = playerBet * 1;
        }
        //winNumber++;
        showWinMessage();
    }
    else
    {
        lossNumber++;
        showLossMessage();
    }
    
}

/* When the player clicks the spin button the game kicks off */
btnSpin.click(function () {
    playerBet = Number(txtBet.textContent());

    if (playerMoney == 0)
    {
        if (confirm("You ran out of Money! \nDo you want to play again?")) {
            resetAll();
            showPlayerStats();
        }
    }
    else if (playerBet > playerMoney) {
        alert("You don't have enough Money to place that bet.");
    }
    else if (playerBet < 0) {
        alert("All bets must be a positive $ amount.");
    }
    else if (playerBet <= playerMoney) {
        spinResult = Reels();
        character = spinResult[0] + " - " + spinResult[1] + " - " + spinResult[2];
        
        determineWinnings();
        turn++;
        showPlayerStats();
    }
    else {
        alert("Please enter a valid bet amount");
    }
    image1.s
    
});



//txtBet.onchange(validateBet());