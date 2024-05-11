"use client";

import CategoryCards from "@/components/Cards/CategoryCards";
import ProductCardSkeleton from "@/components/Skeletons/ProductCardSkeleton";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getUserFeedbacks } from "@/redux/store/feedbacks/action";
import { RootState } from "@/redux/store/store";
import { getAllFeaturedProducts } from "@/utils/getFunction/getFeaturedProducts";
import { handelAddToCart } from "@/utils/ProductsFunction";
import { products_product } from "@prisma/client";
import axios from "axios";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { it } from "node:test";
import { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch<any>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { feedbacks, fetching: feedbacksLoading } = useSelector(
    (state: RootState) => state.feedbacks
  );
  const [loading, setLoading] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);

  useEffect(() => {
    const getAllFeaturedProducts = async () => {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_ENDPOINT_URL}/products/featured`
      );
      if (response.status !== 200) {
        setLoading(false);
        throw new Error("Failed to fetch products");
      }
      setFeaturedProducts(response.data);
      setLoading(false);
    };

    getAllFeaturedProducts();
    dispatch(getUserFeedbacks());
  }, []);

  console.log(feedbacks);

  return (
    <main className="flex flex-col">
      <section className="relative h-[40vh] md:h-[70vh] w-full overflow-hidden">
        <Image
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
      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
            <CategoryCards />
          </div>
        </div>
      </section>
      <section className="bg-white py-10 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Featured Products
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Discover our latest and greatest jewelry pieces.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
            {!loading
              ? featuredProducts?.map((item, index) => (
                  <div className="bg-gray-50 rounded-xl overflow-hidden p-3">
                    <div className="w-full overflow-hidden rounded-lg bg-gray-200">
                      <Image
                        alt="Earrings"
                        className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300 ease-in-out"
                        height={400}
                        src={item.prod_image_url}
                        style={{
                          aspectRatio: "400/400",
                          objectFit: "cover",
                        }}
                        width={400}
                      />
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="text-base md:text-lg font-medium text-gray-900 line-clamp-2 md:line-clamp-1">
                            {item.prod_title}
                          </h3>
                        </div>
                        <p className="hidden md:block mt-1 text-sm text-gray-500 line-clamp-2">
                          {item.prod_desc}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-gray-900 font-medium">{`RS. ${item.prod_price}`}</span>
                        </div>
                        <Link
                          href={
                            !user
                              ? "/login"
                              : `product/${item.categories_category.cat_id}/${item.categories_category.id}`
                          }
                        >
                          <Button className="w-full mt-2">Shop Now</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              : [...Array(3)].map((_, index) => <ProductCardSkeleton />)}
          </div>
        </div>
      </section>
      <section className="bg-gray-100 py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              What Our Customers Say
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Hear from our satisfied customers about their experience with our
              jewelry.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
            {feedbacks?.map((item, index) => (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Image
                      alt="Customer 1"
                      className="h-12 w-12 rounded-full"
                      height={48}
                      src={item?.user?.main_userprofile?.user_pfp_url}
                      style={{
                        aspectRatio: "48/48",
                        objectFit: "cover",
                      }}
                      width={48}
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      {item?.user?.first_name} {item?.user?.last_name}
                    </h3>
                    <p className="text-base text-gray-500">{item.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
