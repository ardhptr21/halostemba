import { IsNotEmpty, IsString } from 'class-validator';

export class SearchQueryHashtagDto {
  @IsString()
  @IsNotEmpty()
  q: string;
}
