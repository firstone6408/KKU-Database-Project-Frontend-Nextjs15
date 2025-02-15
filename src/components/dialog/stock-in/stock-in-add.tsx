/** @format */

// /** @format */

// "use client";

// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import FormContainer from "../../form/form-container";
// import { usePathname } from "next/navigation";
// import FormButton from "@/components/form/form-button";
// import FormInput from "@/components/form/form-input";
// import { addStockInHistoryAction } from "@/server-actions/stock-in-history";
// import FormImage from "@/components/form/form-image";
// import { urlConfig } from "@/configs/url.config";
// import { StockType } from "@/server-actions/stock";
// import FormTextArea from "@/components/form/form-textarea";

// export function StockInHistoryAddDialog(props: {
//   btn: any;
//   stock: StockType;
// }) {
//   const { btn, stock } = props;
//   const pathname = usePathname();

//   return (
//     <Dialog>
//       <DialogTrigger asChild>{btn}</DialogTrigger>
//       <DialogContent className="">
//         <DialogHeader>
//           <DialogTitle>เพิ่ม Stock</DialogTitle>
//           <DialogDescription></DialogDescription>
//         </DialogHeader>
//         {/* content */}
//         <FormContainer
//           action={addStockInHistoryAction}
//           className="space-y-2"
//         >
//           <div className="grid grid-cols-2 gap-2">
//             <input type="hidden" name="pathname" defaultValue={pathname} />
//             <input
//               type="hidden"
//               name="productId"
//               defaultValue={stock.product.id}
//             />
//             <FormInput
//               label="รหัส"
//               defaultValue={stock.product.productCode}
//               disabled
//             />
//             <FormInput
//               label="หมวดหมู่"
//               defaultValue={stock.product.category.name}
//               disabled
//             />
//             <FormInput
//               label="ชื่อ"
//               defaultValue={stock.product.name}
//               disabled
//               className="col-span-full"
//             />
//             <FormImage
//               label="รูปปสินค้า"
//               src={urlConfig.showImage(stock.product.image)}
//               weight={120}
//               height={120}
//               alt={stock.product.name}
//               className="row-span-2 flex flex-col items-center gap-2"
//             />
//             <FormInput
//               label="ราคาขาย (บาท)"
//               defaultValue={stock.sellPrice}
//               disabled
//             />
//             <FormInput
//               label="จำนวนคงเหลือ"
//               defaultValue={stock.product.Stock[0].quantity}
//               disabled
//             />
//             <FormInput
//               label="รหัสนำเข้า"
//               name="refCode"
//               required
//               className="col-span-full"
//             />
//             <FormInput
//               label="ราคาค้นทุน"
//               name="costPrice"
//               type="number"
//               required
//             />
//             <FormInput
//               label="จำนวน"
//               name="quantity"
//               type="number"
//               required
//             />
//             <FormTextArea
//               label="หมายเหตุ"
//               name="note"
//               className="col-span-full"
//               rows={4}
//             />
//           </div>
//           <DialogFooter>
//             <FormButton btnText="บันทึก" />
//           </DialogFooter>
//         </FormContainer>
//         {/* end content */}
//       </DialogContent>
//     </Dialog>
//   );
// }
