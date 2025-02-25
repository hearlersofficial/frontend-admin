interface ButtonProps {
  text?: string;
  color?: string;
  handleClick?: () => void;
}

const Button = ({ text, color, handleClick }: ButtonProps) => {
  return (
    <button onClick={handleClick} className={`${color} rounded p-2 text-white`}>
      {text}
    </button>
  );
};
export default Button;
