export const getServerSideProps = async () => {
  if (false) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }
  return {
    redirect: {
      destination: "/admin/posts",
      permanent: false,
    },
  };
};

export default function Page() {
  return null;
}
