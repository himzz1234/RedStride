import PriceInfoCard from "@/components/PriceInfoCard";
import ProductCard from "@/components/ProductCard";
import { getProductById } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IoMdHeartEmpty, IoMdShare } from "react-icons/io";
import { FiBookmark } from "react-icons/fi";
import { TbShoppingBag } from "react-icons/tb";
import Modal from "@/components/Modal";

type Props = {
  params: { id: string };
};

const ProductDetails = async ({ params: { id } }: Props) => {
  const product: any = await getProductById(id);

  if (!product) redirect("/");

  return (
    <div className="flex xl:flex-row flex-col xl:max-w-[1380px] mx-auto py-5">
      <div className="flex-1">
        <div className="relative w-[535px] max-w-[535px] h-[600px]">
          <Image
            src={product.heroImage}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="rounded-md w-full bg-[rgb(245, 245, 245)]"
          />
        </div>
      </div>

      <div className="flex-1 -ml-20">
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-start gap-5 flex-wrap pb-6">
            <div className="flex flex-col gap-1">
              <p className="text-[27px] font-pt_serif text-secondary font-bold">
                {product.name}
              </p>

              <Link
                href={product.url}
                target="_blank"
                className="text-[15px] text-blue-500 underline"
              >
                Visit Product
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <div className="product-hearts">
                <IoMdHeartEmpty size={18} color="#D46F77" />

                <p className="text-base font-semibold text-[#D46F77]">
                  {product.reviewsCount}
                </p>
              </div>

              <div className="p-2 bg-white-200 rounded-md">
                <FiBookmark size={18} />
              </div>

              <div className="p-2 bg-white-200 rounded-md">
                <IoMdShare size={18} />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <div className="flex flex-col gap-4 text-[16px]">
                {product?.desc}
              </div>
            </div>

            <ul className="list-disc gap-2 flex-col flex ml-4">
              {product.details.split("\n").map((detail: String) => (
                <li className="text-[16px] font-medium">{detail}</li>
              ))}
            </ul>
          </div>

          <div className="pt-6">
            <div className="flex items-center gap-2">
              <p className="text-[26px] text-secondary font-bold">
                {product.currency} {product.currentPrice}
              </p>
              <p className="text-[18px] text-black opacity-50 line-through">
                {product.currency} {product.originalPrice}
              </p>
            </div>
          </div>

          <div className="my-7 flex flex-col gap-5">
            <div className="flex gap-5 items-center">
              <PriceInfoCard
                title="Current Price"
                icon="IoMdPricetags"
                value={`${product.currency}${product.currentPrice}`}
                color="#f7aa2b"
              />
              <PriceInfoCard
                title="Average Price"
                icon="MdBarChart"
                value={`${product.currency}${product.averagePrice}`}
                color="#017aff"
              />
              <PriceInfoCard
                title="Lowest Price"
                icon="FaArrowAltCircleDown"
                value={`${product.currency}${product.lowestPrice}`}
                color="#ff394a"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="btn bg-transparent border-2 border-black flex items-center justify-center gap-3">
              {/* <TbShoppingBag size={20} /> */}

              <Link href="/" className="text-base text-black">
                Buy Now
              </Link>
            </button>
            <Modal productId={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
