import Action from '../Action';

export default class Remove extends Action {
  constructor(list) {
    super({
      pa: 'remove',
      pal: list
    });
  }
}
