export class JwtPayloadEntity {
  username: string;
  sub: string;
  iat?: number;
  exp?: number;
}
