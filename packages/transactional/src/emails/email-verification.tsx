import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface EmailVerificationProps {
  name: string;
  link: string;
}

export const EmailVerification = ({ name, link }: EmailVerificationProps) => {
  return (
    <Html>
      <Head />
      <Preview>Ayo verifikasi akun halostemba mu!</Preview>
      <Tailwind>
        <Body className='font-sans bg-white'>
          <Container className='max-w-lg mx-auto'>
            <Section className='bg-black text-center text-white px-5 w-full'>
              <Heading as='h1'>Verifikasi Email</Heading>
            </Section>
            <Section className='my-10'>
              <Img src='https://i.ibb.co/kSj80WX/logo.png' className='mx-auto' />
            </Section>
            <Section>
              <Heading as='h2'>Halo, {name} 👋</Heading>
              <Text>
                Terima kasih sudah menjadi bagian dari halostemba. Yuk verifikasi akun halostemba mu sekarang juga.
              </Text>
              <Text>Tekan tombol di bawah ini untuk melakukan verifikasi:</Text>
              <div className='flex justify-center'>
                <Button
                  href={link}
                  className='bg-indigo-700 mx-auto text-white text-lg px-5 py-3 rounded cursor-pointer font-bold'
                >
                  Verifikasi
                </Button>
              </div>
              <Text>Jika tombol di atas tidak berfungsi, kamu bisa klik atau salin link berikut ini:</Text>
              <Link href={link}>{link}</Link>
              <Text className='italic'>
                *verifikasi ini akan berakhir dalam 5 menit. Jika kamu tidak merasa melakukan verifikasi, abaikan email
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

EmailVerification.PreviewProps = {
  name: 'Evandra Radhitya Asmara',
  link: 'https://example.com/verify-email/verify?token=a4hl_tMoche8GLSUD2n26XDk4oemq1Z0',
} satisfies EmailVerificationProps;

export default EmailVerification;
