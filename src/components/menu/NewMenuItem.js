import Image from "next/image"

export default function NewMenuItem() {

  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all w-[120px] h-full relative ">
      <h4 className="font-semibold text-xl my-3">New Item</h4>
			<div className = "font-bold flex justify-center items-center absolute top-0 left-0 w-full h-full" >
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
				<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
			</svg>
			</div>

    </div>
  );
}
