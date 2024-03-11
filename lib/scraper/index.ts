import axios from "axios";
import * as cheerio from "cheerio";
import { extractPrice, extractCurrency } from "../utils";

export async function scrapeAmazonProduct(url: string) {
  if (!url) return;

  const username = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRGHT_DATA_PASSWORD);
  const port = 22225;
  const session_id = (1000000 * Math.random()) | 0;

  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password,
    },
    host: "brd.superproxy.io",
    port,
    rejectUnauthorized: false,
  };

  try {
    const response = await axios.get(url, options);
    const $ = cheerio.load(response.data);

    const title = $("#pdp_product_title").text().trim();
    const currentPrice = Number(
      extractPrice($('div[data-test="product-price-reduced"]'))
    );

    const originalPrice = Number(
      extractPrice($('div[data-test="product-price"]'))
    );
    const heroImage = $("#pdp-6-up img:first")
      .attr("src")
      ?.replace("PDP_LOADING_v1", "PDP_1728_v1");

    const currency = extractCurrency($('div[data-test="product-price"]'));
    const desc = $(".description-preview p").text().trim();

    const details = [
      $("li.description-preview__color-description").text().trim(),
      $("li.description-preview__style-color").text().trim(),
    ];

    console.log(typeof originalPrice, typeof currentPrice);
    const data = {
      name: title,
      url,
      currentPrice: currentPrice || originalPrice,
      originalPrice,
      heroImage,
      currency: String(currency),
      reviewsCount: 0,
      desc,
      details: details.join("\n"),
      lowestPrice: currentPrice || originalPrice,
      averagePrice: originalPrice || currentPrice,
    };

    console.log(data);

    return data;
  } catch (error: any) {
    throw new Error(`Failed to scrape product: ${error.message}`);
  }
}
