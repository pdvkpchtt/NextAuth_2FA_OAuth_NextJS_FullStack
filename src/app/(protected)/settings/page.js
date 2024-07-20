import { auth, signOut } from "@/auth";

const SettingsPage = async () => {
  const session = await auth();

  return (
    <div className="flex flex-col gap-[20px]">
      <p>{JSON.stringify(session)}</p>
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
      >
        <button type="submit">SignOut</button>
      </form>
    </div>
  );
};

export default SettingsPage;
