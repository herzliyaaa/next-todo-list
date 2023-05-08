import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { List } from "@/interfaces";
function ListItem() {
  const router = useRouter();
  const { id } = router.query;
  const [todo, setTodo] = useState<List[]>([]);
  //   const fetchTodos = async () => {
  //     const response = await fetch(`/api/lists/${id}`);
  //     const data = await response.json();
  //     setTodos(data);
  //   };

  //   useEffect(() => {
  //     setTimeout(() => {
  //       fetchTodos();
  //     }, 2000);
  //   }, []);

  useEffect(() => {
    const fetchTodoDetails = async () => {
      const response = await fetch(`/api/lists/${id}`);
      const data = await response.json();
      setTodo(data);
      console.log('data');
    };
    if (id) {
      fetchTodoDetails();
    }
  }, [id]);

  return (
    <div className='flex flex-col justify-center items-start'>
      <div className='mt-2'>
        {todo.map((t) => {
          return (
            <div key={t.id} className='mt-2'>
              <h1>{t.name}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ListItem;
