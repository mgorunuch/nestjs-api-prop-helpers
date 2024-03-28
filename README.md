A NestJS utility library providing a streamlined approach to defining Swagger API property decorators. This library simplifies type declaration, format specification, and the addition of constraints for your NestJS models.

### Key Features:
Types: Conveniently define properties as Number, Integer, String, or Boolean.
Formats: Precisely set formats like Float, Double, Int32, Int64, Date, DateTime, Email, UUID, and more.
Constraints: Add validation rules for minimum/maximum values, multiples, and regular expression patterns.
Flexibility: Use globals for common settings like Required, NotRequired, IsArray, Null, etc.
Chainable API: Build concise and expressive decorators with a fluent interface.

### Installation
```bash
npm install nestjs-swagger-api-decorator
```

### Usage Example
```typescript
import { ApiProp } from 'nestjs-swagger-api-decorator';

class User {
  @ApiProp('User ID').Integer.Min(1).Pb
  id: number;

  @ApiProp('Username').String.Pattern(/^[a-zA-Z0-9_-]+$/).Pb
  username: string;

  @ApiProp('Email Address').Email.Pb
  email: string;
}
```


### Explanation of Utility
The ApiProp function serves as the heart of this library. It encapsulates a class that implements various interfaces to enable a powerful chainable API. This allows you to succinctly define Swagger properties for your NestJS models.

### Contributing
We welcome contributions to improve this library! Feel free to open pull requests or issues for bug fixes, enhancements, and suggestions.

### Comparision

#### Without Library
```typescript
export class Dto {
  @ApiProperty({ description: 'User ID', type: 'integer', minimum: 1 })
  id: number;
    
  @ApiProperty({ description: 'Username', type: 'string', pattern: '^[a-zA-Z0-9_-]+$' })
  username: string;
    
  @ApiProperty({ description: 'Email Address', type: 'string', format: 'email' })
  email: string;
}
```

#### With Library
```typescript
class Dto {
  @ApiProp('User ID').Integer.Min(1).Pb
  id: number;

  @ApiProp('Username').String.Pattern(/^[a-zA-Z0-9_-]+$/).Pb
  username: string;

  @ApiProp('Email Address').Email.Pb
  email: string;
}
```
