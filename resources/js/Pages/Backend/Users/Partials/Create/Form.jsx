import { useEffect, useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import { Link, useForm } from "@inertiajs/react";
import { Card } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/Others/CustomButton";
import { IconList } from "@tabler/icons-react";
import useNotification from "@/hooks/useNotification";

const Form = () => {
const [isLoading, setIsLoading] = useState(false);
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const {showSuccess, showError} = useNotification();

  useEffect(() => {
    return () => {
      reset("password");
    };
  }, []);

  const submit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    post(route("users.store"), {
      onSuccess: () => 
        {
            setIsLoading(false);
            showSuccess('User created successfully');
        },
      onError: () => 
        {
            setIsLoading(false);
            showError('Failed to create user');
        }
    });
  };
  return (
    <div>
          <Card className="p-6 rounded-none mt-4">
            <form onSubmit={submit}>
              <div className="grid gap-2">
                <div>
                  <InputLabel htmlFor="name" value="Name" />
                  <Input
                    placeholder="John doe"
                    id="name"
                    type="text"
                    name="name"
                    value={data.name}
                    className="mt-1 block w-full"
                    autoComplete="username"
                    onChange={(e) => setData("name", e.target.value)}
                  />
                  <InputError message={errors.name} className="mt-2" />
                </div>

                <div>
                  <InputLabel htmlFor="email" value="Email" />
                  <Input
                    placeholder="name@example.com"
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    autoComplete="username"
                    onChange={(e) => setData("email", e.target.value)}
                  />
                  <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                  <InputLabel htmlFor="password" value="Password" />
                  <Input
                    placeholder="********"
                    id="password"
                    type="password"
                    name="password"
                    value={data.password}
                    className="mt-1 block w-full"
                    autoComplete="current-password"
                    onChange={(e) => setData("password", e.target.value)}
                  />
                  <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                  <InputLabel
                    htmlFor="password_confirmation"
                    value="Confirm Password"
                  />
                  <Input
                    placeholder="********"
                    id="password_confirmation"
                    type="password"
                    name="password_confirmation"
                    value={data.password_confirmation}
                    className="mt-1 block w-full"
                    autoComplete="new-password"
                    onChange={(e) =>
                      setData("password_confirmation", e.target.value)
                    }
                    required
                  />

                  <InputError
                    message={errors.password_confirmation}
                    className="mt-2"
                  />
                </div>


              </div>
              
              <Button className="mt-2" loading={isLoading} type="submit">
                  Create User
             </Button>
            </form>
          </Card>
    </div>
  )
}

export default Form