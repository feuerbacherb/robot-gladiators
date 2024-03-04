//Game States
//"WIN" - Player robot has defeated all enemy robots
//  *Fight all enemy robots
//  *Defeat each enemy robot
// "LOSE" - Player robot's health is zero or less

// Store and Restart Functionality
// Create startGame() to store game logic
// When player is defeated or no more enemies, call endGame()
// * Alert the player's total stats
// * Ask if they want to play again
// * If yes, call startGame() to reset the game
// After player skips or defeats enemy (with more opponents remaining)
// * Ask if the player wants to shop
// * If no, continue as normal
// * If yes, call shop()
// In shop() ask player if they want to refill health, upgrade attack, or leave.
// * If Refill, subtract money and increase health
// * If Upgrade, subtract money adn increase attack
// * If leave, alert goodbye and exit
// * If any other invalid optionn, call shop() again

//create a function to generate a random number
var randomNumber = function (min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;
};

// test valid response for fight or skip

var fightOrSkip = function () {
  //Confirm if the player wants to FIGHT or SKIP
  var promptFight = window.prompt(
    "Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose."
  );

  if (!promptFight) {
    window.alert("You need to provide a valid answer. Please try again.");
    return fightOrSkip();
  }

  promptFight = promptFight.toLowerCase();

  if (promptFight !== "fight" && promptFight !== "skip") {
    window.alert("You need to provide a valid answer. Please try again.");
    return fightOrSkip();
  }

  // if player chooses to skip the fight
  if (promptFight === "skip") {
    //confirm user wants to skip
    var confirmSkip = window.confirm(
      "Are you sure you'd like to skip this fight?"
    );

    //if yes (true), leave fight
    if (confirmSkip) {
      window.alert(playerInfo.name + " has chosen to skip the fight.");
      //subtract money from playerInfo.money for skipping
      playerInfo.money = Math.max(0, playerInfo.money - 10);

      //return true if user wants to leave
      return true;
    } else {
      return fightOrSkip();
    }
  }
  return false;
};

//Create fight function
var fight = function (enemy) {
  //Initialize turn variable
  var isPlayerTurn = true;
  // Randomize turn order
  if (Math.random() > 0.5) {
    isPlayerTurn = false;
  }

  //repeat and execute as long as the player or enemy robot is alive
  while (playerInfo.health > 0 && enemy.health > 0) {
    if (isPlayerTurn) {
      //Check if the player wants to fight or skip
      if (fightOrSkip()) {
        // if true, leave fight by breaking loop
        break;
      }
      //Perform the player's attack: subtract playerInfo.attack from enemy.health
      var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
      enemy.health = Math.max(0, enemy.health - damage);

      //Log a resulting message to the console
      console.log(
        playerInfo.name +
          " attacked " +
          enemy.name +
          ". " +
          enemy.name +
          " now has " +
          enemy.health +
          " health remaining."
      );

      //Check enemy's current health
      if (enemy.health <= 0) {
        window.alert(enemy.name + " has been defeated!");

        //award player money for winning
        playerInfo.money = playerInfo.money + 20;
        //leave while loop
        break;
      } else {
        window.alert(
          enemy.name + " still has " + enemy.health + " health left."
        );
      }
      //Player gets attacked first
    } else {
      //Perform the enemy's attack: subtract enemy.attack from playerInfo.health
      var damage = randomNumber(enemy.attack - 3, enemy.attack);
      playerInfo.health = Math.max(0, playerInfo.health - damage);

      //Log a resulting message to the console
      console.log(
        enemy.name +
          " attacked " +
          playerInfo.name +
          ". " +
          playerInfo.name +
          " now has " +
          playerInfo.health +
          " health remaining."
      );

      //Check player's current health
      if (playerInfo.health <= 0) {
        window.alert(playerInfo.name + " has been defeated!");
        break;
      } else {
        window.alert(
          playerInfo.name + " still has " + playerInfo.health + " health left."
        );
      }
    }
    isPlayerTurn = !isPlayerTurn;
  }
};

