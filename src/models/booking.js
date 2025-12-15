import { Schema, model } from "mongoose";

const bookingSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },

    toolId: { type: Schema.Types.ObjectId, ref: "Tool", required: true },

    firstName: { type: String, required: true },
    lastName: { type: String, required: true },

    phone: { type: String, required: true },
   deliveryCity: { type: String, required: true },
    deliveryBranch: { type: String, required: true },

    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  
  },
  { timestamps: true,  versionKey: false, }
);
export const Booking = model("Booking", bookingSchema);


