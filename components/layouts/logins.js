import Header from "./main/header";
const Logins = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-400 to-green-400">
      <Header />
      <main className="pt-16 h-screen flex-grow flex items-center justify-center">
        {children}
      </main>
    </div>
  );
};

export default Logins;
