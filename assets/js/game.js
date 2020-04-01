// function to set name
var getPlayerName = function() {
  var name="";

  while (name === "" || name === null) {
    name = prompt("What is your robot's name?");
  }

  console.log ("Your robot's name is " + name);
  return name;
};

var fightOrSkip = function() {
  // ask user if they'd like to fight or skip using a function
  var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle?  Enter 'FIGHT' or 'SKIP' to choose.");

  // Conditional Recursive Function Call
  if (promptFight === "" || promptFight === null) {
    window.alert("You need to provide a valid answer!  Please try again.");
    return fightOrSkip();
  }

  // if user picks 'skip' confirm and then stop the loop
  if (promptFight.toUpperCase === "SKIP") {
    // confirm user wants to skip
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");

    // if yes (true), leave the fight
    if (confirmSkip) {
      window.alert(playerInfo.name + " has decided to skip this fight.  Goodbye!");

      // subtract money from playerMoney for skipping
      playerInfo.money = playerInfo.money - 10;
      shop();
    }
  }
}

var playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack: 10,
  money: 10, 
  reset: function() {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },
  refillHealth: function() {
    if (this.money >= 7) {
      window.alert("Refilling player's health by 20 for 7 dollars.");
      this.health += 20;
      this.money -= 7;
    } else {
      window.alert("You don't have enough money!");
    }    
  },
  upgradeAttack: function() {
    if (this.money >= 7) {
      window.alert("Upgrading player's attack by 6 for 7 dollars.");
      this.attack += 6;
      this.money -= 7;
    } else {
      window.alert("You don't have enough money!");
    }
  }
};

// You can also log multiple values at once like this
console.log(playerInfo.name, playerInfo.attack, playerInfo.health);


var fight = function(enemy) {
   console.log(enemy);
   while (playerInfo.health > 0 && enemy.health > 0) {
      // ask user if they'd liked to fight or run
      fightOrSkip();
  
      // remove enemy's health by subtracting the amount set in the playerInfo.attack variable
      var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
      enemy.health = Math.max(0, enemy.health - damage);
      console.log(
        playerInfo.name + ' attacked ' + enemy.name + '. ' + enemy.name + ' now has ' + enemy.health + ' health remaining.'
      );
  
      // check enemy's health
      if (enemy.health <= 0) {
        window.alert(enemy.name + ' has died!');
  
        // award player money for winning
        playerInfo.money = playerInfo.money + 20;
  
        // leave while() loop since enemy is dead
        break;
      } else {
        window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
      }
  
      // remove players's health by subtracting the amount set in the enemy.attack variable
      var damage = randomNumber(enemy.attack - 3, enemy.attack);
      console.log(playerInfo.health, damage);
      playerInfo.health = Math.max(0, playerInfo.health - damage);
      console.log(
        enemy.name + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health + ' health remaining.'
      );
  
      // check player's health
      if (playerInfo.health <= 0) {
        window.alert(playerInfo.name + ' has died!');
        // leave while() loop if player is dead
        break;
      } else {
        window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
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
  playerInfo.reset();

  for (var i = 0; i < enemyInfo.length; i++) {
    if (playerInfo.health > 0){
        window.alert("Welcome to Robot Gladiators! Round " + (i+1));
        var pickedEnemyObj = enemyInfo[i];
        pickedEnemyObj.health = randomNumber(40, 60);
        fight(pickedEnemyObj);

        // if we're not at the last enemy in the array
        if (playerInfo.health > 0 && i < enemyInfo.length - 1){
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
  if (playerInfo.health > 0) {
    window.alert("Great job, you've survived the game!  You now have a score of " + playerInfo.money + ".");
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
  var shopOptionPrompt = window.prompt ("Would you liek to 1 - REFILL your health, 2 - UPGRADE your attack, or 3 - LEAVE the store?");
  console.log(shopOptionPrompt);
  shopOptionPrompt = parseInt(shopOptionPrompt);

  // use switch to carry out the action
  switch (shopOptionPrompt){
    case 1:
      playerInfo.refillHealth();
      break;
    case 2:
      playerInfo.upgradeAttack();
      break;
    case 3:
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


var enemyInfo = [
  {
    name: "Roborto",
    attack: randomNumber(10, 14)
  },
  {
    name: "Amy Android",
    attack: randomNumber(10, 14)
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10, 14)
  }
];

//start the game when the page loads
startGame();