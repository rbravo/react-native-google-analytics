import Action from '../Action';

export default class CheckoutOption extends Action {
  constructor(step, option) {
    super({
      pa: 'checkout_option',
      cos: step,
      col: option
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

    // This action does not require any products' information.
    const action = {
      query: this.toQueryString(),
      type: Action.type
    }

    // Add the action to a queue, since only one action can be send at a time.
    batch[actionKey].push(action);
  }
}
