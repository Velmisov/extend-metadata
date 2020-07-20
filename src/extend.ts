import {
	extendObjectRecursively,
	extendPropertyRecursively,
	ReflectIsObject,
} from './utils';

export function Extend(): ClassDecorator {
	return (constructor: Function): void => {
		const instance: Object = constructor.prototype;
		const instanceProto: Object = Object.getPrototypeOf(instance);

		for (const propertyKey of Object.getOwnPropertyNames(instance)) {
			if (ReflectIsObject(instance[propertyKey])) {
				const objectMetadataKeys = Reflect.getOwnMetadataKeys(
					instance[propertyKey],
				);
				extendObjectRecursively(
					instance,
					objectMetadataKeys,
					propertyKey,
					instanceProto,
				);
			}

			const propertyMetadataKeys = Reflect.getOwnMetadataKeys(
				instance,
				propertyKey,
			);
			extendPropertyRecursively(
				instance,
				propertyMetadataKeys,
				propertyKey,
				instanceProto,
			);
		}
	};
}
