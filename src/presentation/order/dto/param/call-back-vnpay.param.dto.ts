import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional } from "class-validator";

export class ReturnQueryFromVNPay {
 @IsOptional()
 @ApiPropertyOptional()
  @Type(() => Number)
  vnp_Amount: number;

 @ApiPropertyOptional()
  @IsOptional()
    vnp_BankCode: string;

   @ApiPropertyOptional()
    @IsOptional()
    vnp_BankTranNo: string;

   @ApiPropertyOptional()
    @IsOptional()
    vnp_CardType: string;

   @ApiPropertyOptional()
    @IsOptional()
    vnp_OrderInfo: string;

   @ApiPropertyOptional()
    @IsOptional()
    vnp_PayDate: string;

   @ApiPropertyOptional()
    @IsOptional()
    vnp_ResponseCode: string;

   @ApiPropertyOptional()
    @IsOptional()
    vnp_TmnCode: string;

   @ApiPropertyOptional()
    @IsOptional()
    vnp_TransactionNo: string;

   @ApiPropertyOptional()
    @IsOptional()
    vnp_TransactionStatus: string;

   @ApiPropertyOptional()
    @IsOptional()
    vnp_TxnRef: string;

   @ApiPropertyOptional()
    @IsOptional()
    vnp_SecureHash: string;
  }
  