/** @format */

import UsersListTable from "@/components/table/user-list-table";
import { fetchUsers } from "@/server-actions/user";
import UserSearch from "./user-search";
import { UserAddDialog } from "@/components/dialog/user/user-add";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

export default async function UserContainer() {
  const users = await fetchUsers();
  return (
    <div>
      <div className="flex justify-between items-center p-2">
        {/* <UserSearch /> */}
        <div></div>
        <UserAddDialog
          btn={
            <Button>
              <UserPlus />
            </Button>
          }
        />
      </div>
      <UsersListTable users={users} />
    </div>
  );
}
