import Action from './Action';
import Impression from './hits/Impression';
import Product from './hits/Product';
import Promo from './hits/Promo';
import Serializable from './Serializable';

export default class EnhancedEcommerce extends Serializable {
  isEmpty() {
    if ((this.properties[Impression.key] && Object.keys(this.properties[Impression.key]).length) ||
        (this.properties[Action.key] && this.properties[Action.key].length) ||
        (this.properties[Promo.key] && this.properties[Promo.key].length)) {
      return false;
    }

    return true;
  }

  add(hit) {
    if (!(hit instanceof Impression) &&
        !(hit instanceof Product) &&
        !(hit instanceof Promo)) {
      throw new Error("Only 'Impression', 'Product' and 'Promo' hits can be passed to 'add' command.");
    }

    hit.add(this.properties);
  }

  set(action) {
    if (!(action instanceof Action)) {
      throw new Error("Only 'Action' parameter can be passed to 'set' command.");
    }

    action.set(this.properties);
  }

  toQueryString() {
    if (this.isEmpty()) {
      return '';
    }

    let action;
    let query = [];

    // Retrieves the first action on the queue.
    if (this.properties[Action.key] && this.properties[Action.key].length) {
      action = this.properties[Action.key].shift();

      if (action.query) {
        query.push(action.query);
      }
    };

    // Retrieves all stored product impressions until this moment.
    const impressionLists = this.properties[Impression.key];

    if (impressionLists) {
      const impressionListKeys = Object.keys(impressionLists);

      impressionListKeys.forEach(impressionListKey => {
        const impressions = impressionLists[impressionListKey].list;

        if (impressions) {
          impressions.forEach(impression => {
            query.push(impression.toQueryString());
          });
        }
      });

      // Clears all product impressions.
      this.properties[Impression.key] = {};
    }

    // Retrieves all promo impressions until this moment.
    const promos = this.properties[Promo.key];

    // Checks if action is not of type promo.
    // Promo impressions cannot be sent with promo actions.
    // Reference: https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#measuring-promo-impressions
    if (promos && (action && 'promo' !== action.type)) {
      promos.forEach(promo => {
        query.push(promo.toQueryString());
      });

      // Clears all promo impressions.
      this.properties[Promo.key] = [];
    }

    return query.join('&');
  }
}
