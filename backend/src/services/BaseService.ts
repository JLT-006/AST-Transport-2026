export abstract class BaseService<T, CreateInput, UpdateInput> {
  protected abstract model: any;

  async findAll(): Promise<T[]> {
    return this.model.findMany({
      where: { flag: 1 } // Soft delete check by default based on schema rules
    });
  }

  async findById(id: number | string): Promise<T | null> {
    return this.model.findFirst({
      where: { id, flag: 1 }
    });
  }

  async create(data: CreateInput): Promise<T> {
    return this.model.create({
      data: { ...data, flag: 1 }
    });
  }

  async update(id: number | string, data: UpdateInput): Promise<T> {
    return this.model.update({
      where: { id },
      data
    });
  }

  async softDelete(id: number | string): Promise<T> {
    return this.model.update({
      where: { id },
      data: { flag: 0 }
    });
  }
}
