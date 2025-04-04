import {UserEntity} from '@Domain/entity';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {UserRole} from "@Domain/constants";
import {CustomerFilterDtoParam} from "@Presentation/user/dto/param";

@Injectable()
export class UserRepositoryOrm {
    constructor(
        @InjectRepository(UserEntity)
        private readonly repository: Repository<UserEntity>,
    ) {
    }

    async create(param: UserEntity) {
        return await this.repository.save(param);
    }

    async findOneById(id: number) {
        return await this.repository.findOne({
            where: {
                id: id,
            }
        });
    }

    async findOneByEmail(email: string) {
        return await this.repository.findOne({
            where: {
                email: email,
            },
        });
    }

    async findByPhoneNumber(phoneNumber: string){
        return await this.repository.findOne({
            where: {
                phoneNumber: phoneNumber,
            },
        });
    }

    async findByPhoneNumberOrEmail(identifier: string){
        return await this.repository.findOne({
            where: [
                {phoneNumber: identifier},
                {email: identifier},
            ]
        });
    }

    async checkExistsEmail(email: string){
        return await this.repository.exists({
            where: {
                email: email,
            },
        });
    }

    async checkExistsPhoneNumber(phoneNumber: string){
        return await this.repository.exists({
            where: {
                phoneNumber: phoneNumber,
            },
        });
    }

    async findOneByUsername(username: string) {
        return await this.repository.findOne({
            where: {
                username: username,
            },
        });
    }


    async findAllCustomer(param: CustomerFilterDtoParam): Promise<[UserEntity[], number]> {
        const {skip,pageSize}=param
        return await this.repository.findAndCount({
            where: {
                role: UserRole.CUSTOMER
            },
            skip: skip,
            take: pageSize
        });
    }

    async updateRefreshToken(id: number, refreshToken: string): Promise<boolean> {
        const result = await this.repository.update(id, {refreshToken});
        return result.affected !== null && result.affected > 0;
    }

    async findRefreshTokenByUserId(id: number): Promise<string> {
        const result = await this.repository.findOne({
            where: {
                id,
            },
            select: {
                refreshToken: true,
            },
        });
        return result.refreshToken;
    }

    async update(param: UserEntity): Promise<boolean> {
        var result = await this.repository.update(param.id, param);
        return result.affected !== null && result.affected > 0;
    }

    async countCustomer(): Promise<number> {
        return await this.repository.count({
            where: {
                role: UserRole.CUSTOMER,
            }
        })
    }
}
