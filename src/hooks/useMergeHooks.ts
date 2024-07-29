import { useCallback, useEffect, useState } from "react";
import { countErrors, debug } from "./../utils/helper";
import useCountdown from "./useCountDownTimer";
import useTypings from "./useTypedCharacters";
import useWords from "./useGeneratedWords";

export type State = "start" | "run" | "finish";

const NUMBER_OF_WORDS = 20;
const COUNTDOWN_SECONDS = 15;

const useMergeHooks = () => {
    const [state, setState] = useState<State>("start");
    const { timeLeft, countdownStart, countdownReset } =
        useCountdown(COUNTDOWN_SECONDS);
    const { words, updatedWords } = useWords(NUMBER_OF_WORDS);
    const { cursor, typed, clearTyped, totalTyped, resetTotalTyped } = useTypings(
        state !== "finish"
    );
    const [errors, setErrors] = useState(0);

    const isStarting = state === "start" && cursor > 0;
    const areWordsFinished = cursor === words.length;

    const restart = useCallback(() => {
        debug("restarting...");
        countdownReset();
        resetTotalTyped();
        setState("start");
        setErrors(0);
        updatedWords();
        clearTyped();
    }, [clearTyped, updatedWords, countdownReset, resetTotalTyped]);

    const sumErrors = useCallback(() => {
        debug(`cursor: ${cursor} - words.length: ${words.length}`);
        const wordsReached = words.substring(0, Math.min(cursor, words.length));
        setErrors((prevErrors) => prevErrors + countErrors(typed, wordsReached));
    }, [typed, words, cursor]);

    // as soon the user starts typing the first letter, we start
    useEffect(() => {
        if (isStarting) {
            setState("run");
            countdownStart();
        }
    }, [isStarting, countdownStart]);

    // when the time is up, we've finished
    useEffect(() => {
        if (!timeLeft && state === "run") {
            debug("time is up...");
            setState("finish");
            sumErrors();
        }
    }, [timeLeft, state, sumErrors]);

    /**
     * when the current words are all filled up,
     * we generate and show another set of words
     */
    useEffect(() => {
        if (areWordsFinished) {
            debug("words are finished...");
            sumErrors();
            updatedWords();
            clearTyped();
        }
    }, [clearTyped, areWordsFinished, updatedWords, sumErrors]);

    return { state, words, typed, errors, restart, timeLeft, totalTyped, cursor };
};

export default useMergeHooks;
