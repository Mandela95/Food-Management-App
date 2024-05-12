import { createContext } from "react";
import { Bounce, toast } from "react-toastify";

export const ToastContext = createContext();

export default function ToastContextProvider(props) {
	let getToastValue = (type, message) => {
		return toast[type](message, {
			position: "top-right",
			autoClose: 4000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
			transition: Bounce,
		});
	};
	return (
		<ToastContext.Provider value={{ getToastValue }}>
			{props.children}
		</ToastContext.Provider>
	);
}
