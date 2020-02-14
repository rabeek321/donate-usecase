export interface LoginReq {
        mobileNumber: string;
        password: string;
}

export interface LoginRes {
        statusCode: number;
        adminName: string;
}

export interface CategoriesRes {
        statusCode: number;
        categoryDetails: CategoryDetails[];
}

export interface CategoryDetails {
        categoryId: number;
        categoryName: string;
        selected: boolean;
}

export interface SchemeRes {
        statusCode: number;
        schemeDetails: SchemeDetails[];
}

export interface SchemeDetails {
        schemeId: number;
        schemeName: string;
        amount: number;
        description: string;
        contributors: number;
        taxBenefit: string;
}

export interface DonateReq {
        userName: string;
        email: string;
        mobileNo: string;
        panNo: string;
        schemeId: number;
}

export interface DonateReq {
        statusCode: number;
        donationId: number;
}

export interface Response {
        statusCode: number;
}


export interface ContributorsReq {
        statusCode: number;
        contributorDetails: ContributorDetails[];
}

export interface ContributorDetails {
        userName: string;
        mobileNo: string;
        email: string;
        panNumber: string;
}

