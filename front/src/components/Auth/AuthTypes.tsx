export interface Registration {
    username: string;
    email: string;
    password: string;
    password_confirmation: string
}

export interface Login {
    email: string;
    password: string;
}