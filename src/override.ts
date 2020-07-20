import {
	extendObjectRecursively,
	extendPropertyRecursively,
	ReflectIsObject,
} from './utils';

export function Override(): PropertyDecorator {
	return (target: Object, propertyKey: string | symbol): void => {
		const instance = target;
		const instanceProto: Object = Object.getPrototypeOf(instance);

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
	};
}
