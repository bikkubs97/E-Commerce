import Products from "./Components/Products";

export default async function Home() {
  const res = await fetch("https://friends-merch-server.onrender.com/products");
  const productsData = await res.json()

  return (
    <main className="m-16">
      <Products productsData={productsData} />
    </main>
  );
}
