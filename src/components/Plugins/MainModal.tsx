"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";

import React from "react";
import { Image } from "@nextui-org/image";
import { ScrollShadow } from "@nextui-org/scroll-shadow";

interface modalProps {
  children: React.ReactElement;
  title?: string;
  action: string;
  size?:
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "full"
    | "xs"
    | "3xl"
    | "4xl"
    | "5xl";
}

const MainModal: React.FC<modalProps> = ({ children, action, title, size }) => {
  const { isOpen, onOpen, onOpenChange,onClose } = useDisclosure();

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-xs">
      <Button
        onPress={onOpen}
        className="w-full h-16 mx-2 text-lg font-semibold uppercase shadow-sm text-foreground bg-background hover:shadow-inner"
        variant={"bordered"}
        size={"lg"}
      >
        {action}
      </Button>
      <Modal
        size={size ? size : "md"}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop={"blur"}
        className="z-50 bg-background"
      >
        <ModalContent className="max-h-screen z-[1000]">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody className="flex items-center max-h-full overflow-x-hidden overflow-y-auto">
                <ScrollShadow className=" w-full">{children}</ScrollShadow>
              </ModalBody>
            
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
export default MainModal;