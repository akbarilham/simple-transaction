// External dependencies
import { Decimal128, ObjectId } from "mongodb";

// Class Implementation
export default class Ping {
    forms: any;
    constructor(
        public transaksi_number: string,
        public plat: {
            plat_code: string,
            plat_number: number,
            end_plat_code: string,
            plat_color: string,
        },
        public vehicle: {
            vehicle_type: string, 
            vehicle_brand: string,
        },
        public date_in: Date,
        public date_out: Date,
        public unit_price: Decimal128,
        public amount_price: Decimal128,
        public id?: ObjectId
    ) {}
}