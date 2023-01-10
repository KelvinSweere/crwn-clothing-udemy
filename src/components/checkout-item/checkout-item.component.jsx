import './checkout-item.styles.scss'

import { useContext } from 'react';
import { CartContext } from '../../context/cart.context'

const CheckoutItem = ({cardItem}) => {
    const {name, imageUrl, price, quantity} = cardItem;
    const { addItemToCart, removeItemToCart, clearItemToCart } = useContext(CartContext);

    const handleClearCartItem = () => clearItemToCart(cardItem);

    const decreaseQuantity = () => {
        removeItemToCart(cardItem);
    }

    const increaseQuantity = () => {
        addItemToCart(cardItem);
    }

    return(
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={name}></img>
            </div>
            
            <span className='name'>{name}</span>

            <span className='quantity'>
                <div className='arrow' onClick={decreaseQuantity}>
                    &#10094;
                </div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={increaseQuantity}>
                    &#10095;
                </div>
            </span>

            <span className='price'>{price}</span>

            <div onClick={handleClearCartItem} className='remove-button'>&#10005;</div>

        </div>
    );
}

export default CheckoutItem;