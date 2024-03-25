import { CalloutRoot, CalloutText } from "@radix-ui/themes";
import {
  CustomContentProps,
  SnackbarProvider as NotistackProvider,
} from "notistack";
import { ForwardedRef, PropsWithChildren, forwardRef } from "react";

const Snackbar = forwardRef(
  (props: CustomContentProps, ref: ForwardedRef<any>) => {
    const colorVariants = {
      error: "red",
      success: "green",
      warning: "yellow",
      info: "blue",
      default: "",
    } as any;

    return (
      <CalloutRoot
        ref={ref}
        color={colorVariants[props.variant]}
        size="2"
        style={{ zIndex: 99999 }}
      >
        <CalloutText>{props.message}</CalloutText>
      </CalloutRoot>
    );
  },
);
Snackbar.displayName = "Snackbar";

export const SnackbarProvider = ({ children }: PropsWithChildren) => (
  <NotistackProvider
    anchorOrigin={{ horizontal: "center", vertical: "top" }}
    autoHideDuration={3000}
    Components={{
      success: Snackbar,
      error: Snackbar,
      warning: Snackbar,
      info: Snackbar,
      default: Snackbar,
    }}
  >
    {children}
  </NotistackProvider>
);
