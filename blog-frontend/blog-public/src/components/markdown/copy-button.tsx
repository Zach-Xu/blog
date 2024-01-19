import { CheckIcon, ClipboardIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const CopyButton = ({ id }: { id: string }) => {
    const [copied, setCopited] = useState(false);

    const onCopy = async () => {
        try {
            setCopited(true);
            const text = document.getElementById(id)!.innerText;
            await navigator.clipboard.writeText(text);
            setTimeout(() => {
                setCopited(false);
            }, 1000);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <button
            onClick={onCopy}
            className="inline-flex rounded-md p-2 hover:bg-gradient-pink hover:text-black"
        >
            <ClipboardIcon
                className={`transition-all w-4
        ${copied ? "scale-0" : "scale-100"}
      `}
            />
            <CheckIcon className={`w-4 absolute transition-all ${copied ? "scale-100" : "scale-0"
                }`}
            />
        </button>
    );
};

export default CopyButton;
