import { useMemo } from "react"
import { ProductItem } from "./ProductItem"

interface SearchResultProps {
  results: Array<{ id: number, price: number, title: string }>
}

export function SearchResults({ results }: SearchResultProps) {

  // useMemo: cálculos pesados, igualdade referencial (informação repassada ao componente filho) 
  const totalPrice = useMemo(() => {
    return results.reduce((total, product) => {
      return total + product.price;
    }, 0);
  }, [results]);

  return (
    <div>
      <h2>{totalPrice}</h2>

      {results.map(product => {
        return (
          <ProductItem product={product} />
        )
      })}
    </div>
  )
}