import { Product } from "./types";
import { PRODUCTS } from "./mocks/products.jsx";

const api = {

  getAllProducts: (): Promise<Product[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(PRODUCTS), 1000));
  },

  getRecommendedProducts: (): Promise<Product[]> => {
    let results = PRODUCTS;

    results = results.filter((product) => {
      return product.title;
    });

    return new Promise((resolve) => setTimeout(() => resolve(results), 1000));
  },

  search: (query?: string): Promise<Product[]> => {
    let results = PRODUCTS;
    if (query) {
      results = results.filter((product) => {
        return product.title.toLowerCase().includes(query.toLocaleLowerCase());
      });
    }

    return new Promise((resolve) => setTimeout(() => resolve(results), 1000));
  },
};

export default api;
