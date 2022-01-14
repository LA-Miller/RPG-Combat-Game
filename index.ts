//
//            Create an interface called:
//?                   CharacterInterface
//
//            Give this interface the following variable names and type information:
//?                    name: string;
//?                    health: number;
//?                    attack: number;
//?                    defense: number;
//?                    accuracy: number;
//
//            Create a Character class, assign it the interface above. This class will have a constructor that will accept and declare the variables in the interface above.
//
//            Create two classes, Player and Enemy, each one needs to inherit properties and methods from the Character class. These classes will also use constructors.
//
//            Within the Character class create a method called:
//?             attackTarget
//              ..that accepts a parameter called:
//?               target
//                This parameter will represent an instantiated class of Player or Enemy. Provide this parameter accurate type information, and include this method to the CharacterInterface.
//
//              This function should log the name of the character that is attacking, as well as the name of the target.
//
//            Create a new instance of the Player class and the Enemy class passing along the correct arguments for (name..health..attack..etc).
//
//            Call the attack function on the new Player instance, and pass in the new Enemy instance, see if it functions correctly.

// ! ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// interface CharacterInterface {
//   name: string;
//   health: number;
//   attack: number;
//   defense: number;
//   accuracy: number;
// }

// class Character implements CharacterInterface {

//   constructor(
//     public name: name,
//     health: number,
//     attack: number,
//     defense: number,
//     accuracy: number
//   ) {
//     this.name = name;
//     this.health = health;
//     this.attack = attack;
//     this.defense = defense;
//     this.accuracy = accuracy;
//   }

//   attackTarget(target: Enemy, attacker: Player) {
//   }
// }

// class Player extends Character {
//   name = "Good Guy";
// }

// class Enemy extends Character {
//   name = "Bad Guy";
// }

interface CharacterInterface {
  name: string;
  health: number;
  maxHealth: number;
  attack: number;
  defense: number;
  accuracy: number;
  healthBar: HealthIcon[];
  attackTarget(target: CharacterInterface): void;
  showHealth: () => void;  
}

type HealthIcon = "🟩" | "🟥";

class Character implements CharacterInterface {
  healthBar: HealthIcon[] = [
    "🟩",
    "🟩",
    "🟩",
    "🟩",
    "🟩",
    "🟩",
    "🟩",
    "🟩",
    "🟩",
    "🟩",
  ];

  maxHealth: number = this.health;
  constructor(
    public name: string,
    public health: number,
    public attack: number,
    public defense: number,
    public accuracy: number
  ) {}

  attackTarget(target: CharacterInterface): void {
    // ? CHECK ATTACKER HEALTH
    if (this.health <= 0) {
      return;
    } else {
      // ? CHECK TARGET HEALTH
      if (target.health > 0) {
        //? ATTACK LANDED
        if (Math.random() > 1 - this.accuracy) {
          let damage: number =
            this.attack * (1 + target.defense) + Math.floor(Math.random() * 5);
          console.log(
            `${this.name} attacked ${target.name} with ${damage} damage 💥💥 \n`
          );

          target.health -= damage;

          //   ? CHECKING TARGET'S HEALTH PERCENT
          let targetHealthPercent = (target.health / target.maxHealth).toFixed(2);

          if(targetHealthPercent.toString()[0] === "-") {

            for(let x = 0; x < target.healthBar.length; x++) {
                target.healthBar[x] = "🟥"; 
            }
          } else {
              target.healthBar = [
                  "🟥",
                  "🟥",
                  "🟥",
                  "🟥",
                  "🟥",
                  "🟥",
                  "🟥",
                  "🟥",
                  "🟥",
                  "🟥",
            ];
            for(let y = 0; y < +targetHealthPercent.toString()[2]; y++){
                target.healthBar[y] = '🟩';
            }
            target.showHealth();
          }

          // ? CHECK IF TARGET STILL ALIVE
          if (target.health <= 0) {
            console.log(`${target.name} was defeated by ${this.name}... ☠\n`);
          }
        } else {
          console.log(`${this.name}'s Attack missed! ❌ \n`);
        }
      }
    }
  }

  async rest() {
      console.log("Resting...");
      return new Promise((resolve, reject): void => {
        setTimeout(() => {
            console.log(`Rest complete, HP Restored:`);
            this.health = this.maxHealth;
            resolve("");
        }, 3000)
      })
  }

  showHealth() {
      console.log(`[${this.name}]`);
      console.log(`${this.healthBar.join("")}`);
      console.log(`HP: ${this.health}/${this.maxHealth} \n`)
  }
}

class Player extends Character {
  constructor(
    public name: string,
    public health: number,
    public attack: number,
    public defense: number,
    public accuracy: number
  ) {
    super(name, health, attack, defense, accuracy);

    // IIFE function
    (() => {
        console.log(`Player ${this.name} joined the game.`);
    })()
  }
}
class Enemy extends Character {
  constructor(
    public name: string,
    public health: number,
    public attack: number,
    public defense: number,
    public accuracy: number
  ) {
    super(name, health, attack, defense, accuracy);
  }
}

//   let seniorEvil: Enemy = new Enemy('Name', 3130, 50, 30, 0.5 );

const Player1: Player = new Player("🗡️ Dragon_Slayer", 3130, 50, 30, 0.5);

const AI_Entry_Creature: Enemy = new Enemy("🔥🐰 Fire Rabbit", 500, 5, 7, 0.3);

const AI_Ice_Dragon_Boss: Enemy = new Enemy(
  "❄️🐲 Ice Dragon",
  5050,
  25,
  18,
  0.4
);

const maxNumOfTurns = 100;

const EngageCombat = (a:CharacterInterface, b:CharacterInterface) => {
    for(let i = 1; i < maxNumOfTurns; i++) {
        if(Math.random() > .5){
            a.attackTarget(b);
        } else {
            b.attackTarget(a);
        }
    }
}

const ExecuteEvents = async() => {
    // Fight Rabbit
    EngageCombat(Player1, AI_Entry_Creature);
    // restore health
    await Player1.rest()
    // Fight boss
    EngageCombat(Player1, AI_Ice_Dragon_Boss);
}

console.log(ExecuteEvents());

// Player1.attackTarget(AI_Entry_Creature);
