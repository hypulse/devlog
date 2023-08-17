import { Button, InputBase } from "@/deprecated/components/inputs";

export default function Page() {
  return (
    <main className="flex flex-col mx-auto max-w-screen-desktop px-containerPadding">
      <form className="flex flex-col border bg-cardColor p-containerPadding border-borderColor">
        <h2 className="font-bold text-subTitle mb-elementSpacing">Sign in</h2>
        <div className="mb-rowGap text-caption text-textSecondaryColor">
          Email
        </div>
        <InputBase
          placeholder="Email"
          className="mb-elementSpacing px-buttonPaddingX py-buttonPaddingY rounded-small bg-bgColor"
        />
        <div className="mb-rowGap text-caption text-textSecondaryColor">
          Password
        </div>
        <InputBase
          placeholder="Password"
          className="mb-extraSpacing px-buttonPaddingX py-buttonPaddingY rounded-small bg-bgColor"
        />
        <Button>Sign in</Button>
      </form>
    </main>
  );
}
