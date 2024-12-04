// External dependencies
import { ObjectId } from "mongodb";

// Class Implementation
export default class Parkir {
    constructor(
        public number_of_blocks: number, 
        public slot: {
            is_slot_available: boolean,
            is_reentry_allowed: boolean,
            is_valet_parking_available: boolean
        }, 
        public address: string, 
        public zip: number,
        public subscribe_company_name: string,
        public block_code: string,
        public is_block_full: boolean,
        public number: {
            floor_number: number,
            number_of_wings: number,
            number_of_slots: number
        },
        public capacity: {
            is_covered: boolean,
            is_accessible: boolean,
            is_floor_full: boolean,
            is_reserved_reg_cust: boolean
        },
        public slot_number: string,
        public wing_code: string,
        public id?: ObjectId
    ) {}
}