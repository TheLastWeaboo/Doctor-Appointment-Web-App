import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin } from 'lucide-react';
import moment from 'moment/moment';
import React from 'react';
import CancelAppointment from './CancelAppointment';
import GlobalApi from '@/app/_utils/GlobalApi';
import { toast } from 'sonner';

function BookingList({ bookingList,expired,updateRecord }) {
  
  const onDeleteBooking=(item)=>{
    console.log(item)
    GlobalApi.deleteBooking(item.id).then(resp=>{
      console.log(resp);
      if(resp)
        {
          toast('Booking Deleted Successfuly');
          updateRecord()
        }
    })
  }
  return (
    <div>
      {Array.isArray(bookingList) && bookingList.map((item, index) => (
        <div key={index} className='flex gap-4 items-center border
        p-3 m-3 rounded-lg'>
          <div className='flex flex-col gap-2 w-full'>
            <h2 className='font-bold text-[18px] flex justify-between items-center'>{item.attributes.doctor.data.attributes.Name}
              {!expired&&<CancelAppointment onContinueClick={()=>onDeleteBooking(item)}/>}
            </h2>
            <h2 className='flex gap-2 text-gray-500'><MapPin className='text-primary h-5 w-5'/>{item.attributes.doctor.data.attributes.Address}</h2>
            <h2 className='flex gap-2'><Calendar className='text-primary h-5 w-5'/> Appointment On: {moment(item.attributes.Date).format('DD-MM-YYYY')}</h2>
            <h2 className='flex gap-2'><Clock className='text-primary h-5 w-5'/> At: {item.attributes.Time}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookingList;
