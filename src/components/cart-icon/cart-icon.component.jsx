import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'
import { useContext } from 'react';

import { OpenCartContext } from'../../context/cart-open.context'

import './cart-icon.component.scss'

const CartIcon = () => {
    const { isCartOpen, setIsCardOpen } = useContext(OpenCartContext);
    
    const handleClickEvent = () => setIsCardOpen(!isCartOpen);
        
    return (
        <div className='cart-icon-container' onClick={handleClickEvent}>
            <ShoppingIcon className='shopping-icon'/>
            <span className='item-count'>10</span>
        </div>
    );
}

export default CartIcon;