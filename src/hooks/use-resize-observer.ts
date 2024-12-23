import { useEffect, useRef } from 'react';

type ResizeObserverCallback = (entries: ResizeObserverEntry[]) => void;

export const useResizeObserver = (
    elementRef: React.RefObject<HTMLElement>,
    callback: ResizeObserverCallback
): (() => void) => {
    const observerRef = useRef<ResizeObserver | null>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) {
            return;
        }

        observerRef.current = new ResizeObserver(callback);
        observerRef.current.observe(element);

        return () => {
            if (observerRef.current) {
                observerRef.current.unobserve(element);
                observerRef.current.disconnect();
            }
        };
    }, [elementRef, callback]);

    return () => {
        if (observerRef.current) {
            observerRef.current.disconnect();
        }
    };
};