// src/profile-settings/dto/create-profile-settings.dto.ts
import { IsNotEmpty, IsInt, Min, IsNumber } from 'class-validator';

export class CreateProfileSettingsDto {
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(1)
  age: number;

  @IsNumber()
  @Min(0.01)
  weight: number;

  @IsInt()
  @Min(1)
  growth: number;

  @IsInt()
  @Min(0)
  cups_of_water: number;

  @IsInt()
  @Min(1)
  heart_rate_max: number;

  @IsInt()
  @Min(1)
  heart_rate_min: number;
}
