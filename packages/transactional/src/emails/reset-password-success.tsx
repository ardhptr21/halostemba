import { Body, Container, Head, Heading, Html, Img, Preview, Section, Tailwind, Text } from '@react-email/components';
import * as React from 'react';

interface ResetPasswordSuccessProps {
  name: string;
}

export const ResetPasswordSuccess = ({ name }: ResetPasswordSuccessProps) => {
  return (
    <Html>
      <Head />
      <Preview>Kata sandi kamu telah diubah!</Preview>
      <Tailwind>
        <Body className='font-sans bg-white'>
          <Container className='max-w-lg mx-auto'>
            <Section className='bg-black text-center text-white px-5 w-full'>
              <Heading as='h1'>Lupa Kata Sandi</Heading>
            </Section>
            <Section className='my-10'>
              <Img src='https://i.ibb.co/kSj80WX/logo.png' className='mx-auto' />
            </Section>
            <Section>
              <Heading as='h2'>Halo, {name} 👋</Heading>
              <Text>Kami ingin memberitahukan bahwa kata sandi akun kamu telah berhasil diatur ulang.</Text>

              <Text>
                Jika kamu tidak melakukan perubahan ini atau membutuhkan bantuan lebih lanjut, silahkan hubungi kami.
              </Text>
            </Section>
            <Section>
              <Text>
                Salam, <br />
                Tim Layanan halostemba.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

ResetPasswordSuccess.PreviewProps = {
  name: 'Evandra Radhitya Asmara',
} satisfies ResetPasswordSuccessProps;

export default ResetPasswordSuccess;
