import { useEffect } from "react";

export default function useClickOutside(ref: any, fun: any) {
    useEffect(() => {
        const listener = (e: any) => {
            if (!ref.current || ref.current.contains(e.target)) {
                return;
            }
            fun();
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref]);
}