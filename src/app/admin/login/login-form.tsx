"use client";

import { useActionState } from "react";
import { login, type LoginState } from "./actions";
import { inputCls, labelCls } from "@/components/ui";

const initial: LoginState = { step: "email", email: "", message: "" };

export function LoginForm() {
  const [state, action, pending] = useActionState(login, initial);
  return (
    <form action={action} className="card space-y-5" noValidate>
      <input type="hidden" name="step" value={state.step} />
      {state.message && <p role="status" className="rounded-xl bg-mist p-3 text-sm text-muted">{state.message}</p>}
      {state.step === "email" ? (
        <div>
          <label htmlFor="email" className={labelCls}>Email</label>
          <input id="email" name="email" type="email" autoComplete="email" required className={inputCls} />
        </div>
      ) : (
        <>
          <input type="hidden" name="email" value={state.email} />
          <div>
            <label htmlFor="code" className={labelCls}>6-digit code</label>
            <input id="code" name="code" inputMode="numeric" autoComplete="one-time-code" maxLength={6} required className={inputCls} />
          </div>
        </>
      )}
      <button type="submit" disabled={pending} className="btn btn-primary w-full">{pending ? "Working..." : state.step === "email" ? "Send code" : "Sign in"}</button>
    </form>
  );
}
