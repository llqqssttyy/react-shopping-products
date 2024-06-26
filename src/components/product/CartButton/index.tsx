import { useContext, useState } from 'react';
import { addCartItem, removeCartItem } from '../../../api/cart';
import { CartItemsContext } from '../../../context/CartItemsProvider';
import { AddCartIcon, RemoveCartIcon } from './Icons';
import * as S from './style';

interface CartButtonProps {
  productId: number;
}

export default function CartButton({ productId }: CartButtonProps) {
  const { cartItems } = useContext(CartItemsContext);
  const [isPushed, setPushed] = useState(() =>
    cartItems.some((cartItem) => cartItem.product.id === productId)
  );

  return isPushed ? (
    <RemoveCartButton setPushed={setPushed} productId={productId} />
  ) : (
    <AddCartButton setPushed={setPushed} productId={productId} />
  );
}

interface CartToggleButtonProps extends CartButtonProps {
  setPushed: React.Dispatch<React.SetStateAction<boolean>>;
}

export function RemoveCartButton({
  setPushed,
  productId,
}: CartToggleButtonProps) {
  const { cartItems, setRefresh } = useContext(CartItemsContext);
  const cartItemId = cartItems.find(
    (cartItem) => cartItem.product.id === productId
  )?.id;

  const handleClick = () => {
    if (cartItemId) {
      removeCartItem({ cartItemId }).then(() => {
        setRefresh(true);
        setPushed(false);
      });
    }
  };

  return (
    <S.Button isPushed onClick={handleClick}>
      <RemoveCartIcon />
      <p>빼기</p>
    </S.Button>
  );
}

export function AddCartButton({ setPushed, productId }: CartToggleButtonProps) {
  const { setRefresh } = useContext(CartItemsContext);

  const handleClick = () => {
    addCartItem({ productId }).then(() => {
      setPushed(true);
      setRefresh(true);
    });
  };

  return (
    <S.Button isPushed={false} onClick={handleClick}>
      <AddCartIcon />
      <p>담기</p>
    </S.Button>
  );
}
