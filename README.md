# extend-metadata

![Travis](https://img.shields.io/travis/Velmisov/extend-metadata/master.svg?style=flat-square)
![Coverage Status](https://coveralls.io/repos/github/Velmisov/extend-metadata/badge.svg?branch=master)
![node](https://img.shields.io/node/v/extend-metadata.svg?style=flat-square)
![npm](https://img.shields.io/npm/v/extend-metadata.svg?style=flat-square)

![GitHub top language](https://img.shields.io/github/languages/top/Velmisov/extend-metadata.svg?style=flat-square)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/Velmisov/extend-metadata.svg?style=flat-square)
![David](https://img.shields.io/david/Velmisov/extend-metadata.svg?style=flat-square)
![David](https://img.shields.io/david/dev/Velmisov/extend-metadata.svg?style=flat-square)

![license](https://img.shields.io/github/license/Velmisov/extend-metadata.svg?style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/Velmisov/extend-metadata.svg?style=flat-square)
![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)

## Description

Extend/override metadata of parent classes.

## Installation

```bash
npm install extend-metadata
```

## API

`@Extend()` - class decorator. Use it to extend all parent classes metadata.

`@Override()` - property/method decorator. Use it to extend particular metadata.

## Usage

### Extend

```typescript
@AddClassMetadata()
class Animal {
    @AddPropertyMetadata()
    property: Type;

    @AddMethodMetadata()
    method(): Type {}
}

@Extend()
class Cat extends Animal { // has the same metadata
    property: Type; // also has the same metadata

    @AddAnotherMethodMetadata()
    method(): Type { // has another metadata
        return super.method();
    }
}
```

### Override

```typescript
@AddClassMetadata()
class Animal {
    @AddPropertyMetadata()
    property: Type;

    @AddMethodMetadata()
    method(): Type {}
}

class Cat extends Animal { // doesn't have metadata from Animal
    @Override()
    property: Type; // has the same metadata

    method(): Type { // no metadata
        return super.method();
    }
}
```

## Requirements

`reflect-metadata: ^0.1.13`

## License

extend-metadata is [MIT licensed](LICENSE).
