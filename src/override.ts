import 'reflect-metadata';
import { extendRecursively } from './utils';

export function Override(): PropertyDecorator {
	return (target: Object, propertyKey: string | symbol): void => {
		const instance = target;
		const instanceProto: Object = Object.getPrototypeOf(instance);

		const metadataKeys = Reflect.getOwnMetadataKeys(instance, propertyKey);

		extendRecursively(instance, metadataKeys, propertyKey, instanceProto);
	};
}
