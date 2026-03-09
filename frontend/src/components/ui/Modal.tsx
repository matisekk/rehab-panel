import { CloseButton, Dialog, Portal } from "@chakra-ui/react"
import type { ReactNode } from "react"

type ModalTypes = {
    children: ReactNode,
    onClose: () => void,
    isOpen: boolean,
}

const Modal = ({ children, isOpen, onClose }: ModalTypes) => {
    return (
        <Dialog.Root
            open={isOpen}
            placement={'center'}
            onOpenChange={(details) => {
                if (!details.open) {
                    onClose();
                }
            }}
        >
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        {children}
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}

export default Modal