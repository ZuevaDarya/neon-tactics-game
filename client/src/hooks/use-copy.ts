import copy from "copy-to-clipboard";
import { useState } from "react";

const useCopy = (timeout = 1000) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const copyToClipboard = async (text: string) => {
    if (!text.trim()) return false;

    const success = copy(text.trim());

    if (success) {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), timeout);
    }

    return success;
  };

  return {
    isCopied,
    copyToClipboard,
  };
};

export default useCopy;
