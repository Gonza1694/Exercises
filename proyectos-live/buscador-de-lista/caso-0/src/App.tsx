import type { Product } from "./types";

import { useEffect, useState } from "react";

import api from "./api";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    api.search(query).then(setProducts);
  }, [query]);

  return (
    <main>
      <h1>Tienda digitaloncy</h1>
      <input name="text" placeholder="Busque su producto aqui..." type="text" onChange={(e) => setQuery(e.target.value)} />
      <ul>
        {products.length > 0
          ? products.map((product) => (
            <li className={product.price <= 100 ? 'sale' : ''} key={product.id}>
              <h4>{product.title}</h4>
              <p>{product.description}</p>
              <span>$ {product.price}</span>
            </li>
          ))
          : <h1>Cargando...</h1>}
      </ul>
    </main>
  );
}

export default App;
