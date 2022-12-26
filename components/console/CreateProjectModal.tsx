import { useState } from "react";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Input, Modal, Container, Hr } from "@/components/theme";
import {
  PlusIcon,
  ArrowRightIcon,
} from "@heroicons/react/20/solid";

interface Project {
  name: string;
}

const CreateProjectModal = () => {
  const router = useRouter();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [
    loading,
    setLoading
  ] = useState(false);

  const projectMutation = trpc.projects.create.useMutation({
    onSuccess: (data) => {
      const { id } = data;
      router.push(`/console/projects/${id}`);
    },

    onError: (error) => {
      console.log("Mutation error", error);
    },
  });

  const createNewProject: SubmitHandler<Project> = async (data) => {
    const { name } = data;
    setLoading(true);

    if (!name) {
      setLoading(false);
      return;
    }

    projectMutation.mutate({ project: { name: name } });
    reset();
  };

  return (
    <Modal
      button={
        <Button>
          <PlusIcon className="mr-2 h-5 w-5" aria-hidden="true" />
          New project
        </Button>
      }
      title="Create a new project"
    >

      <form onSubmit={handleSubmit(createNewProject)}>
        <Input
          name="name"
          label="Project name"
          placeholder="Project X"
          defaultValue="Project X"
          required={true}
          register={register}
          errors={errors}
          validationSchema={{
            required: "Project name is required",
          }}
        />

        <div className="float-right">
          <Button type="submit" disabled={loading}>
            Save and continue
            <ArrowRightIcon className="ml-2 h-5 w-5" aria-hidden="true" />
          </Button>
        </div>
      </form>
    </Modal>
  )
};

export default CreateProjectModal;
