import { useEffect, useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import { Link, useForm } from "@inertiajs/react";
import SettingsLayout from "../Index-2";
import { Card } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/Others/CustomButton";
import useNotification from "@/hooks/useNotification";

const Index = ({ details }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { data, setData, put, processing, errors, reset } = useForm({
    api_key: details.api_key,
    provider: "openai",
  });

  const { showSuccess, showError } = useNotification();

  useEffect(() => {
    return () => {
      reset("password");
    };
  }, []);

  const handleOpenAiSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    put(route("configurations.update"), {
      onSuccess: () => {
        setIsLoading(false);
        showSuccess("Open Ai Configuration updated successfully");
      },
      onError: () => {
        setIsLoading(false);
        showError("Failed to update Open Ai Configuration");
      },
    });
  };
  return (
    <SettingsLayout>
      <Card className="p-6 rounded-none w-full">
        <h1 className="text-xl font-semibold mb-3">Open Ai Configuration</h1>
        <form onSubmit={handleOpenAiSubmit}>
          <div className="grid gap-2">
            <div>
              <InputLabel htmlFor="openAiConfigaretion" value="Api Key" />
              <Input
                placeholder="sk-proj *** ***"
                id="openAiConfigaretion"
                type="text"
                name="api_key"
                value={data.api_key}
                className="mt-1 block w-full"
                onChange={(e) => setData("api_key", e.target.value)}
              />
              <InputError message={errors.api_key} className="mt-2" />
            </div>
          </div>

          <Button className="mt-5" loading={isLoading} type="submit">
            Update Configuration
          </Button>
        </form>
      </Card>
    </SettingsLayout>
  );
};

export default Index;
