import * as React from 'react';
import { Html, Button } from "@react-email/components";
import { NextResponse } from 'next/server';
import EmailTemplate from '@/emails';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req){

    const response=await req.json()
    try {

        const data=await Resend.emails.send({
            from: 'Doctor-Appointment-Booking@thelastweaboo.infinityfreeapp.com',
            to: [response.data.Email],
            subject: 'Appointment Booking Confirmation',
            react: EmailTemplate({response})
          });
        return NextResponse.json({data})
    } catch (error) 
    {
        return NextResponse.json({error})
    }
}