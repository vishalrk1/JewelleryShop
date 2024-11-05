"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Modal from "./modals";

interface AlertModalProps {
  description?: string;
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
  loading: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  description,
  isOpen,
  onConfirm,
  onClose,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title="Are You Sure?"
      description={description ? description : "This changes cannot be undone"}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={loading} variant="destructive" onClick={onConfirm}>
          Continue
        </Button>
      </div>
    </Modal>
  );
};
