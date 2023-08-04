import { useEffect, useState } from "react";
import { Product } from "../types";
import api from "../api";

function Recommended() {
    const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);

    useEffect(() => {
        api.getRecommendedProducts().then(setRecommendedProducts);
    }, []);

    return (
        <main>
            <h1>Productos recomendados</h1>
            <ul>
                {[...recommendedProducts]
                    .sort(() => (Math.random() > 0.5 ? 1 : -1))
                    .slice(0, 3)
                    .map((product) => (
                        <li key={product.id}>
                            <h4>{product.title}</h4>
                            <p>{product.description}</p>
                            <span>$ {product.price}</span>
                        </li>
                    ))}
            </ul>
        </main>
    );
}

export default Recommended