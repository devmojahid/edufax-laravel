import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/Components/Others/CustomButton";
import { Link } from "@inertiajs/react";

export default function SidebarNav({ className, items, ...props }) {
  //   const { pathname } = useLocation();
  //   const navigate = useNavigate();
  //   const [val, setVal] = useState(pathname ?? "/settings");

  const handleSelect = (e) => {
    setVal(e);
    // navigate(e);
  };

  return (
    <>
      <div className="p-1 md:hidden">
        <Select onValueChange={handleSelect}>
          <SelectTrigger className="h-12 sm:w-48">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            {items.map((item) => (
              <SelectItem key={item.href} value={item.href}>
                <div className="flex gap-x-4 px-2 py-1">
                  <span className="scale-125">{item.icon}</span>
                  <span className="text-md">{item.title}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav
          className={cn("grid text-sm text-muted-foreground", className)}
          {...props}
        >
          {items.map((item, index) => (
            // <Link
            //   key={item.href}
            //   to={item.href}
            //   className={cn(
            //     buttonVariants({ variant: "ghost" }),
            //     pathname === item.href
            //       ? "bg-muted hover:bg-muted"
            //       : "hover:bg-transparent hover:underline",
            //     "justify-start"
            //   )}
            // >
            //   <span className="mr-2">{item.icon}</span>
            //   {item.title}
            // </Link>
            <Link
              href={item.href}
              key={index}
              //   className={cn(
              //     buttonVariants({ variant: "ghost" }),
              //     pathname === item.href
              //       ? "bg-muted hover:bg-muted"
              //       : "hover:bg-transparent hover:underline",
              //     "justify-start"
              //   )}
              className="hover:bg-transparent justify-start inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2"
            >
              <span className="mr-2">{item.icon}</span>
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
