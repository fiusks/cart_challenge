import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

export class EntityId {
  public static create(createProps: EntityId.CreateProps): EntityId {
    if (!createProps) {
      return this.generate();
    }

    this.validator.parse(createProps);

    return new EntityId({ id: createProps });
  }

  public static validator = z.string().uuid();

  public static generate(): EntityId {
    return new EntityId({ id: uuidv4() });
  }

  public equals(anotherEntityId: EntityId): boolean {
    return this.id === anotherEntityId.id;
  }

  public toJSON(): EntityId.JSON {
    return this.#id;
  }

  readonly #id: string;

  constructor({ id }: EntityId.Props) {
    this.#id = id;
  }

  public get id(): string {
    return this.#id;
  }
}

export namespace EntityId {
  export type CreateProps = string;

  export type Props = {
    id: string;
  };

  export type JSON = string;
}
