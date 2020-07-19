import 'reflect-metadata';
import { AddClassMetadata, AddPropertyMetadata } from './fixtures/add-metadata';
import { Override } from '../src';

describe('Override', () => {
	it('should extend metadata only for overridden methods/properties', () => {
		const classMetadataKey = 'class metadata key';
		const classMetadataValueA = 'class metadata value A';
		const classMetadataValueB = 'class metadata value B';

		const propertyMetadataKey = 'property metadata key';
		const propertyMetadataValueA = 'property metadata value A';
		const propertyMetadataValueB = 'property metadata value B';
		const propertyMetadataValueC = 'property metadata value C';

		const methodMetadataKey = 'method metadata key';
		const methodMetadataValueA = 'method metadata value A';
		const methodMetadataValueB = 'method metadata value B';

		@AddClassMetadata(classMetadataKey, classMetadataValueA)
		class A {
			@AddPropertyMetadata(propertyMetadataKey, propertyMetadataValueA)
			propertyToOverride = 'a';

			@AddPropertyMetadata(propertyMetadataKey, propertyMetadataValueA)
			property = 'a';

			@AddPropertyMetadata(methodMetadataKey, methodMetadataValueA)
			methodToOverride(param: string): string {
				return `A ${param}`;
			}

			@AddPropertyMetadata(methodMetadataKey, methodMetadataValueA)
			method(param: string): string {
				return `A ${param}`;
			}
		}

		@AddClassMetadata(classMetadataKey, classMetadataValueB)
		class B extends A {
			@AddPropertyMetadata(propertyMetadataKey, propertyMetadataValueB)
			propertyToOverride = 'b';

			@AddPropertyMetadata(propertyMetadataKey, propertyMetadataValueB)
			property = 'b';

			@AddPropertyMetadata(methodMetadataKey, methodMetadataValueB)
			methodToOverride(param: string): string {
				return `B ${super.methodToOverride(param)}`;
			}

			@AddPropertyMetadata(methodMetadataKey, methodMetadataValueB)
			method(param: string): string {
				return `B ${super.method(param)}`;
			}
		}

		class C extends B {
			@Override()
			propertyToOverride = 'c';

			@AddPropertyMetadata(propertyMetadataKey, propertyMetadataValueC)
			property = 'c';

			@Override()
			methodToOverride(param: string): string {
				return `C ${super.methodToOverride(param)}`;
			}

			method(param: string): string {
				return super.method(param);
			}
		}

		expect(Reflect.getOwnMetadata(classMetadataKey, C)).toBeUndefined();
		expect(
			Reflect.getOwnMetadata(
				propertyMetadataKey,
				C.prototype,
				'propertyToOverride',
			),
		).toEqual(propertyMetadataValueB);
		expect(
			Reflect.getOwnMetadata(
				propertyMetadataKey,
				C.prototype,
				'property',
			),
		).toEqual(propertyMetadataValueC);
		expect(
			Reflect.getOwnMetadata(
				methodMetadataKey,
				C.prototype,
				'methodToOverride',
			),
		).toEqual(methodMetadataValueB);
		expect(
			Reflect.getOwnMetadata(methodMetadataKey, C.prototype, 'method'),
		).toBeUndefined();
	});
});
