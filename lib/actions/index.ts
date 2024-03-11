"use server";

import { connectToDB } from "../mongoose";
import { scrapeAmazonProduct } from "../scraper";
import Product from "../models/product.model";
import { findAverage } from "../utils";
import { revalidatePath } from "next/cache";
import { generateEmailBody, sendEmail } from "../nodemailer";
import { DatedPrice, User } from "@/types";

export async function scrapeAndStoreProduct(productUrl: string) {
  if (!productUrl) return;

  try {
    connectToDB();
    const scrapedProduct = await scrapeAmazonProduct(productUrl);

    if (!scrapedProduct) return;

    let product: any = scrapedProduct;
    const exisitngProduct = await Product.findOne({
      url: scrapedProduct.url,
    });

    if (exisitngProduct) {
      const updatedPriceHistory: any = [
        ...exisitngProduct.priceHistory,
        { price: scrapedProduct.currentPrice },
      ];

      product = {
        ...scrapedProduct,
        priceHistory: updatedPriceHistory,
        lowestPrice: Math.min(
          updatedPriceHistory.map((item: DatedPrice) => Number(item.price))
        ),
        averagePrice: findAverage(updatedPriceHistory),
      };
    }

    const newProduct = await Product.findOneAndUpdate(
      {
        url: scrapedProduct.url,
      },
      product,
      { upsert: true, new: true }
    );

    revalidatePath(`/products/${newProduct._id}`);
  } catch (error: any) {
    throw new Error(`Failed to create/update product: ${error.message}`);
  }
}

export async function getProductById(productId: string) {
  try {
    connectToDB();
    const product = await Product.findOne({ _id: productId });
    if (!product) return null;

    return product;
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function getAllProducts() {
  try {
    connectToDB();

    const products = await Product.find();
    return products;
  } catch (error) {}
}

export async function addUserEmailToProduct(
  productId: string,
  userEmail: string
) {
  try {
    const product = await Product.findById(productId);

    if (!product) return;

    const index = product.users.findIndex(
      (user: User) => user.email === userEmail
    );

    if (index == -1) {
      product.users.push({ email: userEmail });

      await product.save();
      const emailContent = await generateEmailBody(product, "WELCOME");

      console.log(emailContent);
      await sendEmail(emailContent, [userEmail]);
    }
  } catch (error) {
    console.log(error);
  }
}
