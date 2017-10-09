# react-native-google-analytics [![npm version](https://badge.fury.io/js/react-native-google-analytics.svg)](http://badge.fury.io/js/react-native-google-analytics)

Google Analytics for React Native!

## Getting started

1. `npm install react-native-google-analytics@latest --save`

## Usage

Below is an example that utilizes this library along with enhanced ecommerce functionality and `react-native-ab` for A/B testing.

```javascript
'use strict';

import React, { Component } from 'react-native';
const {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} = React;
import { Experiment, Variant } from 'react-native-ab';
import {
  Analytics,
  Actions as GAActions,
  Hits as GAHits,
  Experiment as GAExperiment
} from 'react-native-google-analytics';
import DeviceInfo from 'react-native-device-info';

var ga = this.ga = null;

var rnabtest = React.createClass({
  getInitialState() {
    return {
      experiments: {}
    };
  },

  componentWillMount() {
    let clientId = DeviceInfo.getUniqueID();
    ga = new Analytics('UA-XXXXXXXX-X', clientId, 1, DeviceInfo.getUserAgent());
    var screenView = new GAHits.ScreenView(
      'Example App',
      'Welcome Screen',
      DeviceInfo.getReadableVersion(),
      DeviceInfo.getBundleId()
    );
    ga.send(screenView);
  },

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this._resetExperiment}>
          <View>
            <Experiment
              ref="welcomeMessageTest"
              name="welcome-message"
              onChoice={this._onChoice}>
              <Variant name="standard">
                <Text style={styles.welcome}>
                  Welcome to React Native!
                </Text>
              </Variant>
              <Variant name="friendly">
                <Text style={styles.welcome}>
                  Hey there! Welcome to React Native!
                </Text>
              </Variant>
              <Variant name="western">
                <Text style={styles.welcome}>
                  Howdy, partner! This here is React Native!
                </Text>
              </Variant>
            </Experiment>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._sendEvent}>
          <Text style={styles.feature}>
            Send GA Event
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._productImpression}>
          <Text style={styles.feature}>
            Add GA Product Impression
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._promoImpression}>
          <Text style={styles.feature}>
            Add GA Promo Impression
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._clickProduct}>
          <Text style={styles.feature}>
            Set GA Product Click
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._clickPromo}>
          <Text style={styles.feature}>
            Set GA Promo Click
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._productDetail}>
          <Text style={styles.feature}>
            Set GA Product Detail
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._addProductCart}>
          <Text style={styles.feature}>
            Set GA Add Product to Cart
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._removeProductCart}>
          <Text style={styles.feature}>
            Set GA Remove Product from Cart
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._checkout}>
          <Text style={styles.feature}>
            Set GA Checkout
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._checkoutOption}>
          <Text style={styles.feature}>
            Set GA Checkout Option
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._purchase}>
          <Text style={styles.feature}>
            Set GA Purchase
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._refundAll}>
          <Text style={styles.feature}>
            Set GA Refund All
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._refundProduct}>
          <Text style={styles.feature}>
            Set GA Refund Product
          </Text>
        </TouchableHighlight>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+Control+Z for dev menu
        </Text>
      </View>
    );
  },

  _onChoice(testName, variantName) {
    var experiment = new GAExperiment(testName, variantName);

    var state = this.state;
    state.experiments[testName] = experiment;
    this.setState(state);
  },

  _resetExperiment() {
    this.refs.welcomeMessageTest.reset();
  },

  _sendEvent() {
    var experiment = this.state.experiments['welcome-message'];
    var gaEvent = new GAHits.Event(
      'Demos',
      'send',
      'React Native',
      100,
      experiment
    );

    ga.send(gaEvent);
  }

  _productImpression() {
    var gaProductImpression = new GAHits.Impression(
      "P12345",
      "Product Name",
      "Product List",
      "Product Brand",
      "Product Category",
      "Product Variant",
      0, // Position
      200 // Price
    );

    ga.add(gaProductImpression);
  }

  _promoImpression() {
    var gaPromo = new GAHits.Promo(
      "PROMO12345",
      "Promo Name",
      "Promo Creative",
      "Promo Position"
    );

    ga.add(gaPromo);
  }

  _clickProduct() {
    var gaProduct = new GAHits.Product(
      "P12345",
      "Product Name",
      "Product Brand",
      "Product Category",
      "Product Variant",
      "Product Coupon",
      250, // Price
      1, // Quantity
      25 // Position
    );

    ga.add(gaProduct);

    var gaClickAction = new GAActions.Click("Product List");

    ga.set(gaClickAction);
  }

  _clickPromo() {
    var gaPromo = new GAHits.Promo(
      "PROMO12345",
      "Promo Name",
      "Promo Creative",
      "Promo Position"
    );

    ga.add(gaPromo);

    var gaPromoClickAction = new GAActions.PromoClick();

    ga.set(gaPromoClickAction);
  }

  _productDetail() {
    var gaProduct = new GAHits.Product(
      "P12345",
      "Product Name",
      "Product Brand",
      "Product Category",
      "Product Variant",
      "Product Coupon",
      250, // Price
      1, // Quantity
      25 // Position
    );

    ga.add(gaProduct);

    var gaDetailAction = new GAActions.Detail();

    ga.set(gaDetailAction);
  }

  _addProductCart() {
    var gaProduct = new GAHits.Product(
      "P12345",
      "Product Name",
      "Product Brand",
      "Product Category",
      "Product Variant",
      "Product Coupon",
      250, // Price
      1, // Quantity
      25 // Position
    );

    ga.add(gaProduct);

    var gaAddAction = new GAActions.Add();

    ga.set(gaAddAction);
  }

  _removeProductCart() {
    var gaProduct = new GAHits.Product(
      "P12345",
      "Product Name",
      "Product Brand",
      "Product Category",
      "Product Variant",
      "Product Coupon",
      250, // Price
      1, // Quantity
      25 // Position
    );

    ga.add(gaProduct);

    var gaRemoveAction = new GAActions.Remove();

    ga.set(gaRemoveAction);
  }

  _checkout() {
    var gaProduct = new GAHits.Product(
      "P12345",
      "Product Name",
      "Product Brand",
      "Product Category",
      "Product Variant",
      "Product Coupon",
      250, // Price
      1, // Quantity
      25 // Position
    );

    ga.add(gaProduct);

    var gaCheckoutAction = new GAActions.Checkout(1, "Visa");

    ga.set(gaCheckoutAction);
  }

  _checkoutOption() {
    var gaCheckoutOptionAction = new GAActions.CheckoutOption(2, "FedEx");

    ga.set(gaCheckoutOptionAction);
  }

  _purchase() {
    var gaProduct = new GAHits.Product(
      "P12345",
      "Product Name",
      "Product Brand",
      "Product Category",
      "Product Variant",
      "Product Coupon",
      250, // Price
      1, // Quantity
      25 // Position
    );

    ga.add(gaProduct);

    var gaPurchaseAction = new GAActions.Purchase("T12345", "Product Store", 35, 3, 5, "LABORDAY2017");

    ga.set(gaPurchaseAction);
  }

  _refundAll() {
    var gaRefundAction = new GAActions.Refund("T12345");

    ga.set(gaRefundAction);
  }

  _refundProduct () {
    var gaProduct = new GAHits.Product(
      "P12345",
      "Product Name",
      "Product Brand",
      "Product Category",
      "Product Variant",
      "Product Coupon",
      250, // Price
      1, // Quantity
      25 // Position
    );

    ga.add(gaProduct);

    var gaRefundAction = new GAActions.Refund("T12345");

    ga.set(gaRefundAction);
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  feature: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center'
  }
});

AppRegistry.registerComponent('rnabtest', () => rnabtest);

```

