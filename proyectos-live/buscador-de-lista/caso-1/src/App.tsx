import type { Product } from "./types";
import { useEffect, useState } from "react";
import api from "./api";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>(localStorage.getItem("query") ?? "");
  const [sortBy, setSortBy] = useState<string>(localStorage.getItem("sortBy") ?? "");

  useEffect(() => {
    api.getProducts(query, sortBy).then(setProducts);
  }, [query, sortBy]);

  useEffect(() => {
    localStorage.setItem("query", query);
  }, [query]);

  useEffect(() => {
    localStorage.setItem("sortBy", sortBy);
  }, [sortBy]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as "name" | "price";
    setSortBy(value);
  };

  return (
    <main>
      <h1>Tienda digitaloncy</h1>
      <input name="text" placeholder="tv" type="text" onChange={(e) => setQuery(e.target.value)} />
      <button onClick={() => { setQuery(""); setSortBy("Ordenar"); }}>Volver</button>
      <select value={sortBy} onChange={handleSortChange}>
        <option disabled selected hidden>Ordenar</option>
        <option value="name">Alfabeticamente</option>
        <option value="price">Precio</option>
      </select>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h4>{product.title}</h4>
            <p>{product.description}</p>
            <span> {product.price.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
