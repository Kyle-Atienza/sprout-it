import React from "react";
import { SideNavBar, TopNavBar } from "../components";
import { Disclosure } from "@headlessui/react";
import { UpOutlined } from "@ant-design/icons";

export const Help = () => {
  return (
    <>
      <div className='flex flex-row w-screen'>
        <div className='w-0 lg:w-1/6'>
          <SideNavBar />
        </div>

        <div className='flex flex-col w-full lg:w-5/6'>
          <div className='w-full'>
            <TopNavBar pageName='Help & FAQs' />
          </div>

          <div className='w-full my-4 py-4 px-4 md:px-6 lg:px-9'>
            <h1 className='poppins-heading-4 text-primary-600 text-center my-8'>
              Frequently Asked Questions
            </h1>
            <div className='full flex flex-col items-center'>
              <div className='w-full lg:w-3/4'>
                <div>
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className='flex mt-4 w-full transition-all justify-between rounded-lg bg-secondary-100 p-4 text-left text-sm font-medium text-secondary-600 hover:bg-secondary-200 focus:outline-none focus-visible:ring focus-visible:ring-accent-400 focus-visible:ring-opacity-75'>
                          <h2 className='open-heading-6'>
                            How do I start a new production?
                          </h2>

                          <UpOutlined
                            className={`${
                              open ? "rotate-180 transform" : ""
                            } h-5 w-5 text-secondary-600 text-xl leading-none flex justify-center items-center`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className='p-4 transition-all open-paragraph-sm text-dark-700 bg-light-100 shadow rounded-lg'>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat.
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className='flex mt-4 w-full transition-all justify-between rounded-lg bg-secondary-100 p-4 text-left text-sm font-medium text-secondary-600 hover:bg-secondary-200 focus:outline-none focus-visible:ring focus-visible:ring-accent-400 focus-visible:ring-opacity-75'>
                          <h2 className='open-heading-6'>
                            How do I move from one production phase to the next?
                          </h2>

                          <UpOutlined
                            className={`${
                              open ? "rotate-180 transform" : ""
                            } h-5 w-5 text-secondary-600 text-xl leading-none flex justify-center items-center`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className='p-4 transition-all open-paragraph-sm text-dark-700 bg-light-100 shadow rounded-lg'>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat.
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className='flex mt-4 w-full transition-all justify-between rounded-lg bg-secondary-100 p-4 text-left text-sm font-medium text-secondary-600 hover:bg-secondary-200 focus:outline-none focus-visible:ring focus-visible:ring-accent-400 focus-visible:ring-opacity-75'>
                          <h2 className='open-heading-6'>
                            A batch is a the end of the production phase. How do
                            I finish the production process?
                          </h2>

                          <UpOutlined
                            className={`${
                              open ? "rotate-180 transform" : ""
                            } h-5 w-5 text-secondary-600 text-xl leading-none flex justify-center items-center`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className='p-4 transition-all open-paragraph-sm text-dark-700 bg-light-100 shadow rounded-lg'>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat.
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className='flex mt-4 w-full transition-all justify-between rounded-lg bg-secondary-100 p-4 text-left text-sm font-medium text-secondary-600 hover:bg-secondary-200 focus:outline-none focus-visible:ring focus-visible:ring-accent-400 focus-visible:ring-opacity-75'>
                          <h2 className='open-heading-6'>
                            How do I stop a production batch?
                          </h2>

                          <UpOutlined
                            className={`${
                              open ? "rotate-180 transform" : ""
                            } h-5 w-5 text-secondary-600 text-xl leading-none flex justify-center items-center`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className='p-4 transition-all open-paragraph-sm text-dark-700 bg-light-100 shadow rounded-lg'>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat.
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </div>

                <div className='mt-14'>
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className='flex mt-4 w-full transition-all justify-between rounded-lg bg-secondary-100 p-4 text-left text-sm font-medium text-secondary-600 hover:bg-secondary-200 focus:outline-none focus-visible:ring focus-visible:ring-accent-400 focus-visible:ring-opacity-75'>
                          <h2 className='open-heading-6'>
                            There's a new worker in the farm. How can he access
                            Sprout It?
                          </h2>

                          <UpOutlined
                            className={`${
                              open ? "rotate-180 transform" : ""
                            } h-5 w-5 text-secondary-600 text-xl leading-none flex justify-center items-center`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className='p-4 transition-all open-paragraph-sm text-dark-700 bg-light-100 shadow rounded-lg'>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat.
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className='flex mt-4 w-full transition-all justify-between rounded-lg bg-secondary-100 p-4 text-left text-sm font-medium text-secondary-600 hover:bg-secondary-200 focus:outline-none focus-visible:ring focus-visible:ring-accent-400 focus-visible:ring-opacity-75'>
                          <h2 className='open-heading-6'>
                            What's the difference between the 'Owner' and 'Worker' user roles?
                          </h2>

                          <UpOutlined
                            className={`${
                              open ? "rotate-180 transform" : ""
                            } h-5 w-5 text-secondary-600 text-xl leading-none flex justify-center items-center`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className='p-4 transition-all open-paragraph-sm text-dark-700 bg-light-100 shadow rounded-lg'>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat.
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className='flex mt-4 w-full transition-all justify-between rounded-lg bg-secondary-100 p-4 text-left text-sm font-medium text-secondary-600 hover:bg-secondary-200 focus:outline-none focus-visible:ring focus-visible:ring-accent-400 focus-visible:ring-opacity-75'>
                          <h2 className='open-heading-6'>
                            I forgot my password. How can I reset it?
                          </h2>

                          <UpOutlined
                            className={`${
                              open ? "rotate-180 transform" : ""
                            } h-5 w-5 text-secondary-600 text-xl leading-none flex justify-center items-center`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className='p-4 transition-all open-paragraph-sm text-dark-700 bg-light-100 shadow rounded-lg'>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat.
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
