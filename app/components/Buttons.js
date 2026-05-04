import { sharedStyles, colors } from "../styles";

export const PrimaryButton = ({ onClick, children, bgColor, style, width, padding, fontSize }) => {
  return (
    <button
      onClick={onClick}
      style={{ ...sharedStyles.buttonStyle(bgColor, { width, padding, fontSize }), ...style }}
      className="transition-all duration-200 hover:brightness-90 hover:scale-[1.02] active:scale-[0.95] hover:shadow-md"
    >
      {children}
    </button>
  );
};

export const SecondaryButton = ({ onClick, children, bgColor, style }) => {
  return (
    <button
      onClick={onClick}
      style={{ ...sharedStyles.secondaryBtnStyle, ...style }}
      className="transition-all duration-200 hover:brightness-90 hover:scale-[1.02] active:scale-[0.95] hover:shadow-md"
    >
      {children}
    </button>
  );
};