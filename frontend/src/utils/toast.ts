import { toaster } from "../components/ui/toaster";

type ToastOptions = {
    title: string;
    description?: string;
};

export function showSuccessToast({ title, description }: ToastOptions) {
    toaster.create({
        type: "success",
        title,
        description,
        closable: true,
    });
}

export function showErrorToast({ title, description }: ToastOptions) {
    toaster.create({
        type: "error",
        title,
        description,
        closable: true,
    });
}

export function showInfoToast({ title, description }: ToastOptions) {
    toaster.create({
        type: "info",
        title,
        description,
        closable: true,
    });
}