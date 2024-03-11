"use client";

import React, { Fragment, useState, FormEvent } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { addUserEmailToProduct } from "@/lib/actions";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";
import { MdOutlineMail } from "react-icons/md";

interface Props {
  productId: string;
}

const Modal = ({ productId }: Props) => {
  let [isOpen, setIsOpen] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    addUserEmailToProduct(productId, email);

    setIsSubmitting(false);
    setEmail("");
    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className="btn bg-secondary"
        onClick={() => setIsOpen(true)}
      >
        Track
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          onClose={() => setIsOpen(false)}
          className="dialog-container"
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            ></span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="dialog-content">
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <div className=" border border-gray-200 rounded-10">
                      <Link href="/" className="flex items-center gap-1">
                        <div className="absolute top-0 h-16 bg-red-700 pr-4 flex flex-col justify-end">
                          <p className="text-[15px] font-spaceGrotesk text-white font-bold leading-[18px]">
                            Red
                          </p>
                          <p className="text-[15px] font-spaceGrotesk text-white font-bold leading-[18px]">
                            Stride
                          </p>
                        </div>
                      </Link>
                    </div>

                    <div onClick={() => setIsOpen(false)}>
                      <IoMdClose
                        width={40}
                        height={40}
                        className="cursor-pointer"
                      />
                    </div>
                  </div>

                  <h4 className="dialog-head_text pt-6">
                    Stay updated with product pricing alerts right in your
                    inbox!
                  </h4>

                  <p className="text-sm text-gray-600 mt-2">
                    Never miss a bargain again with our timely alerts!
                  </p>
                </div>

                <form className="flex flex-col mt-5" onSubmit={handleSubmit}>
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="dialog-input_container">
                    <MdOutlineMail width={20} height={20} />

                    <input
                      required
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="dialog-input"
                    />
                  </div>

                  <button type="submit" className="dialog-btn">
                    {isSubmitting ? "Submitting..." : "Track"}
                  </button>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
