import { Body, Container, Head, Heading, Html, Img, Preview, Section, Tailwind, Text } from '@react-email/components';
import * as React from 'react';

interface ForgotPasswordProps {
  name: string;
  otp: string;
}

export const ForgotPassword = ({ name, otp }: ForgotPasswordProps) => {
  return (
    <Html>
      <Head />
      <Preview>Verifikasi permintaan lupa kata sandi!</Preview>
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
              <Text>
                Kamu baru saja melakukan permintaan untuk mengatur ulang kata sandi akun kamu. Jika ini memang kamu,
                masukkan kode OTP berikut ini:
              </Text>
              <Heading as='h3' className='text-indigo-700 text-3xl text-center tracking-widest'>
                {otp}
              </Heading>
              <Text>
                Jika kamu tidak melakukan permintaan ini, abaikan saja email ini. Jangan berikan kode OTP ini kepada
                siapapun.
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

ForgotPassword.PreviewProps = {
  name: 'Evandra Radhitya Asmara',
  otp: '123456',
} satisfies ForgotPasswordProps;

export default ForgotPassword;
