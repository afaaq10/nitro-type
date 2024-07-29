export const isKeyboardCodeAllowed = (code: string) => {
    return (code === "Backspace" || code.startsWith("Key") || code.startsWith("Digit") || code === "Space")
}
