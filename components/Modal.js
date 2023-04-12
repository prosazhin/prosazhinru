import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";

export default function Modal({ isOpen, setIsOpen, children }) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
        <Transition.Child as={Fragment} enter="ease-out duration-200" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-base-main bg-opacity-50" />
        </Transition.Child>
        <div className="fixed inset-0 h-auto w-auto overflow-y-auto">
          <div className="flex min-h-full min-w-full items-end justify-stretch text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 translate-y-[50px]"
              enterTo="opacity-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-[50px]"
            >
              <Dialog.Panel className="relative w-full transform overflow-hidden rounded-t-xl bg-white px-[24px] pb-[40px] pt-[64px] text-left align-middle shadow-xl transition-all">
                {children}
                <button
                  type="button"
                  className="absolute right-[8px] top-[8px] inline-flex h-[48px] w-[48px] items-center justify-center rounded-sm bg-white hover:bg-secondary-lighter"
                  onClick={() => setIsOpen(false)}
                >
                  <XMarkIcon className="h-[24px] w-[24px]" />
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
