import http from '../http-common';

import Product from '../DTO/productDTO';

export const getAll = async (): Promise < {
  payload: Product[] | null,
  error: string | null
} > => {
  try {
    const {
      data
    } = await http.get('products');
    return {
      payload: data,
      error: null,
    }
  } catch (err) {
    return {
      payload: null,
      error: err.message
    }
  }
}

export const get = async (id: string): Promise < {
  payload: Product | null,
  error: string | null
} > => {
  try {
    const {
      data
    } = await http.get(`products/${id}`);
    return {
      payload: data,
      error: null
    }
  } catch (err) {
    return {
      payload: null,
      error: err.message
    }
  }
}