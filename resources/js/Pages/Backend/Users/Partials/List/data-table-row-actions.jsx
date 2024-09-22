import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";

import { Button } from "@/Components/Others/CustomButton";
import { Link } from "@inertiajs/react";
import useConfirmation from "@/hooks/useConfirmation";
import { router } from '@inertiajs/react'
import useNotification from "@/hooks/useNotification";

export function DataTableRowActions({row}) {
  const { confirmDeletion } = useConfirmation();
  const {showSuccess, showError} = useNotification();
  const handleDelete = async (e) => {
    e.preventDefault();
    const isConfirmed = await confirmDeletion('You won\'t be able to revert this!');
    if (isConfirmed) {
      // Delete the blog
      
      router.delete(route('users.destroy', row.getValue('id')),
        {
          onSuccess: () => {
            showSuccess('User created successfully');
          },
          onError: () => {
            showError('Failed to create user');
          }
        }
    );
    }
  }
  return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
            <Link href={route('users.edit', row.getValue('id'))}>
              <DropdownMenuItem className="cursor-pointer">
                Edit
              </DropdownMenuItem>
            </Link>
            <Link onClick={(e) => handleDelete(e)} >
            <DropdownMenuItem className="cursor-pointer">
              Delete
            </DropdownMenuItem>
            </Link>
        </DropdownMenuContent>
      </DropdownMenu>
  );
}
