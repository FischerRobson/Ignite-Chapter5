import { FormEvent, useCallback, useState } from "react"
import { SearchResults } from "../components/SearchResults";

type Results = {
  totalPrice: number;
  data: any[];
}

export default function Home() {

  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Results>({
    totalPrice: 0,
    data: []
  });

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    if (!search.trim()) {
      return;
    }

    const res = await fetch(`http://localhost:3333/products?q=${search}`);
    const data = await res.json();

    const formatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    });

    const products = data.map(product => {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        priceFormated: formatter.format(product.price),
      }
    })

    const totalPrice = products.reduce((total, product) => {
      return total + product.price;
    }, 0);

    setResults({ totalPrice, data });
  }

  //Utilizado para funções que são passadas para componentes filhos
  const addToWishList = useCallback(async (id: Number) => {
    console.log(id);
  }, []);

  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      <SearchResults
        results={results.data}
        totalPrice={results.totalPrice}
        onAddToWishList={addToWishList}
      />

    </div>
  )
}
