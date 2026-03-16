export function Button({ children, className = "", asChild = false, ...props }) {
  if (asChild && children) {
    return children;
  }

  return (
    <button {...props} className={className}>
      {children}
    </button>
  );
}
