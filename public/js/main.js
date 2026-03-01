import { Game } from './core/game.js';
import { UIManager } from './ui/UIManager.js';
// Get the render target div
var renderDiv = document.getElementById('renderDiv');
// Check if renderDiv exists
if (!renderDiv) {
    console.error('Fatal Error: renderDiv element not found.');
} else {
    // Initialize the game with the render target
    var game = new Game(renderDiv);
    // Initialize UI manager after game has had time to set up
    setTimeout(function () {
        if (game && (game.uiManager === null || game.uiManager === undefined)) {
            game.uiManager = new UIManager(game, renderDiv);
            game.uiManager.init();
            // Set synth names from music manager
            if (game.musicManager && game.musicManager.getAllPresetNames) {
                game.uiManager.setSynthNames(game.musicManager.getAllPresetNames());
            }
        }
    }, 1000);
    // The game now initializes and starts automatically from its constructor.
}
