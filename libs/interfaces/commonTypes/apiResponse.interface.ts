export declare namespace ApiResponse
{
    interface ApiResponseType 
    {
        data: any,
        statusCode: number,
        message: string,
        extraError?: any,
        extraMessage?: any,
        success?: boolean,
        draw?: number,
        recordsTotal?: number,
        recordsFiltered?: number,
    
    }

    interface ApiOK
    {
        data?: any,
        statusCode?: number,
        message: string,
        extraMessage?: any
        success?: boolean
        draw?: number,
        recordsTotal?: number,
        recordsFiltered?: number,
    }

    interface ApiErrorType extends Error
    {
        statusCode: number,
        message: string,
        extraError?: any
        stack?: string;
        draw?: number,
        recordsTotal?: number,
        recordsFiltered?: number,
    }
}