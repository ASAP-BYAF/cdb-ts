import Footer from "./Footer";
import Header from "./Header";

const Home = () => {
  return (
    <div>
      <Header />
      <main className="min-h-[80vh]">
        <h1 className="font-serif italic text-4xl font-bold my-4 text-emerald-300">
          There is always only one truth !!{" "}
        </h1>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
