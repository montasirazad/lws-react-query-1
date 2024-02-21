import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const ProductList = () => {
  const [page, setPage] = useState(1);

  const retrieveProducts = async ({ queryKey }) => {
    const response = await axios.get(
      `http://localhost:3000/products?_page=${queryKey[1].page}&_per_page=6`
    );
    return response.data;
  };
  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products", { page }],
    queryFn: retrieveProducts,
    refetchInterval: 1000,
  });

  if (isLoading) return <div>Fetching Products ....</div>;
  if (error) return <div>An error occured: {error.message}</div>;

  return (
    <div className="flex flex-col justify-center items-center w-3/5">
      <h2 className="text-3xl my-2">Product List</h2>
      <ul className="flex flex-wrap justify-center items-center">
        {products.data &&
          products.data.map((product) => (
            <li
              key={product.id}
              className="flex flex-col items-center m-2 border rounded-sm"
            >
              <img
                className="object-cover h-24 w-24 border rounded-full m-auto"
                src={product.thumbnail}
                alt={product.title}
              />
              <p className="text-3xl my-3">{product.title}</p>
            </li>
          ))}
      </ul>
      <div className="flex">
        {products.prev && (
          <button
            className="p-1 mx-1 bg-gray-100 border cursor-pointer rounded-sm"
            onClick={() => setPage(products.prev)}
          >
            Prev
          </button>
        )}
        {products.next && (
          <button
            className="p-1 mx-1 bg-gray-100 border cursor-pointer rounded-sm"
            onClick={() => setPage(products.next)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductList;
