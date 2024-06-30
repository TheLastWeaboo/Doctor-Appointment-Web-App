"use client"
import GlobalApi from '@/app/_utils/GlobalApi';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

function DoctorSuggestionList() {
    const [doctorList, setDoctorList] = useState([]); 

    useEffect(() => {
        getDoctorList();
    }, [])

    const getDoctorList = () => {
        GlobalApi.getDoctorList().then(resp => {
            console.log(resp.data.data);
            setDoctorList(resp.data.data || []);
        }).catch(error => {
            console.error("Error fetching categories: ", error);
            setDoctorList([]); 
        });
    }

  return (
    <div className='p-4 border-[1px] mt-5 md:ml-5 round-lg'>
        <h2 className='mb-3 font-bold'>Suggestion</h2>
        {doctorList.map((doctor,index)=>(
            <Link href={'/details/'+doctor.id} className='mb-4 p-3 shadow-sm w-full
            cursor-pointer hover:bg-slate-100
            rounded-lg flex items-center gap=3'>
                <Image src={doctor.attributes?.Image?.data?.attributes?.url}
                width={70}
                height={70}
                className='w-[70px] h-[70px] rounded-full object-cover'
                />
                <div className='mt-3 flex-col flex items-baseline p-3'>
                <h2 className='text-[10px] bg-blue-100 p-1 rounded-full
            px-2 text-primary'>
                {doctor.attributes?.categories.data[0].attributes?.Name}</h2>
                    <h2 className='font-medium text-sm'>{doctor.attributes?.Name}</h2>
                    <h2 className='text-primary text-sm'>{doctor.attributes?.Years_of_Experience}</h2>
                </div>
            </Link>
        ))}
    </div>
  )
}

export default DoctorSuggestionList