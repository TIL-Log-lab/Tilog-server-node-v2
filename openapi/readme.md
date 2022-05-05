# TILog Openapi -`Typescript-axios`

TILog-v2 Openapi `Typescript-axios`  
개발자를 위한 블로그 플랫폼 TILog를 위한 Openapi `Typescript-axios`스펙

# Install

```
yarn add @til-log.lab/tilog-api
npm install @til-log.lab/tilog-api
```

# How To use

```
import * tilogApi from '@til-log.lab/tilog-api'
```

# Migration 0.0.1 ~ 0.0.14 -> 0.1.0 Guide

## Change Error Interface

```
const COUNTRY = {
  ko: 'ko',
  en: 'en',
} as const;

type ExceptionMessageInterface = Partial<
  Record<typeof COUNTRY[keyof typeof COUNTRY], string>
>;
```

## Checking ErrorType

```
const isExceptionMessageInterface = (
  object: any,
): object is ExceptionMessageInterface => {
  if (!object) return false;
  if (!(object instanceof Object)) return false;

  return Object.keys(object).some((key) => key in COUNTRY);
};
```
