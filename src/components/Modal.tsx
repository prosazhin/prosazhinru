import { XMarkIcon } from '@heroicons/react/24/solid';
import { Fragment } from 'react';

import { Dialog, Transition } from '@headlessui/react';

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  children: React.ReactNode;
};

const Modal = ({ isOpen, setIsOpen, children }: Props) => {
  return (
    <Transition show={isOpen} as={Fragment} appear>
      <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-base-main/50" />
        </Transition.Child>
        <div className="fixed inset-0 w-auto h-auto overflow-y-auto">
          <div className="flex items-end min-w-full min-h-full text-center justify-stretch">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 translate-y-[50px]"
              enterTo="opacity-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-[50px]"
            >
              <Dialog.Panel className="relative w-full overflow-hidden rounded-t-xl bg-white px-[24px] pb-[40px] pt-[64px] text-left align-middle shadow-xl transition-all">
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
};

export default Modal;
