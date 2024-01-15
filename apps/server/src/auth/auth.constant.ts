console.log('process.env.JWT_SECRET', process.env.MAIL_HOST);

export const jwtConstant = {
  secret: process.env.JWT_SECRET,
  expiresIn: '3d',
};
