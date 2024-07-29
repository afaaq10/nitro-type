import "../App.css"
import cn from "classnames";
import Caret from "./Caret";

const UserTypings = ({
  userInput,
  words,
  className = "",
  cursor
}: {
  userInput: string;
  words: string;
  cursor: number;
  className?: string;
}) => {
  const typedCharacters = userInput.split("");

  return (
    <div className={className}>
      {typedCharacters.map((char, index) => (
        <Character
          key={`${char}_${index}`}
          actual={char}
          expected={words[index]}
          showCursor={index === cursor}
        />
      ))}
      {cursor === typedCharacters.length && <Caret />}
    </div>
  );
};

const Character = ({
  actual,
  expected,
  showCursor
}: {
  actual: string;
  expected: string;
  showCursor: boolean;
}) => {
  const isCorrect = actual === expected;
  const isWhiteSpace = expected === " ";

  return (
    <span
      className={cn({
        "text-red-500": !isCorrect && !isWhiteSpace,
        "text-primary-400": isCorrect && !isWhiteSpace,
        "bg-red-500/50": !isCorrect && isWhiteSpace,
        "blinking-cursor": showCursor,
      })}
    >
      {expected}
      {showCursor && <span className="caret">|</span>}
    </span>
  );
};

export default UserTypings;
