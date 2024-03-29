import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

const Context = createContext();

const initialState = {
	chat: false,
	userBar: false,
	notification: false,
	logout: false,
};

export const StateContext = ({ children }) => {
	const [showCart, setShowCart] = useState(false);
	const [showHamburgerButton, setShowHamburgerButton] = useState(false);
	const [showSubSearchbar, setShowSubSearchbar] = useState(false);
	const [showSliderNavbar, setShowSliderNavbar] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [totalPrice, setTotalPrice] = useState(0);
	const [totalQuantities, setTotalQuantities] = useState(0);
	const [qty, setQty] = useState(1);
	const [isClicked, setIsClicked] = useState(initialState);
	const [screenSize, setScreenSize] = useState(undefined);
	const [categories, setCategories] = useState([]);
	let navbarRef = useRef(0);

	let foundProduct;
	let index;

	const onAdd = (product, quantity) => {
		const CheckProductInCart = cartItems.find((item) => item._id === product._id);
		setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
		setTotalQuantities((prevQuantities) => prevQuantities + quantity);

		if (CheckProductInCart) {
			const updateCartItems = cartItems.map((cartProduct) => {
				if (cartProduct._id === product._id)
					return {
						...cartProduct,
						quantity: cartProduct.quantity + quantity,
					};
			});

			setCartItems(updateCartItems);
		} else {
			product.quantity = quantity;
			setCartItems([...cartItems, { ...product }]);
		}

		toast.success(`${qty} ${product.name} added to cart`);
	};

	const toggleCartItemQuantity = (id, value) => {
		foundProduct = cartItems.find((item) => item._id === id);
		index = cartItems.findIndex((product) => product._id === id);

		// const newCartItems = cartItems.filter((item, index) => item._id !== id);
		//const newCartItems = cartItems.slice(index,1,item );
		let updateProduct;
		if (value === 'inc') {
			updateProduct = { ...foundProduct, quantity: foundProduct.quantity + 1 };

			setTotalPrice((prevTotalPrice) => Number(prevTotalPrice) + Number(foundProduct.price));
			setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
			cartItems.splice(index, 1, updateProduct);
		} else if (value === 'dec') {
			if (foundProduct.quantity > 1) {
				updateProduct = { ...foundProduct, quantity: foundProduct.quantity - 1 };

				setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
				setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
				cartItems.splice(index, 1, updateProduct);
			}
		}

		setCartItems(cartItems);
	};

	const onRemove = (product) => {
		foundProduct = cartItems.find((item) => item._id === product._id);
		const newCartItems = cartItems.filter((item, index) => item._id !== product._id);
		setTotalPrice((prevTotalPrice) => prevTotalPrice - product.quantity * product.price);
		setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - product.quantity);
		setCartItems(newCartItems);
	};

	const onPayment = () => {
		//use in case local storage store old value
		if (localStorage.getItem('cartItems')) localStorage.removeItem('cartItems');
		if (localStorage.getItem('totalQuantities')) localStorage.removeItem('totalQuantities');
		if (localStorage.getItem('totalPrice')) localStorage.removeItem('totalPrice');
		
		localStorage.setItem('cartItems', JSON.stringify([...cartItems]));
		localStorage.setItem('totalQuantities', totalQuantities);
		localStorage.setItem('totalPrice', totalPrice);
	};

	const incQty = () => {
		setQty((prev) => prev + 1);
	};

	const decQty = () => {
		setQty((prev) => {
			if (prev < 2) return 1;

			return prev - 1;
		});
	};

	const handleClick = (clicked, value) => {
		setIsClicked({ ...initialState, [clicked]: value });
	};

	return (
		<Context.Provider
			value={{
				showCart,
				cartItems,
				totalPrice,
				totalQuantities,
				qty,
				incQty,
				decQty,
				onAdd,
				setShowCart,
				toggleCartItemQuantity,
				onRemove,
				setCartItems,
				setTotalPrice,
				setTotalQuantities,
				setIsClicked,
				initialState,
				handleClick,
				isClicked,
				screenSize,
				setScreenSize,
				showHamburgerButton,
				setShowHamburgerButton,
				showSliderNavbar,
				setShowSliderNavbar,
				showSubSearchbar,
				setShowSubSearchbar,
				categories,
				setCategories,
				navbarRef,
				onPayment,
			}}
		>
			{children}
		</Context.Provider>
	);
};

export const useStateContext = () => useContext(Context);
