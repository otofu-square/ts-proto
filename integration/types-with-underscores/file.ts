/* eslint-disable */
import { util, configure, Writer, Reader } from 'protobufjs/minimal';
import * as Long from 'long';

export const protobufPackage = '';

export interface Baz {
  foo: FooBar | undefined;
}

export interface FooBar {}

const baseBaz: object = {};

export const Baz = {
  encode(message: Baz, writer: Writer = Writer.create()): Writer {
    if (message.foo !== undefined) {
      FooBar.encode(message.foo, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Baz {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseBaz } as Baz;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.foo = FooBar.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Baz {
    const message = { ...baseBaz } as Baz;
    message.foo = object.foo !== undefined && object.foo !== null ? FooBar.fromJSON(object.foo) : undefined;
    return message;
  },

  toJSON(message: Baz): unknown {
    const obj: any = {};
    message.foo !== undefined && (obj.foo = message.foo ? FooBar.toJSON(message.foo) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Baz>, I>>(object: I): Baz {
    const message = { ...baseBaz } as Baz;
    message.foo = object.foo !== undefined && object.foo !== null ? FooBar.fromPartial(object.foo) : undefined;
    return message;
  },
};

const baseFooBar: object = {};

export const FooBar = {
  encode(_: FooBar, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): FooBar {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseFooBar } as FooBar;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): FooBar {
    const message = { ...baseFooBar } as FooBar;
    return message;
  },

  toJSON(_: FooBar): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<FooBar>, I>>(_: I): FooBar {
    const message = { ...baseFooBar } as FooBar;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<Exclude<keyof I, KeysOfUnion<P>>, never>;

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
