import { Dispatch, SetStateAction, useEffect, useState } from 'react';

/**
 * Custom hook for handling local storage with a provided key and initial value.
 *
 * @template T - The type of the value stored in local storage.
 * @param {string} key - The key under which the value is stored in local storage.
 * @param {T | (() => T)} initialValue - The initial value or a function that returns the initial value.
 * @returns {[T, React.Dispatch<React.SetStateAction<T>>]} - A tuple containing the current value and a function to update it.
 */
export const useLocalStorage = <T>(key: string, initialValue: T | (() => T)): [T, Dispatch<SetStateAction<T>>] => {
    // State to track whether the component is mounted or not
    const [mounted] = useState(true);

    // State to store the current value in local storage
    const [value, setValue] = useState<T>(() => {
        if (typeof window !== 'undefined') {
            // Retrieve the JSON-formatted value from local storage
            const JSONValue = mounted && localStorage.getItem(key);

            // Parse the JSON value or return null if it doesn't exist
            const parseJSONValue = JSONValue !== null ? JSON.parse(JSONValue) : null;


            // Return the parsed value if it exists, otherwise return the initial value
            if (parseJSONValue) return parseJSONValue;

            if (typeof initialValue === 'function') {
                return (initialValue as () => T)();
            } else {
                return initialValue;
            }
        }
    });

    // Effect to update local storage whenever the key, mounted state, or value changes
    useEffect(() => {
        // Update the value in local storage
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, mounted, value]);

    // Return a tuple containing the current value and a function to update it
    return [value, setValue] as [typeof value, typeof setValue];
};
