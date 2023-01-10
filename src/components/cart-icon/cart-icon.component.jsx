import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'
import { useContext } from 'react';

import { CartContext } from'../../context/cart.context'

import './cart-icon.component.scss'

const CartIcon = () => {
    const { isCartOpen, setIsOpen } = useContext(CartContext);
    
    const handleClickEvent = () => setIsOpen(!isCartOpen);
        
    return (
        <div className='cart-icon-container' onClick={handleClickEvent}>
            <ShoppingIcon className='shopping-icon'/>
            <span className='item-count'>10</span>
        </div>
    );
}

export default CartIcon;