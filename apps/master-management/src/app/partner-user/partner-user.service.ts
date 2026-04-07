import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Like, FindManyOptions } from 'typeorm';
import { IntercertPartnerUser } from '../../../../../libs/database/src/entities/intercert-partner-user.entity';
import { CreatePartnerUserDto, UpdatePartnerUserDto, GetPartnerUserFilterDto, PartnerUserResponseDto } from '../../../../../libs/dtos/master_management/partner-user.dto';
import { IntercertPartnerUserRepository } from '../../../../../libs/database/src/repositories/intercert-partner-user.repository';
import { paginate } from '../../../../../libs/utils/basicUtils';
import { IPaginationObject } from '../../../../../libs/interfaces/commonTypes/custom.interface';

@Injectable()
export class PartnerUserService {
  constructor(
    private readonly partnerUserRepository: IntercertPartnerUserRepository,
  ) {}

  private mapToResponseDto(user: IntercertPartnerUser): PartnerUserResponseDto {
    return {
      id: user.id,
      username: user.username,
      name: user.name,
      email: user.email,
      company: user.company,
      mobile: user.mobile,
      city: user.city,
      state: user.state,
      country: user.country,
      active: user.active,
      auditorCount: user.auditorCount,
      status: user.status,
    };
  }

  async create(createDto: CreatePartnerUserDto): Promise<PartnerUserResponseDto> {
    const existingUser = await this.partnerUserRepository.findOneByEmail(createDto.email);
    if (existingUser) {
      throw new BadRequestException('Partner user with this email already exists.');
    }
    const partnerUser = await this.partnerUserRepository.create(createDto);
    return this.mapToResponseDto(partnerUser);
  }

  async findAll(filterDto: GetPartnerUserFilterDto): Promise<IPaginationObject> {
    const { page, pageSize, name, email, company, status, active } = filterDto;
    const { currentPage, limit, offset } = paginate(page, pageSize);

    const findOptions: FindManyOptions<IntercertPartnerUser> = {
      take: limit,
      skip: offset,
      where: {},
    };

    if (name) {
      findOptions.where['name'] = Like(`%${name}%`);
    }
    if (email) {
      findOptions.where['email'] = Like(`%${email}%`);
    }
    if (company) {
      findOptions.where['company'] = Like(`%${company}%`);
    }
    if (status) {
      findOptions.where['status'] = status;
    }
    if (active !== undefined) {
      findOptions.where['active'] = active;
    }

    const [users, total] = await this.partnerUserRepository.findAndCount(findOptions);

    return {
      docs: users.map(user => this.mapToResponseDto(user)),
      totalDocs: total,
      limit,
      page: currentPage,
      totalPages: Math.ceil(total / limit),
      hasNextPage: currentPage * limit < total,
      hasPrevPage: currentPage > 1,
    };
  }

  async findOne(id: number): Promise<PartnerUserResponseDto> {
    const user = await this.partnerUserRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`Partner user with ID ${id} not found.`);
    }
    return this.mapToResponseDto(user);
  }

  async update(id: number, updateDto: UpdatePartnerUserDto): Promise<PartnerUserResponseDto> {
    const user = await this.partnerUserRepository.preload({ id, ...updateDto });
    if (!user) {
      throw new NotFoundException(`Partner user with ID ${id} not found.`);
    }
    const updatedUser = await this.partnerUserRepository.save(user);
    return this.mapToResponseDto(updatedUser);
  }

  async remove(id: number): Promise<void> {
    const user = await this.partnerUserRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`Partner user with ID ${id} not found.`);
    }
    await this.partnerUserRepository.remove(id);
  }
}
