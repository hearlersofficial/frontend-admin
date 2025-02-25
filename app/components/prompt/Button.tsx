interface buttonProps {
  text?: string;
  color?: string;
  handleClick?: () => void;
}

const Button = ({ text, color, handleClick }: buttonProps) => {
  return (
    <button onClick={handleClick} className={`${color} rounded p-2 text-white`}>
      {text}
    </button>
  );
};
export default Button;
