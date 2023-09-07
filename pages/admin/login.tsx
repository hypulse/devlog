import Button from "@/components/Button";
import Input from "@/components/Input";
import verifyUser from "@/server/verifyUser";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const token = context.req.cookies.token;

  try {
    verifyUser(token);
    return {
      props: {
        loggedIn: true,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};

export default function Page({ loggedIn }: { loggedIn?: boolean }) {
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

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      push("/");
    } catch (err) {
      console.error(err);
      alert("Failed to logout");
    }
  };

  if (loggedIn) {
    return (
      <Button className="bg-primary mb-rowGap w-full" onClick={handleLogout}>
        Sign out
      </Button>
    );
  }

  return (
    <form className="flex flex-col" onSubmit={handleLogin}>
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
        Sign in
      </Button>
    </form>
  );
}
