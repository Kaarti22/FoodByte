import Header from "@/components/layouts/Header";
import Hero from "@/components/layouts/Hero";
import HomeMenu from "@/components/layouts/HomeMenu";
import SectionHeaders from "@/components/layouts/SectionHeaders";

export default function Home() {
  return (
    <main>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16">
        <SectionHeaders subHeader={"Our Story"} mainHeader={"About Us"} />
        <div className="max-w-md mx-auto mt-4 flex flex-col gap-4 text-gray-500">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
            perferendis veritatis dolorum cum nemo assumenda non necessitatibus
            fugiat repellendus minima. Vitae eum quia illo accusantium voluptas
            mollitia qui aut, atque praesentium aliquid vel, nobis, dolorem
            alias. Consequuntur blanditiis fugiat perferendis?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi ut,
            illum, nam dolore iure harum error laboriosam hic temporibus
            incidunt in sunt reiciendis nostrum, excepturi neque. A nostrum
            quasi quibusdam. Magni, qui consequatur. Sapiente, blanditiis!
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui odit
            quos saepe cupiditate vero quas amet nisi sapiente fugit numquam.
          </p>
        </div>
      </section>
      <section className="text-center my-8">
        <SectionHeaders 
          subHeader={'Don\'t hesitate'}   
          mainHeader={'Contact Us'}
        />
        <div className="mt-8">
          <a className="text-4xl underline text-gray-500" href="tel:+91 989 898 9898">+91 989 898 9898</a>
        </div>
      </section>
    </main>
  );
}
