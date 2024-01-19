import React from 'react';
import { FaAlignCenter, FaBed, FaParking, FaPhotoVideo, FaTaxi, FaWolfPackBattalion } from "react-icons/fa";
const WhyUs = () => {
 
    return (
        <div className='px-[250px]'>
            <div className='text-start py-8'>
                <h2 className='text-2xl  font-semibold'>Why Booking with us?</h2>
                <p>What Facilities & Services We Offer For You.</p>
            </div>
            <div className='grid grid-cols-3 gap-5'>
                <div className='flex flex-row gap-5'>
                    <FaBed className='text-7xl h-25 w-32'/>
                    <div>
                        <h4 className='text-xl font-semibold'>Delux Room</h4>
                        <p>All placges and activiates are carefully picked by us. Lorem ipsum dolor sit amet consetetur sadipscing.</p>
                    </div>
                </div>
                <div className='flex flex-row gap-5'>
                    <FaParking className='text-7xl h-25 w-32'/>
                    <div>
                        <h4 className='text-xl font-semibold'>Parking Space</h4>
                        <p>All places and activity are carefully picked by us. Lorem ipsum dolor sit amet consetetur sadipscing.</p>
                    </div>
                </div>
                <div className='flex flex-row gap-5'>
                    <FaTaxi className='text-7xl h-25 w-32'/>
                    <div>
                        <h4 className='text-xl font-semibold'>Taxis</h4>
                        <p>Best price guaranteee & Hassle free! Lorem ipsum dolor sit amet consetetur sadipscing sit amet consetetur.</p>
                    </div>
                </div>
                <div className='flex flex-row gap-5'>
                    <FaPhotoVideo className='text-7xl h-25 w-32'/>
                    <div>
                        <h4 className='text-xl font-semibold'>PhotoGrapher</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis aspernatur quae vitae, deserunt ut quia vero nobis maxime eius! Animi.</p>
                    </div>
                </div>
                <div className='flex flex-row gap-5'>
                    <FaWolfPackBattalion className='text-7xl h-25 w-32'/>
                    <div>
                        <h4 className='text-xl font-semibold'>Packages</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam dicta officia nisi nulla perferendis quas.</p>
                    </div>
                </div>
                <div className='flex flex-row gap-5'>
                    <FaAlignCenter className='text-7xl h-25 w-32'/>
                    <div>
                        <h4 className='text-xl font-semibold'>Fitness Center</h4>
                        <p>All placges and activiates are carefully picked by us. Lorem ipsum dolor sit amet consetetur sadipscing.</p>
                    </div>
                </div>
               
            </div>
            
        </div>
    );
};

export default WhyUs;