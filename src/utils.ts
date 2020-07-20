// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ReflectIsObject(value: any): boolean {
	return typeof value === 'object' || typeof value === 'function';
}

export function extendObjectRecursively(
	instance: Object,
	metadataKeys: any[], // eslint-disable-line @typescript-eslint/no-explicit-any
	propertyKey: string | symbol,
	instanceProto: Object,
): void {
	if (!instanceProto || !instanceProto.hasOwnProperty(propertyKey)) return;

	const protoMetadataKeys = Reflect.getOwnMetadataKeys(
		instanceProto[propertyKey],
	);
	for (const metadataKey of protoMetadataKeys) {
		if (metadataKeys.includes(metadataKey)) continue;

		const metadataValue = Reflect.getOwnMetadata(
			metadataKey,
			instanceProto[propertyKey],
		);

		Reflect.defineMetadata(
			metadataKey,
			metadataValue,
			instance[propertyKey],
		);
		metadataKeys.push(metadataKey);
	}

	extendObjectRecursively(
		instance,
		metadataKeys,
		propertyKey,
		Object.getPrototypeOf(instanceProto),
	);
}

export function extendPropertyRecursively(
	instance: Object,
	metadataKeys: any[], // eslint-disable-line
	propertyKey: string | symbol,
	instanceProto: Object,
): void {
	if (!instanceProto || !instanceProto.hasOwnProperty(propertyKey)) return;

	const protoMetadataKeys = Reflect.getOwnMetadataKeys(
		instanceProto,
		propertyKey,
	);
	for (const metadataKey of protoMetadataKeys) {
		if (metadataKeys.includes(metadataKey)) continue;

		const metadataValue = Reflect.getOwnMetadata(
			metadataKey,
			instanceProto,
			propertyKey,
		);

		Reflect.defineMetadata(
			metadataKey,
			metadataValue,
			instance,
			propertyKey,
		);
		metadataKeys.push(metadataKey);
	}

	extendPropertyRecursively(
		instance,
		metadataKeys,
		propertyKey,
		Object.getPrototypeOf(instanceProto),
	);
}
