import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

/**
 * PostModal displays a post in full size with its details.
 * Props:
 * - isOpen (boolean): whether the modal is visible
 * - onClose (function): callback when modal should close
 * - post (object): { image, title, description, ... }
 */
const PostModal = ({ isOpen, onClose, post }) => {
  if (!post) return null;

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60" />
        </Transition.Child>

        {/* Centered modal */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-[500px] rounded-md object-contain"
                />
                <h2 className="mt-6 text-2xl text-center font-semibold text-[#212121]">
                  {post.title}
                </h2>
                {post.category && (
                  <p className="text-sm text-center text-gray-500 mt-1">
                    {post.category}
                  </p>
                )}
                <p className="mt-5 text-gray-700 whitespace-pre-line">
                  {post.description}
                </p>
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 bg-[#424F38] text-[#FBFAEE] rounded-md hover:bg-[#323d2b] focus:outline-none"
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PostModal;
