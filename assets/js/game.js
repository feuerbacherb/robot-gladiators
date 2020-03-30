var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;

// You can also log multiple values at once like this
console.log(playerName, playerAttack, playerHealth);

var enemyName = "Roborto";
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function() {
  window.alert("Welcome to Robot Gladiators!");

  // Subtract the value of 'playerAttack' from the value of 'enemyHealth' and use it to update the value in 'enemyHealth'
   enemyHealth = enemyHealth - playerAttack;

  // Log a resulting message to the console so we know that it worked
   console.log(playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health.");

   // check enemyHealth
   if (enemyHealth <= 0) {
      window.alert(enemyName + "has fainted!");
   } else {
      window.alert(enemyName + " still has " + enemyHealth + " health left.");
   }

  // Subtract the value of 'enemyAttack' from the value of 'playerHealth' and use that result to update the value in 'playerHealth'
   playerHealth = playerHealth - enemyAttack;

  // Log a resulting message to the console so we know that it worked
   console.log(enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health.");

   // check playerHealth
   if (playerHealth <= 0) {
      window.alert(playerName + " has died!");
   } else {
      window.alert(playerName + " still has " + playerHealth + " health left.");
   }

};

fight();