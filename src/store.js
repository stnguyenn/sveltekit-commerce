import { writable } from 'svelte/store';
import { shopifyFetch } from './utils/shopify.js';
import { loadCart } from '$utils/shopify';

export const cartQuantity = writable('');
export const cart = writable([]);
export const search = writable('');

export const getCartItems = async () => {
  let cartId = localStorage.getItem('cartId') ? JSON.parse(localStorage.getItem('cartId')) : null;
  try {
    cartId = JSON.parse(localStorage.getItem('cartId'));
  } catch (e) {
    console.error('Error parsing cartId from localStorage', e);
    cartId = null;
  }

  try {
    const shopifyResponse = await loadCart(cartId);

    let sum = 0;
    shopifyResponse.body?.data?.cart?.lines?.edges?.forEach((d) => {
      sum += d.node.quantity;
    });
    cartQuantity.set(sum);
    return shopifyResponse;
  } catch (error) {
    console.log(error);
  }
};
