import Action from '../Action';

export default class Remove extends Action {
  constructor() {
    super({
      pa: 'remove'
    });
  }
}
