import verifyUser from "@/server/verifyUser";
import { GetServerSidePropsContext } from "next";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const token = context.req.cookies.token;

  try {
    verifyUser(token);
    return {
      redirect: {
        destination: "/admin/posts",
        permanent: false,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }
};

export default function Page() {
  return null;
}
