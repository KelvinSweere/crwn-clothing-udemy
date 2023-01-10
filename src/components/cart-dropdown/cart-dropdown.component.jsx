import './cart-dropdown.component.scss'
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";

import { CartContext } from '../../context/cart.context'
import CartItem from '../cart-item/cart-item.component';
import Button from '../button/button.component';
import Checkout from '../../routes/checkout/checkout.component';

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    const toCheckout = () => {
        navigate('/checkout')
    }

    return(
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.map((item) =>
                    <CartItem key={item.id} cartItem={item}></CartItem>
                )}
            </div>
            <Button onClick={toCheckout}>GO TO CHECKOUT</Button>
        </div>
    );
}

export default CartDropdown;