//function to start a new game
var startGame = function () {
  // reset player stats
  playerInfo.reset();

  //Initialize the round and create the enemy
  for (var i = 0; i < enemyInfo.length; i++) {
    //Check for player health greater than 0
    if (playerInfo.health > 0) {
      window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

      //Select which robot to fight and restore their health
      var pickedEnemyObj = enemyInfo[i];
      pickedEnemyObj.health = randomNumber(40, 60);

      //call fight function with enemy robot
      fight(pickedEnemyObj);

      // if we're not at the last enemy in the array
      if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
        // ask if the player wants to use the store
        var storeConfirm = window.confirm(
          "The fight is over, visit the store before the next round?"
        );

        //if yes, take them to the store()
        if (storeConfirm) {
          shop();
        }
      }
    }

    //Declare Game Over if playerInfo.health reaches 0
    else {
      window.alert("You have lost your robot in battle! Game Over!");
      break;
    }
  }
  // after the loop ends, player is either out of health or enemies, so run endGame
  endGame();
};

//function to end the game
var endGame = function () {
  window.alert("The game has ended. Let's see how you did!");
  var highScore = localStorage.getItem("highscore");
  if (highScore === null) {
    highScore = 0;
  }
  //if player is still alive, player wins!
  if (playerInfo.health > 0) {
    window.alert(
      "Great job, you're the new champion! You ended with a score of " +
        playerInfo.money +
        "."
    );
    //Check to see if player beat high score
    if (playerInfo.money > highScore) {
      localStorage.setItem("highscore", playerInfo.money);
      localStorage.setItem("name", playerInfo.name);

      alert(
        playerInfo.name + " now has a high score of " + playerInfo.money + "!"
      );
    } else {
      alert(
        playerInfo.name +
          " did not beat the high score of " +
          highScore +
          ". Maybe next time!"
      );
    }
  } else {
    window.alert("You've lost your robot in battle.");
  }

  var playAgainConfirm = window.confirm("Would you like to play again?");

  if (playAgainConfirm) {
    //restart the game
    startGame();
  } else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }
};

var shop = function () {
  console.log("You have entered the shop.");
  //ask the player what they'd like to do
  var shopOptionPrompt = window.prompt(
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter 1 for REFILL, 2 for UPGRADE, or 3 to LEAVE."
  );

  shopOptionPrompt = parseInt(shopOptionPrompt);

  switch (shopOptionPrompt) {
    case 1:
      playerInfo.refillHealth();
      break;
    case 2:
      playerInfo.upgradeAttack();
      break;
    case 3:
      window.alert("You have left the store.");

      //do nothing, so function will end
      break;
    default:
      window.alert("You did not pick a valid option. Try again.");

      // call shop() again to force player to pick valid option
      shop();
      break;
  }
};

//function to set name

var getPlayerName = function () {
  var name = "";

  // Add loop that prompts for name and checks if valid
  while (name === "" || name === null) {
    name = prompt("What is your robot's name?");
  }

  console.log("Your robot's name is " + name);
  return name;
};

// Initialize player robot name and starting stats
var playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack: 12,
  money: 10,
  reset: function () {
    this.health = 100;
    this.money = 10;
    this.attack = 12;
  },
  refillHealth: function () {
    if (this.money >= 7) {
      window.alert("Refilling " + this.name + "'s health by 25 for 7 dollars.");
      this.health += 25;
      this.money -= 7;
    } else {
      window.alert("You don't have enough money.");
      return shop();
    }
  },
  upgradeAttack: function () {
    if (this.money >= 7) {
      window.alert("Upgrading " + this.name + "'s attack by 6 for 7 dollars.");
      this.attack += 6;
      this.money -= 7;
    } else {
      window.alert("You don't have enough money.");
      return shop();
    }
  },
};

//Initialize enemy robots and stats
var enemyInfo = [
  {
    name: "Pacifier",
    attack: randomNumber(9, 11),
  },
  {
    name: "Overlord",
    attack: randomNumber(10, 12),
  },
  {
    name: "Gamma",
    attack: randomNumber(12, 14),
  },
];

// start the game when the page laoads
startGame();

function newFunction() {
  debugger;
}
