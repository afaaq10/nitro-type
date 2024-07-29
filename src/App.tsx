import React from "react";
import { FaKeyboard } from "react-icons/fa6";
import GeneratedWords from "./components/GeneratedWords";
import RestartButton from "./components/RestartButton";
import Results from "./components/Results";
import UserTypings from "./components/UserTypings";
import useMergeHook from "./hooks/useMergeHooks";
import { calculateAccuracyPercentage } from "./utils/helper";

const App = () => {
    const { words, typed, timeLeft, errors, state, restart, totalTyped } =
        useMergeHook();

    return (
        <div>
            <div className="flex justify-center gap-4 font-mono text-5xl font-bold text-red-300">
                <h1 className="mb-28">Nitro Type</h1>
                <FaKeyboard size={54} />
            </div>
            <CountdownTimer timeLeft={timeLeft} />
            <WordsContainer>
                <GeneratedWords key={words} words={words} />
                {/* User typed characters will be overlayed over the generated words */}
                <UserTypings
                    className="absolute inset-0"
                    words={words}
                    userInput={typed}
                />
            </WordsContainer>
            <RestartButton
                className={"mx-auto mt-10 text-slate-500"}
                onRestart={restart}
            />
            <Results
                className="mt-10"
                state={state}
                errors={errors}
                accuracyPercentage={calculateAccuracyPercentage(errors, totalTyped)}
                total={totalTyped}
            />
            <footer className='flex items-center justify-center'>
                <p className='absolute bottom-0 mx-auto text-stone-300 mb-7'>Designed with <span className="text-red-700">&#x2764;</span> by <span className='text-white'>Afaaq</span> </p>
            </footer>
        </div>
    );
};

const WordsContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="relative max-w-3xl mt-3 text-3xl leading-relaxed break-all">
            {children}
        </div>
    );
};

const CountdownTimer = ({ timeLeft }: { timeLeft: number }) => {
    return <h2 className="font-medium text-primary-400">Time: {timeLeft}</h2>;
};

export default App;
