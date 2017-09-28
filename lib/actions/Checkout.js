import Action from '../Action';

export default class Checkout extends Action {
  constructor(step, option) {
    super({
      pa: 'checkout',
      cos: step,
      col: option
    });
  }
}
