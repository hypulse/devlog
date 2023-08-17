import Link from "next/link";

const Profile = ({ size, href }: { size: number; href: string }) => {
  return (
    <Link
      href={href}
      className="block overflow-hidden rounded-full"
      style={{
        width: size + "rem",
        height: size + "rem",
      }}
    >
      <div
        className="w-full h-full bg-center bg-cover"
        style={{
          backgroundImage: `url(${"https://avatars.githubusercontent.com/u/90980422?v=4"})`,
        }}
      />
    </Link>
  );
};

export default Profile;
