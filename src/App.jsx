import Hero from "./components/Hero";

function App() {
  return (
    <div className="bg-amber-50 min-h-screen text-gray-800">
      <Hero />
      {/* Тут буде решта сайту: товари, форма, кошик */}
    </div>
  );
}

export default App;
import KarpatteaShop from "./KarpatteaShop";

export default function App() {
  return <KarpatteaShop />;
}

