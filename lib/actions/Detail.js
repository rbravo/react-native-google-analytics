import Action from '../Action';

export default class Detail extends Action {
  constructor(list) {
    super({
      pa: 'detail',
      pal: list
    });
  }
}
