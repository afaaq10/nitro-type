import './App.css'
import useCountDownTimer from './hooks/useCountDownTimer';
import useGeneratedWords from './hooks/useGeneratedWords'
import useTypedCharacters from './hooks/useTypedCharacters';

const App = () => {

    const { words, updatedWords } = useGeneratedWords(15);
    const { timeLeft, conutdownReset, countdownStart } = useCountDownTimer(15);
    const { cursor, typed, totalTyped, clearTyped, resetTotalTyped } = useTypedCharacters(true);

    return (
        <div>
            <h1 className='text-3xl text-white'>Bismillah</h1>
            <p className='text-white'>{words}</p>
            <button onClick={updatedWords} className='w-32 mt-4 text-lg rounded-lg bg-slate-500'>Generate</button>

            <h1 className='text-3xl text-white'>{timeLeft}</h1>
            <button onClick={countdownStart} className='w-32 mt-4 text-lg rounded-lg bg-slate-500'>Start time</button>
            <button onClick={conutdownReset} className='w-32 mt-4 text-lg rounded-lg bg-slate-500'>Reset time</button>

            <p className='text-white'>Typed: {typed}</p>
            <p className='w-2 text-red-600'>Cursor Position: {cursor}</p>
            <p className='text-slate-500'>Total Typed: {totalTyped}</p>
            <button onClick={clearTyped} className='w-32 mt-4 text-lg rounded-lg bg-slate-500'>Clear typed</button>
            <button onClick={resetTotalTyped} className='w-32 mt-4 text-lg rounded-lg bg-slate-500'>Reset total typed</button>
        </div>
    )
}

export default App
