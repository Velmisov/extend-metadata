export function extendRecursively(
	instance: Object,
	metadataKeys: any[], // eslint-disable-line
	propertyKey: string | symbol,
	instanceProto: Object,
): void {
	if (propertyKey === 'constructor')
		extendConstructorRec(instance, metadataKeys, instanceProto);
	else extendPropertyRec(instance, metadataKeys, propertyKey, instanceProto);
}

function extendConstructorRec(
	instance: Object,
	metadataKeys: any[], // eslint-disable-line
	instanceProto: Object,
) {
	if (!instanceProto || !instanceProto.constructor) return;

	const protoMetadataKeys = Reflect.getOwnMetadataKeys(
		instanceProto.constructor,
	);
	for (const metadataKey of protoMetadataKeys) {
		if (metadataKeys.includes(metadataKey)) continue;

		const metadataValue = Reflect.getOwnMetadata(
			metadataKey,
			instanceProto.constructor,
		);

		Reflect.defineMetadata(
			metadataKey,
			metadataValue,
			instance.constructor,
		);
		metadataKeys.push(metadataKey);
	}

	extendConstructorRec(
		instance,
		metadataKeys,
		Object.getPrototypeOf(instanceProto),
	);
}

function extendPropertyRec(
	instance: Object,
	metadataKeys: any[], // eslint-disable-line
	propertyKey: string | symbol,
	instanceProto: Object,
) {
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

	extendPropertyRec(
		instance,
		metadataKeys,
		propertyKey,
		Object.getPrototypeOf(instanceProto),
	);
}
