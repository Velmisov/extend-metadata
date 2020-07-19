import { extendRecursively } from './utils';

export function Extend(): ClassDecorator {
	return (constructor: Function): void => {
		const instance: Object = constructor.prototype;
		const instanceProto: Object = Object.getPrototypeOf(instance);

		for (const propertyKey of Object.getOwnPropertyNames(instance)) {
			const metadataKeys =
				propertyKey === 'constructor'
					? Reflect.getOwnMetadataKeys(instance.constructor)
					: Reflect.getOwnMetadataKeys(instance, propertyKey);

			extendRecursively(
				instance,
				metadataKeys,
				propertyKey,
				instanceProto,
			);
		}
	};
}
