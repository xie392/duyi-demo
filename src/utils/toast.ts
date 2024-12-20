import toast, { type ToastOptions } from 'react-hot-toast'

export class Toast {
    public static instance = toast

    private static baseOptions: Partial<ToastOptions> = {
        duration: 3000,
        position: 'top-center',
        style: {
            borderRadius: 'var(--radius)',
            background: 'hsl(var(--background))',
            boxShadow: `
        0 3px 50px hsl(var(--foreground)/0.1),
        0 10px 20px hsl(var(--foreground)/0.1)
      `,
            color: 'hsl(var(--muted-foreground)/50)'
        }
    }

    get options() {
        return Toast.baseOptions
    }

    set options(options: Partial<ToastOptions>) {
        Toast.baseOptions = { ...Toast.baseOptions, ...options }
    }

    static success(message: string, options?: Partial<ToastOptions>) {
        toast.success(message, { ...Toast.baseOptions, ...options })
    }

    static error(message: string, options?: Partial<ToastOptions>) {
        toast.error(message, { ...Toast.baseOptions, ...options })
    }

    static loading(message: string, options?: Partial<ToastOptions>) {
        toast.loading(message, { ...Toast.baseOptions, ...options })
    }

    static dismiss(toastId?: string) {
        toast.dismiss(toastId)
    }
}
