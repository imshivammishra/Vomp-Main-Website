import Image from "next/image";
import SearchBar from "@/components/forms/SearchBar";

export default function HomeHero() {
  return (
    <section aria-label="Find a venue" className="bg-white">
      <div className="mx-auto max-w-[1440px] px-5 pt-12 md:px-10 md:pt-16">
        <h1 className="mx-auto max-w-[1040px] text-center text-[29px] leading-[1.22] font-bold tracking-[-0.025em] text-[#141414] md:text-[46px]">
          Every Celebration Starts Here.
          <br className="hidden sm:block" />{" "}
          Find the Perfect Venue in One Search.
        </h1>

        <div className="mx-auto mt-8 w-full max-w-[780px] md:mt-10">
          <SearchBar />
        </div>
      </div>

      <div className="relative mt-3 h-[240px] w-full sm:h-[300px] lg:h-[330px]">
        <Image
          src="/images/ps/hero-a.jpg"
          alt="Candlelit wedding reception table with a long floral runner"
          fill
          priority
          sizes="100vw"
          quality={82}
          className="object-cover"
        />
      </div>
      <p className="py-3 text-center text-[10px] text-[#8a8a8a]">
        Photo by Venue On My Plate
      </p>
    </section>
  );
}
