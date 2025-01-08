import { useState } from "react";
import { Link } from "react-router";
import { GoogleIcon, GuestUserIcon, UserIcon } from "../components/icons";
import { AuthService } from "../services/Auth";
import { useNavigate } from "react-router";

export default function SignUp() {
  const { StartCreateUserWithEmailAndPasword } = AuthService();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    StartCreateUserWithEmailAndPasword({ email, password });
  };

  return (
    <div className="w-full h-screen grid place-content-center bg-zinc-900 space-y-10">
      <h1 className="text-white font-semibold text-5xl">Register</h1>
      <section className=" w-[400px] bg-black p-6 rounded-md">
        <form
          onSubmit={(event) => handleSubmit(event)}
          className="w-full max-w-[400px] mx-auto flex flex-col justify-middle"
        >
          <label className="text-white mb-1 text-lg font-normal">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.currentTarget.value);
            }}
            placeholder="example@email.com"
            required
            className="p-2 text-md placeholder:text-md rounded-md mb-4 focus:outline-none focus:ring focus:ring-violet-700"
          />
          <label className="text-white text-lg mb-1 font-normal">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.currentTarget.value);
            }}
            placeholder="password"
            minLength={6}
            required
            className="p-2 text-md mb-4 bg-zinc-300 placeholder:text-md rounded-md focus:outline-none focus:ring focus:ring-violet-700"
          />
          <button
            type="submit"
            className="inline-flex bg-violet-400 text-black items-center gap-2 text-purple-950 w-full justify-center mb-2 hover:bg-violet-800 rounded-md py-2 px-1 font-bold hover:text-purple-300"
          >
            Sign up
            <UserIcon className="w-5 h-5" />
          </button>
          <div className="w-full">
            <p className="text-zinc-500 my-3 text-center">or</p>
            <button
              type="button"
              onClick={() => {
                console.log("google sign in");
              }}
              className="inline-flex bg-zinc-200 text-black items-center gap-2 text-black w-full justify-center mb-2 hover:bg-zinc-400 rounded-md py-2 px-1 font-medium"
            >
              Sign up with <GoogleIcon className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                navigate("/");
              }}
              className="w-full inline-flex items-center gap-2 justify-center rounded-md px-1 py-2 text-md hover:bg-zinc-400 font-medium text-md text-black bg-zinc-200"
            >
              Continue as guest
              <GuestUserIcon className="w-5 h-5" />
            </button>
          </div>
          <p className="text-zinc-500 my-2">
            Already have an account?{" "}
            <Link to={"/sign-in"} className="underline">
              Sign In
            </Link>
          </p>
        </form>
      </section>
    </div>
  );
}
