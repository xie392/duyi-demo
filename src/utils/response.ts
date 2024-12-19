import { NextResponse } from 'next/server'

export class GlobalResponse {
    public static success<T = any>(data: T): NextResponse<ResponseData> {
        return NextResponse.json({
            code: 200,
            data,
            msg: 'success'
        })
    }

    public static error(message: string): NextResponse<ResponseData> {
        return NextResponse.json({
            code: 500,
            data: null,
            msg: message
        })
    }
}
