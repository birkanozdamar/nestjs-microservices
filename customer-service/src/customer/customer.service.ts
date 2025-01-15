import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import PaginationDto from './dto/pagination.dto';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
    private dataSource: DataSource,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const customer = new Customer();
      customer.email = createCustomerDto.email;
      customer.name = createCustomerDto.name;
      customer.company = createCustomerDto.company;
      customer.phone = createCustomerDto.phone;

      await queryRunner.manager.save(customer);
      await queryRunner.commitTransaction();

      return {
        status: true,
        customer: customer,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error(error);
      return {
        status: false,
        customer: '',
        message: error,
      };
    } finally {
      await queryRunner.release();
    }
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const customer = await this.customersRepository.findOneBy({ id: id });

      if (!customer) {
        return { status: false };
      }

      customer.name = updateCustomerDto.name;
      customer.email = updateCustomerDto.email;
      customer.company = updateCustomerDto.company;
      customer.phone = updateCustomerDto.phone;

      await queryRunner.manager.save(customer);
      await queryRunner.commitTransaction();

      return { status: true, customer };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error(error);
      return { status: false, message: 'Error during update.' };
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const customer = await this.customersRepository.findOneBy({ id: id });

      if (!customer) {
        return { status: false };
      }

      await queryRunner.manager.softDelete(Customer, id);
      await queryRunner.commitTransaction();

      return { status: true, message: 'Customer deleted successfully.' };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error(error);
      return { status: false, message: 'Error during deletion.' };
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<Customer[]> {
    try {
      const { page, limit } = paginationDto;
      const skip = (page - 1) * limit;

      return this.customersRepository.find({
        skip: skip,
        take: limit,
      });
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching customers');
    }
  }

  async findOne(id: number) {
    try {
      return await this.customersRepository.findOneBy({ id: id });
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching customer');
    }
  }
}
