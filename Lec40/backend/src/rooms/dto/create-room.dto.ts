import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  username!: string;
}
