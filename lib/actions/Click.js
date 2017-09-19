import Action from '../Action';
import Product from '../hits/Product';

export default class Click extends Action {
  constructor(list) {
    super({
      pa: 'click',
      pal: list
    });
  }

  set(batch) {
    const actionKey = Action.key;

    if (!batch) {
      batch = {};
    }

    if (!batch[actionKey]) {
      batch[actionKey] = [];
    }

    // Sets a click action with the current list of products,
    // and then it is retained until a regular hit is sent.
    let request = [];

    request.push(this.toQueryString());

    const products = batch[Product.key];

    if (products) {
      products.forEach(product => {
        request.push(product.toQueryString());
      });

      // Clears all product hits from the list.
      batch[Product.key] = [];
    }

    // Add the action to a queue, since only one action can be send at a time.
    batch[actionKey].push(request.join('&'));
  }
}
