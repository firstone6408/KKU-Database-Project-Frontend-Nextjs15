/** @format */

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { OrderType } from "@/server-actions/order";
import { urlConfig } from "@/configs/url.config";
import { productUtils } from "@/utils/product.utils";
import { ProductUnitType } from "@/configs/enum.config";

type ReportTotalCardProps = {
  reports: OrderType[];
};

export default function ReportTotalCard({
  reports,
}: ReportTotalCardProps) {
  const totalPrice = reports.reduce(
    (sum, report) => sum + (report.totalPrice ?? 0),
    0
  );

  const salesSummary: Record<
    string,
    {
      categoryName: string;
      productId: string;
      productName: string;
      size: string;
      model: string;
      image: string;
      unit: ProductUnitType;
      totalSold: number;
      totalRevenue: number;
    }
  > = {};

  reports.forEach((report) => {
    report.StockOutHistory.forEach((history) => {
      const { id, name, size, model, image, category, unit } =
        history.product;
      const totalRevenue = history.sellPrice * history.quantity;

      if (!salesSummary[id]) {
        salesSummary[id] = {
          categoryName: category.name,
          productId: id,
          productName: name,
          size: size ?? "",
          model: model ?? "",
          image: image ?? "",
          unit: unit,
          totalSold: 0,
          totalRevenue: 0,
        };
      }

      salesSummary[id].totalSold += history.quantity;
      salesSummary[id].totalRevenue += totalRevenue;
    });
  });

  const sortedSales = Object.values(salesSummary).sort(
    (a, b) => b.totalRevenue - a.totalRevenue
  );

  //console.log(sortedSales);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="space-x-2">
          <span>รายงานยอดขาย</span>
          <span>{totalPrice.toLocaleString()} บาท</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <section className=" grid grid-cols-3 gap-2">
          {sortedSales.slice(0, 3).map((item, index) => {
            return (
              <Card
                key={item.productId}
                className="flex flex-col rounded-lg"
              >
                <CardHeader>
                  <CardTitle>อันดับ {index + 1}</CardTitle>
                  <CardDescription className="flex gap-2">
                    <p>
                      ขายไปทั้งหมด {item.totalSold.toLocaleString()}{" "}
                      {productUtils.productUnitFormatter(item.unit)}
                    </p>
                    <p>ยอดขาย {item.totalRevenue.toLocaleString()} บาท</p>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center gap-2">
                  <Image
                    src={urlConfig.showImage(item.image)}
                    width={50}
                    height={50}
                    alt=""
                  />
                  <p>
                    {productUtils.productNameFormatter({
                      categoryName: item.categoryName,
                      name: item.productName,
                      size: item.size,
                      model: item.model,
                      unit: item.unit,
                    })}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </section>
      </CardContent>
    </Card>
  );
}
