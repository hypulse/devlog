import Button from "@/components/Button";
import Input from "@/components/Input";
import { useRouter } from "next/router";

export default function Page() {
  const { push } = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      push("/admin/posts");
    } catch (err) {
      console.error(err);
      alert("Failed to login");
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col">
      <Input
        type="text"
        name="email"
        placeholder="email"
        className="mb-elementGap"
      />

      <Input
        type="password"
        name="password"
        placeholder="password"
        className="mb-elementGap"
      />

      <Button type="submit" className="bg-primary mb-rowGap">
        <span>Sign in</span>
      </Button>
    </form>
  );
}
