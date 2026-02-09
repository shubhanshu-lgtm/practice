import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu, SystemModule, SystemModuleRepository } from '../../../../../libs/database/src';
import { CreateMenuDto, CreateSystemModuleDto, UpdateMenuDto, UpdateMenuStatusDto, UpdateSystemModuleDto } from '../../../../../libs/dtos/master_management/module_management.dto';

@Injectable()
export class ModuleManagementService {
  constructor(
    // @InjectRepository(SystemModule)

    private readonly systemModuleRepository: SystemModuleRepository,
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
  ) {}

  async createSystemModule(payload: CreateSystemModuleDto): Promise<SystemModule> {
    try {
      const module = await this.systemModuleRepository.create(payload);
      return module;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getSystemModules(): Promise<SystemModule[]> {
    try {
      const modules = await this.systemModuleRepository.findAll({ order: { name: 'ASC' } });
      return modules;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getSystemModuleById(id: number): Promise<SystemModule> {
    try {
      const module = await this.systemModuleRepository.findOne(id);
      if (!module) {
        throw new NotFoundException('Module not found');
      }
      return module;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateSystemModule(id: number, payload: UpdateSystemModuleDto): Promise<SystemModule> {
    try {
      const module = await this.systemModuleRepository.findOne(id);
      if (!module) {
        throw new NotFoundException('Module not found');
      }
      await this.systemModuleRepository.update(id, payload);
      return await this.getSystemModuleById(id);  
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createMenu(payload: CreateMenuDto): Promise<Menu> {
    try {
      const module = await this.systemModuleRepository.findOne(payload.moduleId);
      if (!module) {
        throw new NotFoundException('Module not found');
      }
      const menu = this.menuRepository.create({
        name: payload.name,
        path: payload.path,
        sortOrder: payload.sortOrder,
        status: payload.status,
        module,
      });

      if (payload.parentId) {
        const parent = await this.menuRepository.findOne({ where: { id: payload.parentId } });
        if (!parent) {
          throw new NotFoundException('Parent menu not found');
        }
        menu.parent = parent;
      }

      return await this.menuRepository.save(menu);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getMenus(): Promise<Menu[]> {
    try {
      const menus = await this.menuRepository.find({
        relations: ['module', 'parent'],
        order: { sortOrder: 'ASC' },
      });
      return menus;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getMenuById(id: number): Promise<Menu> {
    try {
      const menu = await this.menuRepository.findOne({ where: { id }, relations: ['module', 'parent'] });
      if (!menu) {
        throw new NotFoundException('Menu not found');
      }
      return menu;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateMenu(id: number, payload: UpdateMenuDto): Promise<Menu> {
    try {
      const menu = await this.menuRepository.findOne({ where: { id }, relations: ['module', 'parent'] });
      if (!menu) {
        throw new NotFoundException('Menu not found');
      }

      if (payload.moduleId) {
        const module = await this.systemModuleRepository.findOne(payload.moduleId);
        if (!module) {
          throw new NotFoundException('Module not found');
        }
        menu.module = module;
      }

      if (payload.parentId) {
        const parent = await this.menuRepository.findOne({ where: { id: payload.parentId } });
        if (!parent) {
          throw new NotFoundException('Parent menu not found');
        }
        menu.parent = parent;
      }

      menu.name = payload.name ?? menu.name;
      menu.path = payload.path ?? menu.path;
      menu.sortOrder = payload.sortOrder ?? menu.sortOrder;
      menu.status = payload.status ?? menu.status;

      await this.menuRepository.save(menu);
      return await this.getMenuById(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateMenuStatus(id: number, payload: UpdateMenuStatusDto): Promise<Menu> {
    try {
      const menu = await this.menuRepository.findOne({ where: { id }, relations: ['module', 'parent'] });
      if (!menu) {
        throw new NotFoundException('Menu not found');
      }
      await this.menuRepository.update(id, payload);
      return await this.getMenuById(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
