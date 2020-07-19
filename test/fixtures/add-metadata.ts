export function AddClassMetadata(
	metadataKey: any, // eslint-disable-line
	metadataValue: any, // eslint-disable-line
): ClassDecorator {
	return Reflect.metadata(metadataKey, metadataValue);
}

export function AddPropertyMetadata(
	metadataKey: any, // eslint-disable-line
	metadataValue: any, // eslint-disable-line
): PropertyDecorator {
	return (target: Object, propertyKey: string | symbol): void => {
		target[propertyKey] = target[propertyKey] || undefined;
		Reflect.defineMetadata(metadataKey, metadataValue, target, propertyKey);
	};
}
