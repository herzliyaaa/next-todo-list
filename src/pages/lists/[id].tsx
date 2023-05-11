import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BsArrowLeftShort } from "react-icons/bs";
import { Task } from "@/interfaces";

function ListItem() {
  const router = useRouter();
  const { id } = router.query;
  const [todo, setTodo] = useState<any>({});
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTodoDetails = async () => {
      const response = await fetch(`/api/lists/${id}`);
      const data = await response.json();
      setTodo(data);
      setTasks(data.task);
    };
    if (id) {
      fetchTodoDetails();
    }
  }, [id]);

  return (
    <main className="h-screen w-screen flex justify-center">
      <div className="flex flex-col p-5 w-1/2 max-[800px]:w-screen">
        <div className="flex justify-start items-start flex-col">
          <BsArrowLeftShort size={40} onClick={() => router.back()} />
          {/* <button className="bg-indigo-500 h-[3rem] w-[3rem] flex justify-center items-center rounded-3xl hover:bg-indigo-400"></button> */}
        </div>
        <div className="flex pt-5 pb-5 justify-start items-center">
          <h1 className="font-bold text-4xl">{todo.name}</h1>
        </div>

        <div>
          <h1 className=" text-slate-200 font-semibold">TODO</h1>
        </div>

        <div className="flex flex-col pt-5 pb-5 justify-center">
          {tasks.map((task: Task) => {
            return (
              <div
                className="p-4  mb-1 rounded-2xl border border-gray-700 bg-gray-50 h-auto dark:bg-[#4c5762] w-full "
                key={task.taskId}
              >
                <div className="flex justify-start">
                  <p className="text-sm text-white">{task.taskName}</p>
                </div>
              </div>
            );
          })}

          <div className="mt-8">
            <h1 className=" text-slate-200 font-semibold">DONE</h1>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ListItem;
