import Serializable from './Serializable';

export default class Action extends Serializable {
  constructor(properties) {
    super();

    this.properties = Object.assign(this.properties, properties);
  }

  static get key() {
    return Action.name.toLowerCase();
  }
}
