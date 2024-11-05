import Content from "./components/container/content";
import Header from "./components/header/Header";
import ScrollToTop from "./components/container/content/comp/ScrollToTop";

function App() {
  return (
    <div className="min-h-[100vh] relative">
      <div className="fixed top-0 w-full z-10">
        <Header />
      </div>
      <div className="bg-white pt-[50px]">
        <Content />
      </div>
      <ScrollToTop />
    </div>
  );
}

export default App;
