import React from 'react'

const useCountDownTimer = (seconds: number) => {

    const [timeLeft, setTimeLeft] = React.useState(seconds);
    const intervalRef = React.useRef<NodeJS.Timer | null>(null);

    const hasTimerEnded = timeLeft <= 0;
    const isTimerRunning = intervalRef.current != null;

    const countdownStart = React.useCallback(() => {
        if (!hasTimerEnded && !isTimerRunning) {
            intervalRef.current = setInterval(() => {
                setTimeLeft((prevTimeLeft) => prevTimeLeft - 1)
            }, 1000)
        }
    }, [setTimeLeft, hasTimerEnded, isTimerRunning]);

    const conutdownReset = React.useCallback(() => {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
        setTimeLeft(seconds);
    }, [seconds]);

    React.useEffect(() => {
        if (hasTimerEnded) {
            clearInterval(intervalRef.current!);
            intervalRef.current = null;
        }
    }, [hasTimerEnded]);

    React.useEffect(() => {
        return () => clearInterval(intervalRef.current!);
    }, []);


    return { timeLeft, countdownStart, conutdownReset }
}

export default useCountDownTimer
