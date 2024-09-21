export interface IFindResult<T> {
    items: T[];
    page: number;
    pageSize: number;
    totalItems: number;   
}

export interface IOperationResult<T> {
    success: boolean;
    error?: string;
    data: T | null;
}