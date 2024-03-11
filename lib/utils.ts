import { Product } from "@/types";

const Notification = {
  WELCOME: "WELCOME",
  CHANGE_OF_STOCK: "CHANGE_OF_STOCK",
  LOWEST_PRICE: "LOWEST_PRICE",
  THRESHOLD_MET: "THRESHOLD_MET",
};

export function extractPrice(...elements: any) {
  for (const element of elements) {
    const priceText = element.text().trim();

    if (priceText) return Number(priceText.replace(/[^\d.]/g, ""));
  }

  return "";
}

export function extractCurrency(...elements: any) {
  for (const element of elements) {
    const priceText = element.text().trim();

    if (priceText) return priceText.replace(/[^$€£¥₹]/g, "");
  }

  return "";
}

export function findAverage(priceList: any) {
  const sumOfPrices = priceList.reduce(
    (acc: Number, curr: any) => acc + curr.price,
    0
  );

  const averagePrice = sumOfPrices / priceList.length || 0;
  return averagePrice;
}

export function getEmailNotifType(
  scrapedProduct: Product,
  currentProduct: Product
) {
  const lowestPrice = Math.min(
    ...currentProduct.priceHistory.map((item) => Number(item.price))
  );

  if (scrapedProduct.currentPrice < lowestPrice) {
    return Notification.LOWEST_PRICE as keyof typeof Notification;
  }

  return null;
}
