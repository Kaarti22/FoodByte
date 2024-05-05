import Image from "next/legacy/image";
import Right from "../Icons/Right";

export default function Hero() {
  return (
    <section className="hero md:mt-4 mb-8">
      <div className="py-4 md:py-12">
        <h1 className="text-4xl font-semibold leading-24 text-blue-600">
          Explore Delicious <br />
          Delights with Our <br />
          Online Menu! &nbsp;
        </h1>
        <p className="my-6 text-gray-500 text-sm">
          Tempt your taste buds with mouthwatering delights showcased in vibrant
          imagery, ready to tantalize your senses!
        </p>
        <div className="flex gap-4 text-sm">
          <button className="justify-center bg-primary uppercase flex items-center gap-2 text-white px-4 py-2 rounded-full">
            Order Now
            <Right />
          </button>
        </div>
      </div>
      <div className="relative hidden md:block">
        <Image
          src={"/heroimage.jpeg"}
          layout={"fill"}
          objectFit={"contain"}
          alt={"pizza"}
          priority={true}
        />
      </div>
    </section>
  );
}