import React from 'react';
import { faker } from '@faker-js/faker';

const generatedWords = (count: number) => {
    return faker.word.words(count).toLowerCase();
}

const useGeneratedWords = (count: number) => {
    const [words, setWords] = React.useState(generatedWords(count));

    const updatedWords = React.useCallback(() => { setWords(generatedWords(count)); }, [count])
    return { words, updatedWords };
}

export default useGeneratedWords;
