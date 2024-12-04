//import { getProfile } from '@/components/get-profile'
import { getServerUser } from "@/lib/getServerUser";

/*export async function generateMetadata({ params }: { params: { username: string } }) {
  const profile = await getProfile(params.username);
  return {
    title: profile?.name || 'NourishNetwork',
  };
}*/

export default async function Page() {
  const [user] = await getServerUser();
  //const profile = await getProfile(params.username);
  //const isLoggedIn = user?.id === profile?.id;

  return (
    <div>
      {user && (
        <div className="mt-4">
          {user.username}
          {user.email}
          {user.id}
          {user.group}
        </div>
      )}
    </div>
  );
}
