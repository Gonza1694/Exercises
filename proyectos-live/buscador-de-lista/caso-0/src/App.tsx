import type { Product } from "./types";

import { useEffect, useState } from "react";

import api from "./api";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true);
    api.getAllProducts()
      .then((data) => {
        setProducts(data);
        data.length > 0 ? setIsLoading(false) : setIsLoading(true);
      })

  }, [])

  useEffect(() => {
    setIsLoading(true);
    api.search(query)
      .then((query) => {
        setProducts(query);
        query.length > 0 ? setIsLoading(false) : setIsLoading(true);
      })
  }, [query]);

  return (
    <main>
      <h1>Tienda digitaloncy</h1>
      <input name="text" placeholder="Busque su producto aqui..." type="text" onChange={(e) => setQuery(e.target.value)} />
      <ul>
        {isLoading == true
          ? <h1>Cargando...</h1>
          : products.map((product) => (
            <li className={product.price <= 100 ? 'sale' : ''} key={product.id}>
              <h4>{product.title}</h4>
              <p>{product.description}</p>
              <span>$ {product.price}</span>
            </li>
          ))
        }
      </ul>
    </main>
  );
}

export default App;
