import { EntityId } from './entity-id.vo';

describe('EntityId', () => {
  describe('create', () => {
    test('should create a new EntityId from valid UUID string', () => {
      const uuid = '123e4567-e89b-12d3-a456-426614174000';
      const entityId = EntityId.create(uuid);
      expect(entityId).toBeInstanceOf(EntityId);
      expect(entityId.id).toEqual(uuid);
    });

    it('should generate a new EntityId if no id is provided', () => {
      const entityId = EntityId.create('');
      expect(entityId).toBeInstanceOf(EntityId);
      expect(entityId.id).toMatch(
        /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i,
      );
    });
  });

  describe('equals', () => {
    test('should return true if two EntityIds have the same id', () => {
      const entityId1 = EntityId.create('');
      const entityId2 = new EntityId({ id: entityId1.id });
      expect(entityId1.equals(entityId2)).toBe(true);
    });

    test('should return false if two EntityIds have different ids', () => {
      const entityId1 = EntityId.create('');
      const entityId2 = EntityId.create('');
      expect(entityId1.equals(entityId2)).toBe(false);
    });
  });

  describe('toJSON', () => {
    test('should return the id as JSON string', () => {
      const uuid = '123e4567-e89b-12d3-a456-426614174000';
      const entityId = new EntityId({ id: uuid });
      expect(entityId.toJSON()).toEqual(uuid);
    });
  });
});
