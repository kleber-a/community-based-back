import { IsDateString, IsEmail, IsOptional, IsString } from 'class-validator';

export class PeopleDto {
  @IsString()
  name!: string;

  @IsDateString()
  dateOfBirth!: string;

  @IsString()
  phoneNumber!: string;

  @IsEmail()
  email!: string;

  @IsString()
  address!: string;

  @IsString()
  neighborhood!: string;

  @IsString()
  city!: string;

  @IsString()
  state!: string;

  @IsString()
  country!: string;

  @IsString()
  zipCode!: string;

  @IsOptional()
  @IsString()
  pollingPlace?: string;

  @IsOptional()
  @IsString()
  voterCardNumber?: string;

  @IsOptional()
  @IsString()
  zone?: string;

  @IsOptional()
  @IsString()
  section?: string;

  @IsOptional()
  @IsString()
  coordinator?: string;

  @IsOptional()
  @IsString()
  instagram?: string;

  @IsOptional()
  @IsString()
  facebook?: string;

  @IsOptional()
  @IsString()
  observations?: string;
}





// export class PeopleDto {
//   id!: string;
//   name!: string;
//   dateOfBirth!: Date;
//   phoneNumber!: string;
//   email!: string;
//   address!: string;
//   neighborhood!: string;
//   city!: string;
//   state!: string;
//   country!: string;
//   zipCode!: string;
//   pollingPlace!: string;
//   voterCardNumber!: string;
//   zone!: string;
//   section!: string;
//   coordinator!: string;
//   instagram!: string;
//   facebook!: string;
//   observations!: string;
// }



// import { IsDateString, IsEmail, IsOptional, IsString } from 'class-validator';

// export class CreatePeopleDto {
//   @IsString()
//   name!: string;

//   @IsDateString()
//   dateOfBirth!: string;

//   @IsString()
//   phoneNumber!: string;

//   @IsEmail()
//   email!: string;

//   @IsString()
//   address!: string;

//   @IsString()
//   neighborhood!: string;

//   @IsString()
//   city!: string;

//   @IsString()
//   state!: string;

//   @IsString()
//   country!: string;

//   @IsString()
//   zipCode!: string;

//   @IsOptional()
//   @IsString()
//   pollingPlace?: string;

//   @IsOptional()
//   @IsString()
//   voterCardNumber?: string;

//   @IsOptional()
//   @IsString()
//   zone?: string;

//   @IsOptional()
//   @IsString()
//   section?: string;

//   @IsOptional()
//   @IsString()
//   coordinator?: string;

//   @IsOptional()
//   @IsString()
//   instagram?: string;

//   @IsOptional()
//   @IsString()
//   facebook?: string;

//   @IsOptional()
//   @IsString()
//   observations?: string;
// }
