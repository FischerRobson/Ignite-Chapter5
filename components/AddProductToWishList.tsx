export interface AddProductToWishListProps {
  onAddToWishList: () => void;
  onRequestClose: () => void;
}

export function AddProductToWishList({ onAddToWishList, onRequestClose }: AddProductToWishListProps) {
  return (
    <span>
      Deseja adicionar aos favoritos?
      <button onClick={onAddToWishList}>SIM</button>
      <button onClick={onRequestClose}>NÃO</button>
    </span>
  )
}