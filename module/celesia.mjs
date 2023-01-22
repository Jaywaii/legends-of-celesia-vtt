// Import document classes.
import { CelesiaActor } from "./documents/actor.mjs";
import { CelesiaItem } from "./documents/item.mjs";
// Import helper/utility classes and constants.
import { preloadHandlebarsTemplates } from "./helpers/templates.mjs";
import { CELESIA } from "./helpers/config.mjs";
// Import sheet classes.
import { CelesiaActorSheet } from "./sheets/actor-sheet.mjs";
import { CelesiaItemSheet } from "./sheets/item-sheet.mjs";

/* -------------------------------------------- */
/*  Init Hook                                   */
/* -------------------------------------------- */

Hooks.once('init', function() {

  // Add utility classes to the global game object so that they're more easily
  // accessible in global contexts.
  game.celesia = {
    CelesiaActor,
    CelesiaItem,
  };

  // Add custom constants for configuration.
  CONFIG.CELESIA = CELESIA;

  /**
   * Set an initiative formula for the system
   * @type {String}
   */
  CONFIG.Combat.initiative = {
    formula: "1d20",
    decimals: 2
  };

  // Define custom Document classes
  CONFIG.Actor.documentClass = CelesiaActor;
  CONFIG.Item.documentClass = CelesiaItem;

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("celesia", CelesiaActorSheet, { makeDefault: true });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("celesia", CelesiaItemSheet, { makeDefault: true });

  // Preload Handlebars templates.
  return preloadHandlebarsTemplates();
});

/* -------------------------------------------- */
/*  Ready Hook                                  */
/* -------------------------------------------- */

Hooks.once("ready", function() {
  // Include steps that need to happen after Foundry has fully loaded here.
});