export abstract class BaseService<T, CreateInput, UpdateInput> {
  protected abstract model: any;
  protected abstract pkField: string;
  protected hasFlag: boolean = true;

  async findAll(opts?: { skip?: number; take?: number }): Promise<T[]> {
    const where = this.hasFlag ? { flag: 1 } : {};
    return this.model.findMany({
      where,
      skip: opts?.skip,
      take: opts?.take,
    });
  }

  async findById(id: number | string): Promise<T | null> {
    const where: Record<string, any> = { [this.pkField]: id };
    if (this.hasFlag) where.flag = 1;
    return this.model.findFirst({ where });
  }

  async create(data: CreateInput): Promise<T> {
    return this.model.create({ data });
  }

  async update(id: number | string, data: UpdateInput): Promise<T> {
    if (this.hasFlag) {
      const existing = await this.model.findFirst({
        where: { [this.pkField]: id, flag: 1 },
      });
      if (!existing) throw new Error('NOT_FOUND');
    }
    return this.model.update({
      where: { [this.pkField]: id },
      data,
    });
  }

  async softDelete(id: number | string): Promise<T> {
    if (!this.hasFlag) throw new Error('SOFT_DELETE_UNSUPPORTED');
    return this.model.update({
      where: { [this.pkField]: id },
      data: { flag: 0 },
    });
  }

  async hardDelete(id: number | string): Promise<T> {
    return this.model.delete({
      where: { [this.pkField]: id },
    });
  }
}
