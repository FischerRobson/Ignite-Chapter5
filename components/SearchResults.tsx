import { ProductItem } from "./ProductItem";
import { AutoSizer, List, ListRowRenderer } from "react-virtualized";

interface SearchResultProps {
  results: Array<{
    id: number;
    price: number;
    title: string;
    priceFormatted: string;
  }>;
  totalPrice: number;
  onAddToWishList: (id: number) => void;
}

export function SearchResults({ results, onAddToWishList, totalPrice }: SearchResultProps) {

  // useMemo: cálculos pesados, igualdade referencial (informação repassada ao componente filho) 
  // const totalPrice = useMemo(() => {
  //   return results.reduce((total, product) => {
  //     return total + product.price;
  //   }, 0);
  // }, [results]);

  const rowRender: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <ProductItem
          onAddToWishList={onAddToWishList}
          product={results[index]}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>{totalPrice}</h2>

      {/* {results.map(product => {
        return (
          <ProductItem
            key={product.id}
            onAddToWishList={onAddToWishList}
            product={product}
          />
        )
      })} */}

      <List
        height={300}
        rowHeight={300}
        width={900}
        overscanRowCount={5}
        rowCount={results.length}
        rowRenderer={rowRender}
      />

    </div>
  )
}