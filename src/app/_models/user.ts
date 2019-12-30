
export interface User {
    id: number;
    fullname: string;
    username: string;
    gender: string;
    age: number;
    lastActive: Date;
    city: string;
    country: string;
    profilePicLink: string;

    phoneNumber?: string;
    email?: string;
    isActivated?: boolean;
    walletAddress?: string;
    balance?: number;
}


