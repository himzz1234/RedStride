import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  product: any;
}

const ProductCard = ({ product }: Props) => {
  return (
    <Link href={`/products/${product._id}`} className="product-card">
      <div className="product-card_img-container">
        <Image
          src={product.heroImage}
          alt={product.name}
          width={200}
          height={200}
          className="product-card_img"
        />
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="product-title">{product.name}</h3>

        <div className="flex justify-between">
          <p className="text-gray-400 text-[15px] font-medium">
            <span>{product?.currency}</span>
            <span>{product?.currentPrice}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
