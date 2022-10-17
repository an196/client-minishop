import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';

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
	const [cartItems, setCartItems] = useState([
		// {
		// 	"_id": "633051a44155b07e702e3258",
		// 	"goodsID": 4,
		// 	"image": [
		// 		"https://firebasestorage.googleapis.com/v0/b/minishop-b3604.appspot.com/o/product%2Fheadphones_c_1.webp?alt=media&token=c39689af-a55e-4151-b389-10e00087044a",
		// 		"https://firebasestorage.googleapis.com/v0/b/minishop-b3604.appspot.com/o/product%2Fheadphones_c_2.webp?alt=media&token=868d4747-2e9b-41de-9442-88bef9c5101d",
		// 		"https://firebasestorage.googleapis.com/v0/b/minishop-b3604.appspot.com/o/product%2Fheadphones_c_3.webp?alt=media&token=d7cb9ec1-fe15-4de9-847b-a36a7cd8a907",
		// 		"https://firebasestorage.googleapis.com/v0/b/minishop-b3604.appspot.com/o/product%2Fheadphones_c_2.webp?alt=media&token=5cc77a53-bdaf-43f1-bdf3-6a1503db919a"
		// 	],
		// 	"name": "Hybrid Active Noise",
		// 	"price": "300",
		// 	"goodsReceipts": "2022-09-24T17:00:00.000Z",
		// 	"category": 1,
		// 	"amount": 20,
		// 	"__v": 1,
		// 	"details": "<p></p><div id=\"provenanceCertifications_feature_div\" class=\"celwidget\" data-feature-name=\"provenanceCertifications\" data-csa-c-id=\"u3m2z-ubjrj9-o3m9v4-rucwqp\" data-cel-widget=\"provenanceCertifications_feature_div\" style=\"box-sizing: border-box; color: rgb(15, 17, 17); font-family: &quot;Amazon Ember&quot;, Arial, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\"></div><div id=\"serviceCapabilities_feature_div\" class=\"celwidget\" data-feature-name=\"serviceCapabilities\" data-csa-c-id=\"zdgwv9-pxv9u6-6vekj9-nctj30\" data-cel-widget=\"serviceCapabilities_feature_div\" style=\"box-sizing: border-box; color: rgb(15, 17, 17); font-family: &quot;Amazon Ember&quot;, Arial, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\"></div><p></p><div id=\"featurebullets_feature_div\" class=\"celwidget\" data-feature-name=\"featurebullets\" data-csa-c-id=\"gm9vtf-ujnwpf-je1ejl-yi7v7\" data-cel-widget=\"featurebullets_feature_div\" style=\"box-sizing: border-box; color: rgb(15, 17, 17); font-family: &quot;Amazon Ember&quot;, Arial, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\"><div id=\"feature-bullets\" class=\"a-section a-spacing-medium a-spacing-top-small\" style=\"box-sizing: border-box; margin-top: 8px !important; margin-bottom: 0px;\"><h1 class=\"a-size-base-plus a-text-bold\" style=\"box-sizing: border-box; padding: 0px 0px 4px; margin: 0px; text-rendering: optimizelegibility; font-weight: 700 !important; font-size: 16px !important; line-height: 24px !important;\">About this item</h1><ul class=\"a-unordered-list a-vertical a-spacing-mini\" style=\"box-sizing: border-box; margin: 0px 0px 0px 18px; color: rgb(15, 17, 17); padding: 0px;\"><li style=\"box-sizing: border-box; list-style: disc; overflow-wrap: break-word; margin: 0px;\"><span class=\"a-list-item\" style=\"box-sizing: border-box; color: rgb(15, 17, 17);\">Microphone &amp; Call controller: with an integrated microphone and call remote, these headphones are compatible with Apple (iPhone/ iPod/ iPad), Android and Blackberry Audio and smartphone devices *requires lightning plug adaptor for iPhone 7 and later models (not included)</span></li><li style=\"box-sizing: border-box; list-style: disc; overflow-wrap: break-word; margin: 0px;\"><span class=\"a-list-item\" style=\"box-sizing: border-box; color: rgb(15, 17, 17);\">Ergofit Earbud Design: Ergonomic Design for perfect fit; ultra soft Ergofit in ear earbud Headphones conform instantly to your ears (S/M/L earpads Included for a perfect fit)</span></li><li style=\"box-sizing: border-box; list-style: disc; overflow-wrap: break-word; margin: 0px;\"><span class=\"a-list-item\" style=\"box-sizing: border-box; color: rgb(15, 17, 17);\">In Ear Stereo Audio: Tonally balanced audio with crisp highs and deep low notes, plus wider frequency response and lively sound quality for recorded audio</span></li><li style=\"box-sizing: border-box; list-style: disc; overflow-wrap: break-word; margin: 0px;\"><span class=\"a-list-item\" style=\"box-sizing: border-box; color: rgb(15, 17, 17);\">Extended Headphone Cord: Long, 3. 6 feet Headphone cord threads comfortably through clothing and bags making it easy to connect</span></li></ul></div></div>",
		// 	"quantity": 1
		// },
		// {
		// 	"_id": "633051a44155b07e702e3258",
		// 	"goodsID": 4,
		// 	"image": [
		// 		"https://firebasestorage.googleapis.com/v0/b/minishop-b3604.appspot.com/o/product%2Fheadphones_c_1.webp?alt=media&token=c39689af-a55e-4151-b389-10e00087044a",
		// 		"https://firebasestorage.googleapis.com/v0/b/minishop-b3604.appspot.com/o/product%2Fheadphones_c_2.webp?alt=media&token=868d4747-2e9b-41de-9442-88bef9c5101d",
		// 		"https://firebasestorage.googleapis.com/v0/b/minishop-b3604.appspot.com/o/product%2Fheadphones_c_3.webp?alt=media&token=d7cb9ec1-fe15-4de9-847b-a36a7cd8a907",
		// 		"https://firebasestorage.googleapis.com/v0/b/minishop-b3604.appspot.com/o/product%2Fheadphones_c_2.webp?alt=media&token=5cc77a53-bdaf-43f1-bdf3-6a1503db919a"
		// 	],
		// 	"name": "Hybrid Active Noise",
		// 	"price": "300",
		// 	"goodsReceipts": "2022-09-24T17:00:00.000Z",
		// 	"category": 1,
		// 	"amount": 20,
		// 	"__v": 1,
		// 	"details": "<p></p><div id=\"provenanceCertifications_feature_div\" class=\"celwidget\" data-feature-name=\"provenanceCertifications\" data-csa-c-id=\"u3m2z-ubjrj9-o3m9v4-rucwqp\" data-cel-widget=\"provenanceCertifications_feature_div\" style=\"box-sizing: border-box; color: rgb(15, 17, 17); font-family: &quot;Amazon Ember&quot;, Arial, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\"></div><div id=\"serviceCapabilities_feature_div\" class=\"celwidget\" data-feature-name=\"serviceCapabilities\" data-csa-c-id=\"zdgwv9-pxv9u6-6vekj9-nctj30\" data-cel-widget=\"serviceCapabilities_feature_div\" style=\"box-sizing: border-box; color: rgb(15, 17, 17); font-family: &quot;Amazon Ember&quot;, Arial, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\"></div><p></p><div id=\"featurebullets_feature_div\" class=\"celwidget\" data-feature-name=\"featurebullets\" data-csa-c-id=\"gm9vtf-ujnwpf-je1ejl-yi7v7\" data-cel-widget=\"featurebullets_feature_div\" style=\"box-sizing: border-box; color: rgb(15, 17, 17); font-family: &quot;Amazon Ember&quot;, Arial, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\"><div id=\"feature-bullets\" class=\"a-section a-spacing-medium a-spacing-top-small\" style=\"box-sizing: border-box; margin-top: 8px !important; margin-bottom: 0px;\"><h1 class=\"a-size-base-plus a-text-bold\" style=\"box-sizing: border-box; padding: 0px 0px 4px; margin: 0px; text-rendering: optimizelegibility; font-weight: 700 !important; font-size: 16px !important; line-height: 24px !important;\">About this item</h1><ul class=\"a-unordered-list a-vertical a-spacing-mini\" style=\"box-sizing: border-box; margin: 0px 0px 0px 18px; color: rgb(15, 17, 17); padding: 0px;\"><li style=\"box-sizing: border-box; list-style: disc; overflow-wrap: break-word; margin: 0px;\"><span class=\"a-list-item\" style=\"box-sizing: border-box; color: rgb(15, 17, 17);\">Microphone &amp; Call controller: with an integrated microphone and call remote, these headphones are compatible with Apple (iPhone/ iPod/ iPad), Android and Blackberry Audio and smartphone devices *requires lightning plug adaptor for iPhone 7 and later models (not included)</span></li><li style=\"box-sizing: border-box; list-style: disc; overflow-wrap: break-word; margin: 0px;\"><span class=\"a-list-item\" style=\"box-sizing: border-box; color: rgb(15, 17, 17);\">Ergofit Earbud Design: Ergonomic Design for perfect fit; ultra soft Ergofit in ear earbud Headphones conform instantly to your ears (S/M/L earpads Included for a perfect fit)</span></li><li style=\"box-sizing: border-box; list-style: disc; overflow-wrap: break-word; margin: 0px;\"><span class=\"a-list-item\" style=\"box-sizing: border-box; color: rgb(15, 17, 17);\">In Ear Stereo Audio: Tonally balanced audio with crisp highs and deep low notes, plus wider frequency response and lively sound quality for recorded audio</span></li><li style=\"box-sizing: border-box; list-style: disc; overflow-wrap: break-word; margin: 0px;\"><span class=\"a-list-item\" style=\"box-sizing: border-box; color: rgb(15, 17, 17);\">Extended Headphone Cord: Long, 3. 6 feet Headphone cord threads comfortably through clothing and bags making it easy to connect</span></li></ul></div></div>",
		// 	"quantity": 1
		// }
	]);
	const [totalPrice, setTotalPrice] = useState(0);
	const [totalQuantities, setTotalQuantities] = useState(0);
	const [qty, setQty] = useState(1);
	const [isClicked, setIsClicked] = useState(initialState);
	const [screenSize, setScreenSize] = useState(undefined);
	const [categories, setCategories] = useState([]);
	const navbarRef = useRef();

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
			}}
		>
			{children}
		</Context.Provider>
	);
};

export const useStateContext = () => useContext(Context);
