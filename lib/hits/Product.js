import Hit from '../Hit';

export default class Product extends Hit {
  constructor(id, name, brand, category, variant, coupon, price, quantity, position) {
    super({
      id: id,
      nm: name,
      br: brand,
      ca: category,
      va: variant,
      cc: coupon,
      pr: price,
      qt: quantity,
      ps: position
    });
  }

  static get key() {
    return Product.name.toLowerCase();
  }

  add(batch) {
    const hitKey = Product.key;

    if (!batch) {
      batch = {};
    }

    if (!batch[hitKey]) {
      batch[hitKey] = [];
    }

    let product = {};
    let productIndex = batch[hitKey].length;
    productIndex++;

    product[`pr${productIndex}id`] = this.properties.id;
    product[`pr${productIndex}nm`] = this.properties.nm;
    product[`pr${productIndex}br`] = this.properties.br;
    product[`pr${productIndex}ca`] = this.properties.ca;
    product[`pr${productIndex}va`] = this.properties.va;
    product[`pr${productIndex}cc`] = this.properties.cc;
    product[`pr${productIndex}pr`] = this.properties.pr;
    product[`pr${productIndex}qt`] = this.properties.qt;
    product[`pr${productIndex}ps`] = this.properties.ps;

    // Replaces initial product keys with the final version.
    this.replace(product);

    batch[hitKey].push(this);
  }
}
