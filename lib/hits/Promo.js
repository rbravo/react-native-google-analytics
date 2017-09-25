import Hit from '../Hit';

export default class Promo extends Hit {
  constructor(id, name, creative, position) {
    super({
      id: id,
      nm: name,
      cr: creative,
      ps: position
    });
  }

  static get key() {
    return Promo.name.toLowerCase();
  }

  add(batch) {
    const hitKey = Promo.key;

    if (!batch) {
      batch = {};
    }

    if (!batch[hitKey]) {
      batch[hitKey] = [];
    }

    let promo = {};
    let promoIndex = batch[hitKey].length;
    promoIndex++;

    promo[`promo${promoIndex}id`] = this.properties.id;
    promo[`promo${promoIndex}nm`] = this.properties.nm;
    promo[`promo${promoIndex}cr`] = this.properties.cr;
    promo[`promo${promoIndex}ps`] = this.properties.ps;

    // Replaces initial promo keys with the final version.
    this.replace(promo);

    batch[hitKey].push(this);
  }
}
