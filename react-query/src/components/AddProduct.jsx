import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const AddProduct = () => {
  const [state, setState] = useState({
    title: "",
    description: "",
    price: 0,
    rating: 5,
    thumbnail: "",
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newProduct) =>
      axios.post("http://localhost:3000/products", newProduct),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(["products"]);
    },
    onMutate: (variables) => {
      return { greeting: "Say Hello" };
    },
  });

  const submitData = (event) => {
    event.preventDefault();
    console.log(state);
    const newData = { ...state, id: crypto.randomUUID().toString() };
    mutation.mutate(newData);
  };
  const handleChange = (event) => {
    const name = event.target.name;
    const value =
      event.target.type === "number"
        ? event.target.valueAsNumber
        : event.target.value;

    setState({
      ...state,
      [name]: value,
    });
  };

  if (mutation.isPending) {
    return <span>Submitting.....</span>;
  }
  if (mutation.isError) {
    return <span>Error: {mutation.error.message}</span>;
  }
  return (
    <div className="m-2 p-2 bg-gray-100 w-1/5 h-1/2">
      <h2 className="text-2xl my-2">Add a product</h2>
      {mutation.isSuccess && <p>Product Added</p>}
      <form className="flex flex-col" onSubmit={submitData}>
        <input
          type="text"
          name="title"
          value={state.title}
          id=""
          onChange={handleChange}
          className="my-2 border p-2 rounded"
          placeholder="Enter a product title"
        />

        <textarea
          type="text"
          name="description"
          value={state.description}
          id=""
          onChange={handleChange}
          className="my-2 border p-2 rounded"
          placeholder="Enter a product description"
        ></textarea>
        <input
          type="number"
          name="price"
          value={state.price}
          id=""
          onChange={handleChange}
          className="my-2 border p-2 rounded"
          placeholder="Enter a product price"
        />
        <input
          type="text"
          name="thumbnail"
          value={state.thumbnail}
          id=""
          onChange={handleChange}
          className="my-2 border p-2 rounded"
          placeholder="Enter a product thumbnail"
        />

        <button
          type="submit"
          className="bg-black m-auto text-white text-xl p-1 rounded-md"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
