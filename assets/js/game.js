var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

// You can also log multiple values at once like this
console.log(playerName, playerAttack, playerHealth);


var enemyNames = ["Roborto", "Amy Android", "Robo Tumble"];
var enemyHealth = 50;
var enemyAttack = 12;

console.log(enemyNames);
console.log(enemyNames[0]);
console.log(enemyNames[1]);
console.log(enemyNames[2]);


var fight = function(enemyName) {
   while (playerHealth > 0 && enemyHealth > 0) {
      // ask user if they'd liked to fight or run
      var promptFight = window.prompt('Would you like FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
  
      // if user picks "skip" confirm and then stop the loop
      if (promptFight === "skip" || promptFight === "SKIP") {
        // confirm user wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");
  
        // if yes (true), leave fight
        if (confirmSkip) {
          window.alert(playerName + ' has decided to skip this fight. Goodbye!');
          // subtract money from playerMoney for skipping
          playerMoney = Math(0, playerMoney - 10);
          console.log("playerMoney", playerMoney)
          break;
        }
      }
  
      // remove enemy's health by subtracting the amount set in the playerAttack variable
      var damage = randomNumber(playerAttack - 3, playerAttack);
      enemyHealth = Math.max(0, enemyHealth - damage);
      console.log(
        playerName + ' attacked ' + enemyName + '. ' + enemyName + ' now has ' + enemyHealth + ' health remaining.'
      );
  
      // check enemy's health
      if (enemyHealth <= 0) {
        window.alert(enemyName + ' has died!');
  
        // award player money for winning
        playerMoney = playerMoney + 20;
  
        // leave while() loop since enemy is dead
        break;
      } else {
        window.alert(enemyName + ' still has ' + enemyHealth + ' health left.');
      }
  
      // remove players's health by subtracting the amount set in the enemyAttack variable
      var damage = randomNumber(enemyAttack - 3, enemyAttack);
      console.log(playerHealth, damage);
      playerHealth = Math.max(0, playerHealth - damage);
      console.log(
        enemyName + ' attacked ' + playerName + '. ' + playerName + ' now has ' + playerHealth + ' health remaining.'
      );
  
      // check player's health
      if (playerHealth <= 0) {
        window.alert(playerName + ' has died!');
        // leave while() loop if player is dead
        break;
      } else {
        window.alert(playerName + ' still has ' + playerHealth + ' health left.');
      }
    }

};

// function to generate a random numeric value
var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max-min + 1) + min);

  return value;
}


// function to star the game
var startGame = function() {

  // reset player stats
  playerHealth = 100;
  playerAttack = 10;
  playerMoney = 10;

  for (var i = 0; i < enemyNames.length; i++) {
    if (playerHealth > 0){
        window.alert("Welcome to Robot Gladiators! Round " + (i+1));
        var pickedEnemyName = enemyNames[i];
        enemyHealth = randomNumber(40, 60);
        fight(pickedEnemyName);

        // if we're not at the last enemy in the array
        if (playerHealth > 0 && i < enemyNames.length - 1){
          // ask if the user wants to use the store before the next round
          var storeConfirm = window.confirm("The fight is over, visit the store before the next fight?");

          // if yes, take them to the shop() function
          if (storeConfirm) {
            shop();
          }
          
        }
    } else {
        window.alert("You lost your robot in battle!  Game Over!");
        break;
    }
  }

  // after the loop ends, player is either out of health or enemies to fight, so run endGame routine
  endGame();
}

// function to end the entire game
var endGame = function() {
  window.alert("The game has now ended.  Let's see how you did!");

  // if player is still alive, player wins!
  if (playerHealth > 0) {
    window.alert("Great job, you've survived the game!  You now have a score of " + playerMoney + ".");
  } else {
    window.alert("Yopu've lost your robot in battle.");
  }

  // ask player if they'd like to play again
  var playAgainCoonfirm = window.confirm("Would you like to play again?");

  if (playAgainCoonfirm) {
    // restart the game
    startGame();
  } else {
    window.alert("Thank you for playing Robot Gladiators!  Come back soon!");
  }
}

var shop = function() {
  console.log("entered the shop");
  // ask the player what they'd like to do
  var shopOptionPrompt = window.prompt ("Would you liek to REFILL your health, UPGRADE your attack, or LEAVE the store?");
  console.log(shopOptionPrompt.toLowerCase());
  

  // use switch to carry out the action
  switch (shopOptionPrompt.toLowerCase()){
    case "refill":
      if (playerMoney >= 7) {
      window.alert("Refilling player's health by 20 for 7 dollars");

      // increase health and decrease money
      playerHealth = playerHealth + 20;
      playerMoney = playerMoney - 7;
      } else {
        window.alert("You don't have enough money!");
      }
      break;
    case "upgrade":
      if (playerMoney >= 7) {
      window.alert("Upgrading player's attack by 6 for 7 dollars.");

      // increase attack and decrease money
      playerAttack = playerAttack + 6;
      playerMoney = playerMoney - 7;
      } else {
        window.alert("You don't have enough money!");
      }
      break;
    case "leave":
      window.alert("Leaving the store.");
      // do nothing, so function will end
      break;
    default:
      window.alert("You did not pick a valid option.  Try again.");

      // call shop() again to force player to pick a valid option
      shop();
      break;
  }
}

//start the game when the page loads
startGame();