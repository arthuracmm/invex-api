import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { InventoryService } from './inventory.service';

@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) { }

  @Post()
  create(@Body() createInventoryDto: CreateInventoryDto) {
    return this.inventoryService.create(createInventoryDto);
  }

  @Get()
  findAll() {
    return this.inventoryService.findAll();
  }

  @Get('/quantity/:productId/:location')
  findQuantity(
    @Param('productId') productId: string,
    @Param('location') location: string
  ) {
    return this.inventoryService.findQuantity(productId, location);
  }

  @Get('product/:productId')
  findByProduct(@Param('productId') productid: string) {
    return this.inventoryService.findByProduct(productid);
  }

  @Patch(':productId/:location')
  update(
    @Param('productId') productId: string,
    @Param('location') location: string,
    @Body() updateInventoryDto: UpdateInventoryDto,
  ) {
    return this.inventoryService.update(productId, location, updateInventoryDto);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inventoryService.remove(id);
  }
}
