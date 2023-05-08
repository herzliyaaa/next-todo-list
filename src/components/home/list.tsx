import { List } from "@/interfaces";
import Link from "next/link";
const CardList: React.FC<List> = ({ id, name }) => {
  return (
    <div
      className='p-4 rounded-2xl border border-gray-700 bg-gray-50 h-auto dark:bg-[#CBD87D]'
      key={id}
    >
      <div className='flex justify-between items-center'>
        <Link href={`list/${id}`}>
          <p className='text-black text-2xl font-bold'>{name}</p>
        </Link>
        <div className='flex'></div>
      </div>
      <p className='text-sm text-black'>This is test for description</p>
      <div className='mt-3 flex items-center gap-5'>
        <p className='text-sm text-black'>🔴 HIGH</p>
        <p className='text-sm text-black'>Updated Feb 9</p>
      </div>
    </div>
  );
};

export default CardList;
