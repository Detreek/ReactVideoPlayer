import { useCallback, useRef, useState } from "react"

export default function useMouseMove(delay: number) {
    const [isMoving, setIsMoving] = useState<boolean>(false)
    const timerRef = useRef<null | number>(null)
    const Movehandler = useCallback(() => {
        cleanup()
        setIsMoving(true)

        timerRef.current = setTimeout(() => {
            setIsMoving(false)

        }, delay)

    }
        , [])
    const cleanup = useCallback(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    }, []);
    return { isMoving, Movehandler, cleanup }
}