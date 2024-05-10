"use client";

import CategoryCards from "@/components/Cards/CategoryCards";

export default function Home() {
  return (
    <main className="flex flex-col">
      <section className="relative h-[24vh] md:h-[70vh] w-full overflow-hidden">
        <img
          alt="Jewelry Shop Hero"
          className="h-full w-full object-cover object-center"
          height={1080}
          src="https://cdztpolwphkawmvkmrei.supabase.co/storage/v1/object/public/Images/product_images/test-category/earring-amazing.jpeg"
          style={{
            aspectRatio: "1920/1080",
            objectFit: "cover",
          }}
          width={1920}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-end px-4 text-center text-white mb-8">
          <h1 className="text-xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Elevate Your Style
          </h1>
          <p className="mt-3 max-w-3xl text-xs md:text-lg sm:mt-5 sm:text-xl">
            Discover our exquisite collection of handcrafted jewelry, designed
            to complement your unique style.
          </p>
        </div>
      </section>
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
            <CategoryCards />
          </div>
        </div>
      </section>
    </main>
  );
}
