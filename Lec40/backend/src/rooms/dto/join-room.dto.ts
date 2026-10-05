import { IsString, IsNotEmpty, MinLength, MaxLength, Matches } from 'class-validator';

export class JoinRoomDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-HJ-NP-Z2-9]{6}$/, {
    message: 'Code must be 6 uppercase alphanumeric characters (no 0, O, 1, I)',
  })
  code!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  username!: string;
}
