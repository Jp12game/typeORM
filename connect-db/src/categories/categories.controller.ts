import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() body: { nombre: string }): Promise<Category> {
    return this.categoriesService.createCategory(body.nombre);
  }

  @Get()
  findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<Category> {
    return this.categoriesService.findById(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: Partial<Category>,
  ): Promise<Category> {
    return this.categoriesService.updateCategory(+id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.categoriesService.deleteCategory(+id);
  }
}