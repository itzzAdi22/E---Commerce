import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart } from '../features/cart/cartSlice';
import { selectCartItems, selectCartTotal } from '../features/cart/cartSlice';

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=shipping');
  };

  return (
    <div className="container mt-4">
      <h1>Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <Message>
          Your cart is empty <Link to="/">Go Back</Link>
        </Message>
      ) : (
        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                {cartItems.map((item) => (
                  <div key={item._id} className="row align-items-center mb-3">
                    <div className="col-md-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded"
                      />
                    </div>
                    <div className="col-md-3">
                      <Link to={`/product/${item._id}`}>{item.name}</Link>
                    </div>
                    <div className="col-md-2">${item.price}</div>
                    <div className="col-md-2">
                      <select
                        className="form-select"
                        value={item.qty}
                        onChange={(e) => {
                          const qty = Number(e.target.value);
                          dispatch(removeFromCart(item._id));
                          dispatch({ type: 'cart/addToCart', payload: { ...item, qty } });
                        }}
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-2">
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => removeFromCartHandler(item._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                <div className="h4">${cartTotal.toFixed(2)}</div>
                <button
                  type="button"
                  className="btn btn-primary w-100"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartScreen;
