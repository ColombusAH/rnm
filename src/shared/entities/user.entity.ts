import { Entity, Fields, Relations, remult } from "remult";
import { Tenant } from "./tenant.entity";

@Entity('users', {
  apiPrefilter: () => {
    console.log('remult.user', remult.user);
    if (remult.isAllowed('admin')) {
        console.log('remult.user is admin');
        return {
            tenantId: (remult.user as any)!.tenantId
        };
    }
    console.log('remult.user is not admin');
    return {
        tenantId: -1,
        id: -1
    };
},

})
export class User {
  @Fields.autoIncrement()
  id = 0;

  @Fields.number({required: true})
  tenantId = 0;

  @Fields.string()
  username = '';

  @Fields.string()
    email = '';

  @Fields.string({includeInApi: false})
  password = '';

 @Fields.json({ 
    defaultValue: () => ['user'],
    // validate: RolesArrayValidation,
  })
  roles: string[] = [];

  @Relations.toOne<User,Tenant>(() => Tenant, {field: 'tenantId', defaultIncluded: true})
  tenant?: Tenant;
}

// Helper function to validate roles
function RolesArrayValidation(roles: string[]) {
    const UserRole = ['admin', 'user', 'guest'];
    roles = roles ?? [];
    if (!Array.isArray(roles) || !roles.every(role => Object.values(UserRole).includes(role))) {
      throw new Error("Roles array contains invalid role.");
    }
  }
