import { z } from 'zod';
import { EntityId } from '../value-objects';

export abstract class BaseEntity {
  public static get baseValidator() {
    return z.object({
      id: EntityId.validator
        .transform((id) => EntityId.create(id))
        .optional()
        .default(EntityId.generate().id),
      createdAt: z.date().default(new Date()),
      updatedAt: z.date().default(new Date()),
    });
  }

  public equals(anotherEntity: BaseEntity): boolean {
    return this.id.equals(anotherEntity.id);
  }

  public abstract toJSON(): any;

  public get id(): EntityId {
    return this.#id;
  }

  public get createdAt(): Date {
    return this.#createdAt;
  }

  public get updatedAt(): Date {
    return this.#updatedAt;
  }

  protected set updatedAt(newUpdatedAt: Date) {
    if (newUpdatedAt < this.#updatedAt) return;
    this.#updatedAt = newUpdatedAt;
  }

  readonly #id: EntityId;
  readonly #createdAt: Date;
  #updatedAt: Date;

  constructor(id: EntityId, createdAt: Date, updatedAt: Date) {
    this.#id = id;
    this.#createdAt = createdAt;
    this.#updatedAt = updatedAt;
  }
}

export namespace BaseEntity {
  export type CreateProps = {
    id?: EntityId.CreateProps;
    createdAt?: Date;
    updatedAt?: Date;
  };

  export type Props = {
    id: EntityId;
    createdAt: Date;
    updatedAt: Date;
  };

  export type JSON = {
    id: EntityId.JSON;
    createdAt: string;
    updatedAt: string;
  };
}
