import Search from "@/Components/Admin/Search";
import ThemeSwitch from "@/Components/Admin/ThemeSwitch";
import TopNav from "@/Components/Admin/TopNav";
import { UserNav } from "@/Components/Admin/UserNav";
import AdminLayout from "@/Layouts/Admin/AdminLayout";

export default function ContentLayout({ children }) {
  return (
    <>
      <AdminLayout>
        <TopNav />
        <div className="ml-auto flex items-center space-x-4">
          <Search />
          <ThemeSwitch />
          <UserNav />
        </div>
        {children}
      </AdminLayout>
    </>
  );
}
