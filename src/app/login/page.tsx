import { createClient } from "@/lib/supabase/server";
import { login, logout, signup } from "./actions";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  const isLogin = !error && data.user;
  // if (error || !data?.user) {
  //   redirect("/login");
  // }

  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <form className="border border-gray-200 rounded-md py-8 px-12 flex flex-col shadow-md gap-4 w-[500px]">
        {!isLogin ? (
          <>
            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                className="border border-gray-200 py-2 px-3 rounded-md"
                id="email"
                name="email"
                type="email"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password">Password</label>
              <input
                className="border border-gray-200 py-2 px-3 rounded-md"
                id="password"
                name="password"
                type="password"
                required
              />
            </div>
            <div className="flex gap-2 justify-center">
              <button
                formAction={login}
                className="rounded-md bg-black text-white py-2 px-3 transition-colors hover:bg-gray-800"
              >
                Log in
              </button>
              <button
                formAction={signup}
                className="rounded-md bg-black text-white py-2 px-3 transition-colors hover:bg-gray-800"
              >
                Sign up
              </button>
            </div>
          </>
        ) : (
          <div className="flex justify-center">
            <button
              formAction={logout}
              className="rounded-md bg-black text-white py-2 px-3 transition-colors hover:bg-gray-800 max-w-24"
            >
              logout
            </button>
          </div>
        )}
      </form>
    </main>
  );
}
