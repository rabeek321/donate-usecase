export interface LoginReq {
        mobileNumber: string;
        password: string;
}

export interface LoginRes {
        statusCode: number;
        doctorId: number;
        doctorName: string;
}


export interface GetSlots {
        statusCode: number;
        message: string;
        slotDetails: SlotList[];
}
export interface SlotList {        
        slotName: string;
        availablity: boolean;
}

export interface PostSlotsReq {
        slotSelected: SlotSelected[];
}

export interface SlotSelected {
        slotName: string;
}

export interface Response {
        statusCode: number;
        message: string;
}
export interface Search {
        statusCode: number;
        message: string;
        doctorDetails: DoctorDetails[];
}
export interface DoctorDetails {
        doctorId: number;
        doctorName: string;
        specialization: string;
        qualification: string;
        hospitalName: string;
}

export interface AppoinmentReq {
        patientName: string;
        patientContact: string;
        doctorId: number;
        slotName: number;
        hospitalName: string;
}
export interface PatentDetailsRes {
        statusCode: number;
        patientDetails: PatentDetails[];
}

export interface PatentDetails {
        patientName: string;
        patientContact: string;
        slotName: string;
}
