import Action from '../Action';

export default class Add extends Action {
  constructor(list) {
    super({
      pa: 'add',
      pal: list
    });
  }
}
