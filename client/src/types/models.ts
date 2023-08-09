export type Hour = {
    id: string;
    day: number;
    start_time: string;
    end_time: string;
    ordered: string;
};

export type User = {
    id: string;
    isVerified: boolean;
    email: string;
    phone: string;
    date_of_birth: Date;
    firstname: string;
    lastname: string;
    orders: Order[];
};

export type Order = {
    id?: string;
    dateStr: string;
    allergy: string;
    frequency: string;
    cleaning: string;
    address: string;
    hourId: string;
};
