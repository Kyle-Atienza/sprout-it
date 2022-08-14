import React from "react";
import { SideNavBar, TopNavBar, ProductionCard, WeeklyTaskCard } from "../components";
import { Images } from '../core';

export const Production = () => {
  return (
    <>
      <div className='flex flex-row w-screen'>
        <SideNavBar />
        <div className='flex flex-col w-full lg:w-5/6'>
          <div className='w-full'>
            <TopNavBar pageName='Production' />
          </div>

          <div className='my-4 py-4 px-4 md:px-6 lg:px-9 overflow-x-scroll scrollbar'>
            <section className='w-max flex flex-row space-x-4 pt-4'>
              <div className='w-80 text-center'>
                <h2 className='poppins-heading-6 text-seconday-400 mb-4'>
                  Composting
                </h2>
                <ProductionCard
                  onClick=''
                  className=''
                  batchNumber='Batch 1'
                  description='Lorem ipsum dolor sit amet consectetur'
                  daysLeft='2'
                />
                <ProductionCard
                  onClick=''
                  className=''
                  batchNumber='Batch 1'
                  description='Lorem ipsum dolor sit amet consectetur'
                  daysLeft='2'
                />
                <ProductionCard
                  onClick=''
                  className=''
                  batchNumber='Batch 1'
                  description='Lorem ipsum dolor sit amet consectetur'
                  daysLeft='2'
                />
              </div>
              <div className='w-80 text-center'>
                <h2 className='poppins-heading-6 text-seconday-400 mb-4'>
                  Bagging
                </h2>
                <ProductionCard
                  onClick=''
                  className=''
                  batchNumber='Batch 1'
                  description='Lorem ipsum dolor sit amet consectetur'
                  daysLeft='2'
                />
              </div>
              <div className='w-80 text-center'>
                <h2 className='poppins-heading-6 text-seconday-400 mb-4'>
                  Sterilization
                </h2>
                <ProductionCard
                  onClick=''
                  className=''
                  batchNumber='Batch 1'
                  description='Lorem ipsum dolor sit amet consectetur'
                  daysLeft='2'
                />
                <ProductionCard
                  onClick=''
                  className=''
                  batchNumber='Batch 1'
                  description='Lorem ipsum dolor sit amet consectetur'
                  daysLeft='2'
                />
              </div>
              <div className='w-80 text-center'>
                <h2 className='poppins-heading-6 text-seconday-400 mb-4'>
                  Inoculation
                </h2>
                <ProductionCard
                  onClick=''
                  className=''
                  batchNumber='Batch 1'
                  description='Lorem ipsum dolor sit amet consectetur'
                  daysLeft='2'
                />
              </div>
              <div className='w-80 text-center'>
                <h2 className='poppins-heading-6 text-seconday-400 mb-4'>
                  Fruiting
                </h2>
                <ProductionCard
                  onClick=''
                  className=''
                  batchNumber='Batch 1'
                  description='Lorem ipsum dolor sit amet consectetur'
                  daysLeft='2'
                />
              </div>
            </section>
          </div>
          <div className='w-full my-4 py-4 px-4 md:px-6 lg:px-9'>
            <section className='w-full lg:w-1/2 flex flex-col lg:flex-row'>
              <div className='w-full text-left'>
                <h2 className='poppins-heading-6 text-seconday-400 mb-4'>
                  Weekly Tasks
                </h2>
                <WeeklyTaskCard
                  onClick=''
                  className=''
                  task='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'
                  batch='2'
                  phase='Composting'
                  day='Mon'
                  image={Images.Composting}
                />
                <WeeklyTaskCard
                  onClick=''
                  className=''
                  task='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'
                  batch='1'
                  phase='Composting'
                  day='Wed'
                  image={Images.Bagging}
                />
              </div>
            </section>
            <section className='w-full lg:w-1/2 flex flex-col lg:flex-row'></section>
          </div>
        </div>
      </div>
    </>
  );
};
