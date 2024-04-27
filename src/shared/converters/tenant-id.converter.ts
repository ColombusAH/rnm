import { ValueConverter, remult } from "remult";

const tenantIdConverter : ValueConverter<number> ={ toDb: (v) => remult.user ? +`${(remult.user as any).tenantId}` : 0, fromDb: (v) => v};
export {tenantIdConverter};