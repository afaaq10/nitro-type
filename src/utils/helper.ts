export const isKeyboardCodeAllowed = (code: string) => {
    return (code === "Backspace" || code.startsWith("Key") || code.startsWith("Digit") || code === "Space")
}

export const countErrors = (expected: string, actual: string) => {

    const value = expected.split("");

    return value.reduce((errors, expectedChar, i) => {
        const actualNew = actual[i];
        if (actualNew !== expectedChar) {
            errors++
        }
        console.log("countErrors", { value: value }, { "expected": expected, "actual": actual }, { "errors": errors });

        return errors;
    }, 0);
}


export const debug = (str: string) => {
    if (process.env.NODE_ENV === "development") {
        console.debug(str);
    }
};

export const calculateAccuracyPercentage = (errors: number, total: number) => {
    if (total > 0) {
        const corrects = total - errors;
        return (corrects / total) * 100;
    }

    return 0;
};

export const formatPercentage = (percentage: number) => {
    return percentage.toFixed(0) + "%";
};
