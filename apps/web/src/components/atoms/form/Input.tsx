import { Box, Text, TextFieldInput, TextFieldRoot } from "@radix-ui/themes";
import { TextFieldInputProps } from "node_modules/@radix-ui/themes/dist/esm/components/text-field";
import { ForwardedRef, forwardRef } from "react";

interface InputProps extends TextFieldInputProps {
  label: string;
  id: string;
  error?: string;
  box?: string;
}

export default forwardRef(function Input(
  { id, label, error, box, ...props }: InputProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  return (
    <Box className={box}>
      <Text as="label" htmlFor={id} mb="2" className="block">
        {label}
      </Text>
      <TextFieldRoot size="3" className="flex">
        <TextFieldInput id={id} {...props} ref={ref} />
      </TextFieldRoot>
      {!!error && (
        <Text as="p" size="1" mt="1" className="text-red-500">
          {error}
        </Text>
      )}
    </Box>
  );
});
