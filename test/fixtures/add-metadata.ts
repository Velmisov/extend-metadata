import { ReflectIsObject } from '../../src/utils';

export function AddClassMetadata(
	metadataKey: any, // eslint-disable-line
	metadataValue: any, // eslint-disable-line
): ClassDecorator {
	return (constructor: Function): void => {
		Reflect.defineMetadata(metadataKey, metadataValue, constructor);
		Reflect.defineMetadata(
			metadataKey,
			metadataValue,
			constructor.prototype,
			'constructor',
		);
	};
}

export function AddPropertyMetadata(
	metadataKey: any, // eslint-disable-line
	metadataValue: any, // eslint-disable-line
): PropertyDecorator {
	return (target: Object, propertyKey: string | symbol): void => {
		target[propertyKey] = target[propertyKey] || undefined;
		Reflect.defineMetadata(metadataKey, metadataValue, target, propertyKey);
		if (ReflectIsObject(target[propertyKey]))
			Reflect.defineMetadata(
				metadataKey,
				metadataValue,
				target[propertyKey],
			);
	};
}
