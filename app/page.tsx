import Searchbar from "@/components/Searchbar";
import React from "react";
import { getAllProducts } from "@/lib/actions";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";

const Home = async () => {
  const allProducts = await getAllProducts();
  return (
    <>
      <section className="px-6 md:px-20 py-24">
        <div className="flex max-xl:flex-col justify-between">
          <div className="flex flex-col justify-center">
            <p className="small-text">Step into savings</p>

            <h1 className="head-text">
              With the Power of <span className="text-red-700">RedStride</span>
            </h1>
            <Searchbar />
          </div>

          <div className="relative border-4 border-red-700 rounded-md">
            <Image
              src="/images/hero.png"
              width={400}
              height={400}
              alt="hero-image"
            />

            <Image
              src="/images/hand-drawn-arrow.svg"
              alt="arrow"
              width={200}
              height={200}
              className="max-xl:hidden absolute -left-[46%] -bottom-20"
            />

            <div className="absolute bottom-10 left-2.5 w-[95%] p-1 rounded-sm bg-gray-200">
              <p className="text-[11.5px] w-full text-center">
                https://www.nike.com/in/t/dunk-low-shoes-4x8b85/FZ4616-600
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="trending-section">
        <h2 className="section-text">Our Top Choices</h2>

        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {allProducts?.map((product) => (
            <ProductCard key={product._id} {...{ product }} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
