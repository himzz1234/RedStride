import Product from "@/lib/models/product.model";
import { connectToDB } from "@/lib/mongoose";
import { generateEmailBody, sendEmail } from "@/lib/nodemailer";
import { scrapeAmazonProduct } from "@/lib/scraper";
import { findAverage, getEmailNotifType } from "@/lib/utils";
import { DatedPrice } from "@/types";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    connectToDB();

    const products = await Product.find({});

    if (!products) throw new Error("No products found");

    const updatedProducts = await Promise.all(
      products.map(async (currProduct) => {
        const scrapedProduct = await scrapeAmazonProduct(currProduct.url);

        if (!scrapedProduct) throw new Error("No product found!");

        const updatedPriceHistory: any = [
          ...currProduct.priceHistory,
          { price: scrapedProduct.currentPrice },
        ];

        const product = {
          ...scrapedProduct,
          priceHistory: updatedPriceHistory,
          lowestPrice: Math.min(
            ...updatedPriceHistory.map((item: DatedPrice) => Number(item.price))
          ),
          averagePrice: findAverage(updatedPriceHistory),
        };

        const updatedProduct = await Product.findOneAndUpdate(
          {
            url: scrapedProduct.url,
          },
          product
        );

        const emailNotifType = getEmailNotifType(scrapedProduct, currProduct);
        if (emailNotifType && updatedProduct.users.length > 0) {
          const productInfo = {
            name: updatedProduct.name,
            url: updatedProduct.url,
          };

          const emailContent = await generateEmailBody(
            productInfo,
            emailNotifType
          );
          const userEmails = updatedProduct.users.map(
            (user: any) => user.email
          );

          await sendEmail(emailContent, userEmails);
        }

        return updatedProduct;
      })
    );

    return NextResponse.json({
      message: "OK",
    });
  } catch (error) {
    throw new Error(`Error in GET:${error}`);
  }
}
