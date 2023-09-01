import { combineReducers } from 'redux';
import base from './base';
import order from './order';
import menu from './menu';
import user from './user';
import payment from './payment';

const rootReducer = combineReducers({
    base: base.reducer,
    order: order.reducer,
    menu: menu.reducer,
    user: user.reducer,
    payment: payment.reducer
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;