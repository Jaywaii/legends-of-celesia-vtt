// Import document classes.
import { LOCActor } from "./documents/actor.mjs";
import { LOCItem } from "./documents/item.mjs";
// Import helper/utility classes and constants.
import { preloadHandlebarsTemplates } from "./helpers/templates.mjs";
import { LOC } from "./helpers/config.mjs";
// Import sheet classes.
import { LOCActorSheet } from "./sheets/actor-sheet.mjs";
import { LOCItemSheet } from "./sheets/item-sheet.mjs";

/* -------------------------------------------- */
/*  Init Hook                                   */
/* -------------------------------------------- */

Hooks.once('init', function() {

  // Add utility classes to the global game object so that they're more easily
  // accessible in global contexts.
  game.loc = {
    LOCActor,
    LOCItem,
  };

  // Add custom constants for configuration.
  CONFIG.LOC = LOC;

  /**
   * Set an initiative formula for the system
   * @type {String}
   */
  CONFIG.Combat.initiative = {
    formula: "1d20",
    decimals: 2
  };

  // Define custom Document classes
  CONFIG.Actor.documentClass = LOCActor;
  CONFIG.Item.documentClass = LOCItem;

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("loc", LOCActorSheet, { makeDefault: true });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("loc", LOCItemSheet, { makeDefault: true });

  // Preload Handlebars templates.
  return preloadHandlebarsTemplates();
});

/* -------------------------------------------- */
/*  Ready Hook                                  */
/* -------------------------------------------- */

Hooks.once("ready", function() {
  // Include steps that need to happen after Foundry has fully loaded here.
});