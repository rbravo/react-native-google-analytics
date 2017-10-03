import Action from '../Action';

export default class Refund extends Action {
  constructor(id, isNonInteractive) {
    super({
      pa: 'refund',
      ti: id,
      ni: +isNonInteractive
    });
  }
}
