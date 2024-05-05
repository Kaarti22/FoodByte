import Hero from "@/components/layouts/Hero";
import HomeMenu from "@/components/layouts/HomeMenu";
import SectionHeaders from "@/components/layouts/SectionHeaders";

export default function Home() {
  return (
    <main>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16" id="about">
        <SectionHeaders mainHeader={"About Us"} subHeader={"Our Story"} />
        <div className="max-w-xl mx-auto mt-4 flex flex-col gap-4 text-gray-500">
          <p>
            Welcome to FOOD BYTE, where culinary passion meets technological
            innovation! As fervent foodies ourselves, we embarked on a mission
            to revolutionize the dining experience by bringing the finest
            cuisines from local gems to global flavors right to your fingertips.
          </p>
          <p>
            Our journey began with a simple idea: to connect hungry hearts with
            a diverse array of delectable dishes, curated with care and served
            with convenience. Join us in savoring the flavors of possibility,
            one order at a time.
          </p>
          <p>
            With a commitment to excellence and a dedication to customer
            satisfaction, we strive to exceed your expectations with every bite.
            Our platform is more than just a place to order food; its a culinary
            destination where you can explore new tastes, support local
            businesses, and indulge in culinary adventures from the comfort of
            your home.
          </p>
        </div>
      </section>
      <section className="text-center my-8" id="contact">
        <SectionHeaders
          subHeader={"Don't hesitate"}
          mainHeader={"Contact Us"}
        />
        <div className="mt-8">
          <a
            className="text-4xl underline text-gray-500"
            href="tel:+91 989 898 9898"
          >
            +91 989 898 9898
          </a>
        </div>
      </section>
    </main>
  );
}
