/**
 * Extend the base Actor document by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */

export class CelesiaActor extends Actor {
  /** @override */
  prepareData() {
    // Prepare data for the actor. Calling the super version of this executes
    // the following, in order: data reset (to clear active effects),
    // prepareBaseData(), prepareEmbeddedDocuments() (including active effects),
    // prepareDerivedData().
    super.prepareData();
  }

  /** @override */
  prepareBaseData() {
    // Data modifications in this step occur before processing embedded
    // documents or derived data.
  }

  /**
   * @override
   * Augment the basic actor data with additional dynamic data. Typically,
   * you'll want to handle most of your calculated/derived data in this step.
   * Data calculated in this step should generally not exist in template.json
   * (such as ability modifiers rather than ability scores) and should be
   * available both inside and outside of character sheets (such as if an actor
   * is queried and has a roll executed directly from it).
   */
  prepareDerivedData() {
    const actorData = this;
    const systemData = actorData.system;
    const flags = actorData.flags.celesia || {};

    // Make separate methods for each Actor type (character, npc, etc.) to keep
    // things organized.
    this._prepareCreatureData(actorData);
  }

  /**
   * Prepare Character type specific data
   */
  _prepareCreatureData(actorData) {
    if (actorData.type !== 'creature') return;

    // Make modifications to data here. For example:
    const systemData = actorData.system;
    const abilities = systemData.abilities;

    // Loop through ability scores, and add their modifiers to our sheet output.
    for (let [key, ability] of Object.entries(abilities)) {
      // Calculate the modifier using d20 rules.
      ability.value = ability.base + ability.lvlup - ability.dmg - ability.drain - ability.penalty;
      ability.mod = Math.floor((ability.value - 10) / 2);
    }

    // Sanity
    let sanity = systemData.sanity;
    sanity.score = abilities.int + abilities.wis + abilities.cha;
    sanity.edge = floor(sanity.score/2);
    if (abilities.int.value >= abilities.wis.value && abilities.int.value >= abilities.cha.value) {
      sanity.threshold = abilities.int.mod;
    } else if (abilities.wis.value >= abilities.cha.value) {
      sanity.threshold = abilities.wis.mod;
    } else {
      sanity.threshold = abilities.cha.mod;
    }
  }

  /**
   * Override getRollData() that's supplied to rolls.
   */
  getRollData() {
    const data = super.getRollData();

    // Prepare character roll data.
    this._getCreatureRollData(data);

    return data;
  }

  /**
   * Prepare character roll data.
   */
  _getCreatureRollData(data) {
    if (this.type !== 'creature') return;

    // Copy the ability scores to the top level, so that rolls can use
    // formulas like `@str.mod + 4`.
    if (data.abilities) {
      for (let [k, v] of Object.entries(data.abilities)) {
        data[k] = foundry.utils.deepClone(v);
      }
    }

    // Add level for easier access, or fall back to 0.
    // if (data.attributes.level) {
    //   data.lvl = data.attributes.level.value ?? 0;
    // }
  }
}