Example of how to use custom dimensions:

```javascript
  // Add a custom dimension with a given index & name
  ga.addDimension(1, 'male'); // This will add &cd1=male to all hits
  ga.addDimension(2, 'female');
  // To remove a custom dimension
  ga.removeDimension(1);
```

*TODO: App example that doesn't use react-native-ab*

## API

### Enhanced Ecommerce Hits

The enhanced ecommerce hits are not sent automatically, instead they are retained until a regular hit is sent. For more documentation please go [here](https://developers.google.com/analytics/devguides/collection/protocol/v1/devguide#enhancedecom).

#### new Actions.Add()

No parameters accepted

#### new Actions.Checkout(step, option)

* **step (optional):** number
* **option (optional):** string

#### new Actions.CheckoutOption(step, option)

* **step (optional):** number
* **option (optional):** string

#### new Actions.Click(list)

* **list (optional):** string

#### new Actions.Detail(list)

* **list (optional):** string

#### new Actions.PromoClick()

No parameters accepted

#### new Actions.Purchase(id, affiliation, revenue, tax, shipping, coupon)

* **id (required):** string
* **affiliation (optional):** string
* **revenue (optional):** number
* **tax (optional):** number
* **shipping (optional):** number
* **coupon (optional):** string

#### new Actions.Refund(id, isNonInteractive)

* **id (required):** string
* **isNonInteractive (optional):** boolean

#### new Actions.Remove()

No parameters accepted

#### new Hits.Impression(id, name, list, brand, category, variant, position, price)

* **id (required*):** string
* **name (required*):** string
* **list (required):** string
* **brand (optional):** string
* **category (optional):** string
* **variant (optional):** string
* **position (optional):** number
* **price (optional):** number

**\*** Either **id** or **name** must be set.

#### new Hits.Product(id, name, brand, category, variant, coupon, price, quantity, position)

* **id (required\*):** string
* **name (required\*):** string
* **brand (optional):** string
* **category (optional):** string
* **variant (optional):** string
* **coupon (optional):** string
* **price (optional):** number
* **quantity (optional):** number
* **position (optional):** number

**\*** Either **id** or **name** must be set.

#### new Hits.Promo(id, name, creative, position)

* **id (required\*):** string
* **name (required\*):** string
* **creative (optional):** string
* **position (optional):** string

**\*** Either **id** or **name** must be set.

*Coming soon the rest of the API. For now, refer to the usage section.*
