import Head from "next/head";
import Image from "next/image";
import { List } from "@/interfaces";
import Loader from "@/components/common/loader";
import CardList from "@/components/home/list";
import { BiPlus } from "react-icons/bi";
import { useEffect, useState } from "react";

export default function Home() {
  const dateToday = new Date();
  const day = dateToday.getDate();
  const month = dateToday.toLocaleString("default", { month: "long" });
  const year = dateToday.getFullYear();
  const [todos, setTodos] = useState<List[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTodos = async () => {
    const response = await fetch("/api/lists");
    const data = await response.json();
    setTodos(data);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      fetchTodos();
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen w-screen flex justify-center">
        <div className="flex flex-col p-5 w-1/2 max-[800px]:w-screen">
          <div className="flex justify-start items-start flex-col">
            <h1 className="font-bold text-3xl">Hey, Herzlia</h1>
            <p>
              {month} {day}, {year}
            </p>
          </div>
          <div className="flex pt-5 pb-5 justify-end items-center">
            <button className="bg-indigo-500 h-[3rem] w-[3rem] flex justify-center items-center rounded-3xl hover:bg-indigo-400">
              <BiPlus onClick={fetchTodos} />
            </button>
          </div>
          {loading ? (
            <div className="flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            <>
              {todos.map((todo) => {
                return <div className="mt-2">
                  <CardList {...todo} key={todo.id} />
                </div>;
              })}
            </>
          )}
        </div>
      </main>
    </>
  );
}
