import Action from './Action';
import Impression from './hits/Impression';
import Product from './hits/Product';
import Serializable from './Serializable';

export default class EnhancedEcommerce extends Serializable {
  isEmpty() {
    if ((this.properties[Impression.key] && Object.keys(this.properties[Impression.key]).length) ||
        (this.properties[Action.key] && this.properties[Action.key].length)) {
      return false;
    }

    return true;
  }

  add(hit) {
    if (!(hit instanceof Impression) &&
        !(hit instanceof Product)) {
      throw new Error("Only 'Impression' and 'Product' hits can be passed to 'add' command.");
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

    let query = [];

    // Retrieves the first action on the queue.
    if (this.properties[Action.key].length) {
      query.push(this.properties[Action.key].shift());
    };

    const impressionLists = this.properties[Impression.key];

    if (impressionLists) {
      const impressionListKeys = Object.keys(impressionLists);

      // Retrieves all impressions currently on the list.
      impressionListKeys.forEach(impressionListKey => {
        const impressions = impressionLists[impressionListKey].list;

        if (impressions) {
          impressions.forEach(impression => {
            query.push(impression.toQueryString());
          });
        }
      });

      // Clears all impressions from the list.
      this.properties[Impression.key] = {};
    }

    return query.join('&');
  }
}
