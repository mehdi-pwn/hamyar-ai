export const Page = ({ children }) => {
  return <div className="text-white text-center py-8">{children}</div>;
};

export const Title = ({ children }) => {
  return (
    <h1 className="text-4xl">
      <strong>{children}</strong>
    </h1>
  );
};
export const Description = ({ children }) => {
  return <p className="mt-4 text-sm">{children}</p>;
};
export const Form = ({ children }) => {
  return <div className="mt-6">{children}</div>;
};
