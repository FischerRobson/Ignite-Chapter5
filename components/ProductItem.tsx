import { memo, useState } from "react";
import dynamic from "next/dynamic";

//Lazy loading
//import { AddProductToWishList } from "./AddProductToWishList";
import { AddProductToWishListProps } from "./AddProductToWishList";
const AddProductToWishList = dynamic<AddProductToWishListProps>(() => {
  return import('./AddProductToWishList').then(mod => mod.AddProductToWishList);
}, {
  loading: () => <span>Carregando...</span>
});
import lodash from "lodash";

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    priceFormatted: string;
    title: string;
  };
  onAddToWishList: (id: number) => void;
}

function ProductItemComponent({ product, onAddToWishList }: ProductItemProps) {

  const [isAddingToWishList, setIsAddingToWishList] = useState(false);

  return (
    <div>
      {product.title} - <strong>{product.price}</strong>

      <button onClick={() => setIsAddingToWishList(true)}>
        Adicionar aos favoritos
      </button>

      {isAddingToWishList && (
        <AddProductToWishList
          onAddToWishList={() => onAddToWishList(product.id)}
          onRequestClose={() => setIsAddingToWishList(false)}
        />
      )}

    </div>
  )
}

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  return lodash.isEqual(prevProps.product, nextProps.product);
});

// MEMO: Pure Functional Components, Renders Too Often, Re-renders with same props, Medium to big size