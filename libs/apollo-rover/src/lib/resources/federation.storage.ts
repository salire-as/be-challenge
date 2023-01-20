class FederationTypeMetadataStorageHost {
  private schemas = new Array<unknown>();

  add(type: unknown) {
    this.schemas.push(type);
  }

  getExtended(): (Object | Function)[] {
    return this.schemas;
  }
}

type NodeGlobalExtendsFederation = typeof globalThis & { FederationTypeMetadataStorage: FederationTypeMetadataStorageHost };
const globalRef = global as NodeGlobalExtendsFederation;
export const FederationTypeMetadataStorage: FederationTypeMetadataStorageHost =
  globalRef.FederationTypeMetadataStorage || (globalRef.FederationTypeMetadataStorage = new FederationTypeMetadataStorageHost());
