import Add from './lib/actions/Add';
import Checkout from './lib/actions/Checkout';
import CheckoutOption from './lib/actions/CheckoutOption';
import Click from './lib/actions/Click';
import Detail from './lib/actions/Detail';
import Remove from './lib/actions/Remove';

import Event from './lib/hits/Event';
import Exception from './lib/hits/Exception';
import Impression from './lib/hits/Impression';
import Item from './lib/hits/Item';
import PageView from './lib/hits/PageView';
import Product from './lib/hits/Product';
import ScreenView from './lib/hits/ScreenView';
import Social from './lib/hits/Social';
import Timing from './lib/hits/Timing';
import Transaction from './lib/hits/Transaction';

import _Analytics from './lib/Analytics';
import _Experiment from './lib/Experiment';

export const Hits = {
  Event,
  Exception,
  Impression,
  PageView,
  Product,
  ScreenView,
  Social,
  Timing,
  Transaction,
  Item
};

export const Actions = {
  Add,
  Checkout,
  CheckoutOption,
  Click,
  Detail,
  Remove
};

export const Analytics = _Analytics;
export const Experiment = _Experiment;
