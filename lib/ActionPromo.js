import Action from './Action';
import Promo from './hits/Promo';

export default class ActionPromo extends Action {
  static get type() {
    return 'promo';
  }

  set(batch) {
    const actionKey = Action.key;

    if (!batch) {
      batch = {};
    }

    if (!batch[actionKey]) {
      batch[actionKey] = [];
    }

    // Sets an action with the current list of promos,
    // and then it is retained until a regular hit is sent.
    let query = [];

    query.push(this.toQueryString());

    const promos = batch[Promo.key];

    // Just attaches promos. Products cannot be attached on promo actions.
    // Reference: https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#measuring-promo-clicks
    if (promos) {
      promos.forEach(promo => {
        query.push(promo.toQueryString());
      });

      // Clears all promo hits from the list.
      batch[Promo.key] = [];
    }

    const action = {
      query: query.join('&'),
      type: ActionPromo.type
    }

    // Add the action to a queue, since only one action can be send at a time.
    batch[actionKey].push(action);
  }
}
