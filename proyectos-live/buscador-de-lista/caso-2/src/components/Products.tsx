import { useEffect, useState } from "react";
import { Product } from "../types";
import api from "../api";

function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [query, setQuery] = useState<string>("");
    const [fav, setFav] = useState<string>(localStorage.getItem('isFav') ?? "")

    useEffect(() => {
        api.getAllProducts().then(setProducts);
    }, [])

    useEffect(() => {
        api.search(query).then(setProducts);
    }, [query]);

    const handleAddToFavorites = (e: any) => {
        e.target.parentElement.classList.toggle("fav")
    };

    return (<>
        <h1>Tienda digitaloncy</h1>
        <input name="text" placeholder="Busca tu producto..." type="text" onChange={(e) => setQuery(e.target.value)} />
        <ul>
            {products.map((product) => (
                <li className={fav} key={product.id}>
                    <h4>{product.title}</h4>
                    <p>{product.description}</p>
                    <span>$ {product.price}</span>
                    <button onClick={handleAddToFavorites}>Fav</button>
                </li>
            ))}
        </ul>
        <hr />
    </>);
}

export default Products;
