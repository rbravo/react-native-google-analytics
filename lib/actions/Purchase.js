import Action from '../Action';

export default class Purchase extends Action {
  constructor(id, affiliation, revenue, tax, shipping, coupon) {
    super({
      pa: 'purchase',
      ti: id,
      ta: affiliation,
      tr: revenue,
      tt: tax,
      ts: shipping,
      tcc: coupon
    });
  }
}
