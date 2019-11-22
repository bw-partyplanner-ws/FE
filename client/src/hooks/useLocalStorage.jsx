import { useState } from 'react';

export const useLocalStorage = (key) => {
	const [ localStorageKey ] = useState(key);

	function testLocalStorage() {
		if (localStorage.getItem(localStorageKey)) {
			return true;
		}
		return false;
	}

	function getLocalStorage() {
        // return JSON.parse(localStorage.getItem(localStorageKey));
        return localStorage.getItem(localStorageKey);
	}

	function setLocalStorage(value) {
		localStorage.setItem(localStorageKey, value);
	}

	function removeLocalStorage() {
		localStorage.removeItem(localStorageKey);
	}

	return { testLocalStorage, getLocalStorage, setLocalStorage, removeLocalStorage };
};