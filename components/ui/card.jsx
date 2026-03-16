export function Card({ children, className }) {
  return <div className={className}>{children}</div>;
}

export function CardHeader({ children }) {
  return <div className="p-4 border-b">{children}</div>;
}

export function CardTitle({ children }) {
  return <h3 className="font-semibold">{children}</h3>;
}

export function CardContent({ children, className }) {
  return <div className={className}>{children}</div>;
}
