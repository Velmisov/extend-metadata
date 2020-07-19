import { Extend } from '../src';
import { AddClassMetadata, AddPropertyMetadata } from './fixtures/add-metadata';

describe('Extend', () => {
	const classMetadataKey = 'class metadata key';
	const classMetadataValueA = 'class metadata value A';
	const classMetadataValueB = 'class metadata value B';

	const propertyMetadataKey = 'property metadata key';
	const propertyMetadataValueA = 'property metadata value A';
	const propertyMetadataValueB = 'property metadata value B';
	const propertyMetadataValueC = 'property metadata value C';

	const methodMetadataKey = 'method metadata key';
	const methodMetadataValue = 'method metadata value';

	@AddClassMetadata(classMetadataKey, classMetadataValueA)
	class A {
		@AddPropertyMetadata(propertyMetadataKey, propertyMetadataValueA)
		property = 'a';

		@AddPropertyMetadata(methodMetadataKey, methodMetadataValue)
		method(param: string): string {
			return `A ${param}`;
		}
	}

	@AddClassMetadata(classMetadataKey, classMetadataValueB)
	class B extends A {
		@AddPropertyMetadata(propertyMetadataKey, propertyMetadataValueB)
		property = 'b';

		method(param: string): string {
			return `B ${super.method(param)}`;
		}
	}

	@Extend()
	class C extends B {
		@AddPropertyMetadata(propertyMetadataKey, propertyMetadataValueC)
		property = 'c';

		method(param: string): string {
			return super.method(param);
		}
	}

	it('should extend all metadata from parent classes', () => {
		expect(Reflect.getOwnMetadata(classMetadataKey, C)).toEqual(
			classMetadataValueB,
		);
		expect(
			Reflect.getOwnMetadata(
				propertyMetadataKey,
				C.prototype,
				'property',
			),
		).toEqual(propertyMetadataValueC);
		expect(
			Reflect.getOwnMetadata(methodMetadataKey, C.prototype, 'method'),
		).toEqual(methodMetadataValue);
	});
});
