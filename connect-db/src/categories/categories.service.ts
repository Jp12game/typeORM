import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async createCategory(nombre: string): Promise<Category> {
    const nueva = this.categoriesRepository.create({ nombre });
    return this.categoriesRepository.save(nueva);
  }

  async findAll(): Promise<Category[]> {
    return this.categoriesRepository.find();
  }

  async findById(id: number): Promise<Category> {
    const category = await this.categoriesRepository.findOne({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
    }

    return category;
  }

  async updateCategory(
    id: number,
    data: Partial<Category>,
  ): Promise<Category> {
    const category = await this.findById(id);

    Object.assign(category, data);

    return this.categoriesRepository.save(category);
  }

  async deleteCategory(id: number): Promise<void> {
    const result = await this.categoriesRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
    }
  }
}