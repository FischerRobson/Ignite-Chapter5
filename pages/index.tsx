import { FormEvent, useCallback, useState } from "react"
import { SearchResults } from "../components/SearchResults";


export default function Home() {

  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    if (!search.trim()) {
      return;
    }

    const res = await fetch(`http://localhost:3333/products?q=${search}`);
    const data = await res.json();

    setResults(data);
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
        results={results}
        onAddToWishList={addToWishList}
      />

    </div>
  )
}
