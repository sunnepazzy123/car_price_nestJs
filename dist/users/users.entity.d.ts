export declare class User {
    id: number;
    email: string;
    password: string;
    beforeInsert(): void;
    logInsert(): void;
    logUpdate(): void;
    logDelete(): void;
}
