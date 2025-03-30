import {ApiPropertyOptional} from '@nestjs/swagger';
import {IsArray, IsNumber, IsOptional, IsString, Min} from 'class-validator';

//Domain
import {ErrorCode} from '@Domain/constants';

export class UpdateProductParamDto {
    @IsOptional()
    @IsString({message: ErrorCode.V001})
    @ApiPropertyOptional()
    name: string;

    @IsOptional()
    @IsString({message: ErrorCode.V006})
    @ApiPropertyOptional()
    code: string;

    @IsOptional()
    @IsNumber({}, {message: ErrorCode.V032})
    @Min(0, {message: ErrorCode.V035})
    @ApiPropertyOptional()
    price: number;

    @IsOptional()
    @IsNumber({}, {message: ErrorCode.V034})
    @Min(0, {message: ErrorCode.V036})
    @ApiPropertyOptional()
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

    @IsOptional()
    @ApiPropertyOptional({type: [Number]})
    @IsArray({message: ErrorCode.V051})
    @IsNumber({}, {each: true, message: ErrorCode.V052})
    imageIds: number[];

    @IsOptional()
    @IsNumber({}, {})
    @ApiPropertyOptional()
    brandId: number;
}
