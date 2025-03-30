import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, Min} from 'class-validator';

//Domain
import {ErrorCode} from '@Domain/constants';

export class CreateProductParamDto {
    @IsNotEmpty({message: ErrorCode.V001})
    @IsString({message: ErrorCode.V001})
    @ApiProperty({required: true})
    name: string;

    @IsNotEmpty({message: ErrorCode.V005})
    @IsString({message: ErrorCode.V006})
    @ApiProperty({required: true})
    code: string;

    @IsNotEmpty({message: ErrorCode.V031})
    @IsNumber({}, {message: ErrorCode.V032})
    @Min(0, {message: ErrorCode.V035})
    @ApiProperty({required: true})
    price: number;

    @IsNotEmpty({message: ErrorCode.V033})
    @IsNumber({}, {message: ErrorCode.V034})
    @Min(0, {message: ErrorCode.V036})
    @ApiProperty({required: true})
    salesPrice: number;

    @IsOptional()
    @ApiPropertyOptional({type: [Number]})
    @IsArray({message: ErrorCode.V027})
    @IsNumber({}, {each: true, message: ErrorCode.V039})
    featureIds: number[];

    @IsOptional()
    @IsNumber({}, {message: ErrorCode.V029})
    @ApiPropertyOptional()
    movementId: number;

    @IsOptional()
    @IsNumber({}, {message: ErrorCode.V050})
    @ApiPropertyOptional()
    brandId: number;

    @IsOptional()
    @IsNumber({}, {message: ErrorCode.V030})
    @ApiPropertyOptional()
    marketSegmentId: number;

    @IsOptional()
    @IsNumber({}, {message: ErrorCode.V041})
    @ApiPropertyOptional()
    sizeId: number;

    @IsOptional()
    @IsNumber({}, {message: ErrorCode.V029})
    @ApiPropertyOptional()
    genderId: number;

    @IsOptional()
    @IsNumber({}, {message: ErrorCode.V008})
    @ApiPropertyOptional()
    imageId: number;
}
