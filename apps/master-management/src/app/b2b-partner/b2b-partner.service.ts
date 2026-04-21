  import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Like, FindManyOptions } from 'typeorm';
import { B2BPartner } from '../../../../../libs/database/src/entities/b2b-partner.entity';
import { B2BPartnerRepository } from '../../../../../libs/database/src/repositories/b2b-partner.repository';
import { CreateB2BPartnerDto, UpdateB2BPartnerDto, GetB2BPartnerFilterDto } from '../../../../../libs/dtos/master_management/b2b-partner.dto';
import { paginate } from '../../../../../libs/utils/basicUtils';
import { IPaginationObject } from '../../../../../libs/interfaces/commonTypes/custom.interface';

@Injectable()
export class B2BPartnerService {
  constructor(
    private readonly b2bPartnerRepository: B2BPartnerRepository,
  ) {}

  async create(createDto: CreateB2BPartnerDto): Promise<B2BPartner> {
    const existingPartner = await this.b2bPartnerRepository.findAll({ where: { name: createDto.name } });
    if (existingPartner.length > 0) {
      throw new BadRequestException('B2B Partner with this name already exists.');
    }
    return this.b2bPartnerRepository.create(createDto);
  }

  async findAll(filterDto: GetB2BPartnerFilterDto): Promise<IPaginationObject> {
    const { page, pageSize, search, status } = filterDto;
    const { currentPage, limit, offset } = paginate(page, pageSize);

    const findOptions: FindManyOptions<B2BPartner> = {
      take: limit,
      skip: offset,
      where: {},
      order: { createdAt: 'DESC' }
    };

    if (search) {
      findOptions.where = [
        { name: Like(`%${search}%`) },
        { email: Like(`%${search}%`) },
        { contactPerson: Like(`%${search}%`) }
      ];
    }

    if (status) {
      if (Array.isArray(findOptions.where)) {
        findOptions.where = findOptions.where.map(w => ({ ...w, status }));
      } else {
        findOptions.where['status'] = status;
      }
    }

    const [partners, total] = await this.b2bPartnerRepository.findAndCount(findOptions);

    return {
      docs: partners,
      totalDocs: total,
      limit,
      page: currentPage,
      totalPages: Math.ceil(total / limit),
      hasNextPage: currentPage * limit < total,
      hasPrevPage: currentPage > 1,
    };
  }

  async findOne(id: number): Promise<B2BPartner> {
    const partner = await this.b2bPartnerRepository.findOne(id);
    if (!partner) {
      throw new NotFoundException(`B2B Partner with ID ${id} not found.`);
    }
    return partner;
  }

  async update(id: number, updateDto: UpdateB2BPartnerDto): Promise<B2BPartner> {
    const partner = await this.b2bPartnerRepository.preload({ id, ...updateDto });
    if (!partner) {
      throw new NotFoundException(`B2B Partner with ID ${id} not found.`);
    }
    return this.b2bPartnerRepository.save(partner);
  }

  async remove(id: number): Promise<void> {
    const partner = await this.b2bPartnerRepository.findOne(id);
    if (!partner) {
      throw new NotFoundException(`B2B Partner with ID ${id} not found.`);
    }
    await this.b2bPartnerRepository.remove(id);
  }
}
