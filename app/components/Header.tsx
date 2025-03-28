const Header: React.FC = () => {
    return (
      <header className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-6 mb-8 shadow-lg">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">Welcome to Gallery.AI</h1>
          <p className="text-lg mt-2">Your AI-powered image gallery</p>
        </div>
      </header>
    );
  };

  export default Header;