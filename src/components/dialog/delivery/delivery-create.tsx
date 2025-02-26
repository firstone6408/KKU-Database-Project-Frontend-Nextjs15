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
// import {
//   addOrUpdatePaymentMethodAction,
//   PaymentMethodType,
// } from "@/server-actions/payment-method";
// import { RemovePaymentMethodButton } from "@/components/button/payment-method";

// export function PaymentMethodAddDialog(props: {
//   btn: any;
//   paymentMethod?: PaymentMethodType;
// }) {
//   const { btn, paymentMethod } = props;
//   const pathname = usePathname();

//   return (
//     <Dialog>
//       <DialogTrigger asChild>{btn}</DialogTrigger>
//       <DialogContent className="">
//         <DialogHeader>
//           <DialogTitle>
//             <div className="flex gap-2 items-center">
//               <p>เพิ่มวิธีการชำระเงิน</p>
//               {paymentMethod && (
//                 <RemovePaymentMethodButton
//                   paymentMethodId={paymentMethod.id}
//                   btn="ลบ"
//                   name="id"
//                 />
//               )}
//             </div>
//           </DialogTitle>
//           <DialogDescription></DialogDescription>
//         </DialogHeader>
//         {/* content */}
//         <FormContainer
//           action={addOrUpdatePaymentMethodAction}
//           className="space-y-2"
//         >
//           <input type="hidden" name="pathname" defaultValue={pathname} />
//           <input
//             type="hidden"
//             name="id"
//             defaultValue={paymentMethod?.id}
//           />
//           <FormInput
//             label="ชื่อ"
//             name="name"
//             required
//             defaultValue={paymentMethod?.name}
//           />
//           <DialogFooter>
//             <FormButton btnText="บันทึก" />
//           </DialogFooter>
//         </FormContainer>
//         {/* end content */}
//       </DialogContent>
//     </Dialog>
//   );
// }
