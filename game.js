// Game state
let player = { health: 10, charge: 0, shieldCooldown: 0 };
let npc = { health: 10, charge: 0, shieldCooldown: 0 };

// Possible actions
const actions = ["🗡️ Zwaard", "🛡️ Schild", "⚡ Lading"];

// DOM elements
const playerActionDisplay = document.getElementById("playerAction");
const npcActionDisplay = document.getElementById("npcAction");
const resultDisplay = document.getElementById("result");
const playerHealthDisplay = document.getElementById("playerHealth");
const npcHealthDisplay = document.getElementById("npcHealth");
const predictionDiv = document.getElementById("predictionDiv");

// Update health display
function updateHealth() {
    playerHealthDisplay.textContent = `Player Health: ${player.health}`;
    npcHealthDisplay.textContent = `NPC Health: ${npc.health}`;
}

// NPC chooses a random action
export function npcChooseAction() {
    const actions = ["🗡️ Zwaard", "🛡️ Schild", "⚡ Lading"];
    return actions[Math.floor(Math.random() * actions.length)];
}

// Resolve a turn
export function resolveTurn(playerAction, npcAction) {
    let result = "";

    // Player vs NPC logic
    if (playerAction === "🗡️ Zwaard") {
        const playerDamage = 1 + player.charge;
        const npcDamage = 1 + npc.charge;

        if (npcAction === "🗡️ Zwaard") {
            player.health -= npcDamage;
            npc.health -= playerDamage;
            result = `Both attacked with swords! Player takes ${npcDamage} damage, NPC takes ${playerDamage} damage.`;
        } else if (npcAction === "🛡️ Schild") {
            if (Math.random() < 0.5) {
                result = `Player attacked, but NPC successfully blocked with a shield!`;
            } else {
                npc.health -= playerDamage;
                result = `Player attacked with a sword! NPC tried to block, but failed! NPC takes ${playerDamage} damage.`;
            }
        } else if (npcAction === "⚡ Lading") {
            npc.health -= playerDamage;
            result = `Player attacked with a sword! NPC takes ${playerDamage} damage.`;
        }

        player.charge = 0; // Reset charge after sword attack
    } else if (playerAction === "🛡️ Schild") {
        if (npcAction === "🗡️ Zwaard") {
            const npcDamage = 1 + npc.charge;
            if (Math.random() < 0.5) {
                npc.health -= 1;
                result = `NPC attacked, but Player successfully blocked with a shield! NPC takes 1 damage.`;
            } else {
                player.health -= npcDamage;
                result = `NPC attacked with a sword! Player tried to block, but failed! Player takes ${npcDamage} damage.`;
            }
        } else {
            result = `Player used a shield. No effect.`;
        }
    } else if (playerAction === "⚡ Lading") {
        player.charge++;
        if (npcAction === "🗡️ Zwaard") {
            const npcDamage = 1 + npc.charge;
            player.health -= npcDamage;
            result = `Player charged, but NPC attacked with a sword! Player takes ${npcDamage} damage.`;
        } else if (npcAction === "⚡ Lading") {
            player.charge++;
            npc.charge++;
            result = `Both charged up!`;
        } else {
            result = `Player charged up!`;
        }
    }

    // Update displays
    playerActionDisplay.textContent = `Player Action: ${playerAction}`;
    npcActionDisplay.textContent = `NPC Action: ${npcAction}`;
    resultDisplay.textContent = result;
    updateHealth();

    // Check for game over
    if (player.health <= 0 || npc.health <= 0) {
        const winner = player.health > 0 ? "Player" : "NPC";
        alert(`${winner} wins!`);
        resetGame();
    }
}

// Reset the game
function resetGame() {
    player = { health: 10, charge: 0, shieldCooldown: 0 };
    npc = { health: 10, charge: 0, shieldCooldown: 0 };
    updateHealth();
    playerActionDisplay.textContent = "Player Action: None";
    npcActionDisplay.textContent = "NPC Action: None";
    resultDisplay.textContent = "Result: None";
}

// Initialize game
updateHealth();