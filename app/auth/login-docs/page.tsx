import { loginAction, signUpAction } from "@/server/actions/auth";

export default function LoginPage() {
  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <button formAction={loginAction}>Log in</button>
      <button formAction={signUpAction}>Sign up</button>
    </form>
  );
}
