import { login, signup } from "./actions";

export default function LoginPage() {
  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <form className="border border-gray-200 rounded-md py-8 px-12 flex flex-col shadow-md gap-4">
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
      </form>
    </main>
  );
}
