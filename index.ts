import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';

const Globals = {
  Required: { required: true },
  NotRequired: { required: false },

  Array: { isArray: true },
  NotArray: { isArray: false },

  Nullable: { nullable: true },
  NotNullable: { nullable: false },
};

export const Types = {
  Number: 'number',
  Integer: 'integer',
  String: 'string',
  Boolean: 'boolean',
};

export const Formats = {
  NotSet: undefined,

  // Number
  Float: 'float',
  Double: 'double',

  // Int
  Int32: 'int32',
  Int64: 'int64',

  // String
  Date: 'date',
  DateTime: 'date-time',
  Password: 'password',
  Byte: 'byte',
  Binary: 'binary',
  Email: 'email',
  Uuid: 'uuid',
  Uri: 'uri',
  Hostname: 'hostname',
  IpV4: 'ipv4',
  IpV6: 'ipv6',
};

export const Config = {
  Enum: <T>(v: T) => ({ enum: v }),
} as const;


type Options = ApiPropertyOptions;
function merge(a: Options, b: Options = {}) {
  return { ...a, ...b };
}

export interface NumberTypes {
  Number: this;
  Integer: this;
}

export interface NumberFormats {
  Number: this; // NotSet
  Float: this;
  Double: this;
}

export interface IntegerFormats {
  Integer: this; // NotSet
  Int32: this;
  Int64: this;
}

export interface AllNumbersGlobalFields extends NumberTypes, NumberFormats, IntegerFormats {
  Min(min: number, exclusive?: boolean): this
  resetMin(): this
  Max(max: number, exclusive?: boolean): this
  resetMax(): this
  MultipleOf(multipleOf: number): this
  resetMultipleOf(): this
}

export interface StringTypes {
  String: this;
}

export interface StringFormats {
  // RFC 3339, section 5.6, for example, 2017-07-21
  Date: this;

  // date-time – the date-time notation as defined by RFC 3339, section 5.6, for example, 2017-07-21T17:32:28Z
  DateTime: this;
  Password: this;
  Byte: this;
  Binary: this;
  Email: this;
  Uuid: this;
  Uri: this;
  Hostname: this;
  IpV4: this;
  IpV6: this;
}

export interface AllStringsGlobalFields extends StringTypes, StringFormats {
  Pattern(pattern: string): this
}

export interface AllBooleansGlobalFields {
  Boolean: this;
}

export interface Globals {
  Format(format?: Options['format']): this
  Type(type: Options['type']): this
  Null: this;
  NotNull: this;
  IsArray: this;
  IsNotArray: this;
  Required: this;
  NotRequired: this;
}

export interface NumberApiPropsInterface extends Globals, AllNumbersGlobalFields {}

export interface StrApiPropsInterface extends Globals, AllStringsGlobalFields {}

export interface BoolApiPropsInterface extends Globals, AllBooleansGlobalFields {}

export class ApiPropCls implements NumberApiPropsInterface, StrApiPropsInterface, BoolApiPropsInterface {
  constructor(protected config: Options) {}

  protected ap(conf?: Partial<Options>) {
    this.config = merge(this.config, conf);
    return this;
  }

  // Short to PropertyDecorator
  get Pd() {return ApiProperty(this.config)}
  get Conf() {return this.config}

  // https://swagger.io/docs/specification/data-models/data-types/

  // Globals
  Type(type: Options['type']) {return this.ap({ type })}
  Format(format: Options['format']) {return this.ap({ format })}
  Description(description: string) {return this.ap({ description })}
  Title(title: string) {return this.ap({ title })}
  Enum(v: ApiPropertyOptions['enum']) {return this.ap(Config.Enum(v))}
  get IsArray() {return this.ap(Globals.Array)}
  get IsNotArray() {return this.ap(Globals.NotArray)}
  get Null() {return this.ap(Globals.Nullable)}
  get NotNull() {return this.ap(Globals.NotNullable)}
  get Required() {return this.ap(Globals.Required)}
  get NotRequired() {return this.ap(Globals.NotRequired)}


  // --- Numbers
  get Number() {return this.Type(Types.Number).Format(Formats.NotSet)}
  get Float() {return this.Number.Format(Formats.Float)}
  get Double() {return this.Number.Format(Formats.Double)}
  get Integer() {return this.Type(Types.Integer).Format(Formats.NotSet)}
  get Int32() {return this.Integer.Format(Formats.Int32)}
  get Int64() {return this.Integer.Format(Formats.Int64)}

  // exclusiveMinimum: false or not included	value ≥ minimum
  protected setMin(minimum?: number, exclusiveMinimum?: boolean) {
    return this.ap({ minimum, exclusiveMinimum })
  }
  Min(min: number, exclusive: boolean = false) {return this.Number.setMin(min, exclusive)}
  resetMin() {return this.setMin()}

  // exclusiveMaximum: false or not included	value ≤ maximum
  protected setMax(maximum?: number, exclusiveMaximum?: boolean) {
    return this.ap({ maximum, exclusiveMaximum })
  }
  Max(max: number, exclusive: boolean = false) {return this.Number.setMax(max, exclusive)}
  resetMax() {return this.setMax()}

  // Must be more than 0
  MultipleOf(multipleOf: number) {
    return this.ap({ multipleOf })
  }
  resetMultipleOf() {
    return this.ap({ multipleOf: undefined })
  }

  // --- Strings
  get String() {return this.Type(Types.String)}
  protected strFormat(format: Options['format']) {return this.String.Format(format)}
  get Date() {return this.strFormat(Formats.Date)}
  get DateTime() {return this.strFormat(Formats.DateTime)}
  get Password()  {return this.strFormat(Formats.Password)}
  get Byte()  {return this.strFormat(Formats.Byte)}
  get Binary() {return this.strFormat(Formats.Binary)}
  get Email() {return this.strFormat(Formats.Email)}
  get Uuid() {return this.strFormat(Formats.Uuid)}
  get Uri() {return this.strFormat(Formats.Uri)}
  get Hostname() {return this.strFormat(Formats.Hostname)}
  get IpV4() {return this.strFormat(Formats.IpV4)}
  get IpV6() {return this.strFormat(Formats.IpV6)}
  Pattern(pattern: string) {return this.ap({ pattern })}

  // --- Booleans
  get Boolean() {return this.Type(Types.Boolean)}
}

export function ApiProp(title: string) {
  return Api().Title(title);
}

export function Api(config?: ApiPropertyOptions) {
  return new ApiPropCls(config || {});
}


