import React from "react";
import { FaKeyboard } from "react-icons/fa6";
import GeneratedWords from "./components/GeneratedWords";
import RestartButton from "./components/RestartButton";
import Results from "./components/Results";
import UserTypings from "./components/UserTypings";
import useMergeHook from "./hooks/useMergeHooks";
import { calculateAccuracyPercentage } from "./utils/helper";

const App = () => {
    const { words, typed, timeLeft, errors, state, restart, totalTyped, cursor } =
        useMergeHook();

    return (
        <div>
            <div className="flex justify-center gap-4 mt-20 mb-24 text-5xl font-medium text-red-300">
                <h1>Nitro Type</h1>
                <FaKeyboard size={54} />
            </div>
            <CountdownTimer timeLeft={timeLeft} />
            <WordsContainer>
                <GeneratedWords key={words} words={words} />
                <UserTypings
                    className="absolute inset-0"
                    words={words}
                    userInput={typed}
                    cursor={cursor}
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
    return <h2 className="text-3xl font-medium text-primary-400">Time: <span className="text-3xl text-yellow-600">{timeLeft}</span></h2>;
};

export default App;
