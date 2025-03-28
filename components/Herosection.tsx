import Image from "next/image"
const Herosection = ({name}:{name:string}) => {
  return (
    <div className="flex items-center justify-center min-h-[400px] gap-8 flex-wrap px-5">
        <div className="left max-w-[500px] flex flex-col gap-3 text-center">
            <div className="text-2xl">Welcome to</div>
            <div className="font-bold text-4xl">{name}</div>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate laudantium earum magni maiores quis nesciunt deserunt ut. Corporis inventore exercitationem quam consequatur distinctio veritatis quas laudantium itaque voluptatum mollitia, error a reiciendis.</div>
            <button className="bg-blue-700 text-white px-4 py-2 max-w-[50%] mx-auto">Shop Now</button>
        </div>
        <div className="right">
          <Image src={'/img.jpg'} alt="image" width={300} height={300}></Image>
        </div>
      
    </div>
  )
}

export default Herosection
