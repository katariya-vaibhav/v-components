"use server"

import { NextRequest } from "next/server";

interface ReviewProps{
    rating: number;
    comment: string;
    userId: string;
}

export async function name(request:NextRequest) {
    const { rating , comment } : ReviewProps = await request.json();
    console.log(rating , comment);
    
}