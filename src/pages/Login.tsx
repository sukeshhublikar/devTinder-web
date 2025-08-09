import { useNavigate } from "react-router";
import { useEffect } from "react";

import _ from "lodash";
import { useUserActions, useStore } from "@/stores/userStore";
import { useShallow } from "zustand/shallow";

export default function Login() {
  const navigate = useNavigate();
  const actions = useUserActions();
  const { user, loading, error } = useStore(
    useShallow((state) => ({
      user: state.user,
      loading: state.loading,
      error: state.error,
    }))
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity()) {
      const hints = form.querySelectorAll(".validator-hint");
      hints.forEach((hint) => {
        hint.classList.remove("hidden");
      });

      const emailInput = form.querySelector<HTMLInputElement>(
        'input[type="email"]'
      );
      const passwordInput = form.querySelector<HTMLInputElement>(
        'input[type="password"]'
      );
      const email = emailInput?.value ?? "";
      const password = passwordInput?.value ?? "";
      void actions.login({ email, password });
    }
  };

  useEffect(() => {
    if (!_.isEmpty(user)) {
      void navigate("/dashboard");
    }
  }, [navigate, user]);

  return (
    <div className="card w-96 bg-base-200 shadow-sm justify-center mx-auto mt-20">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="text-center">
            <h2 className="text-3xl font-bold">Login</h2>
          </div>
          <div className="mt-6  flex flex-col gap-4 justify-center  items-center">
            <label className="input validator">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <input type="email" placeholder="mail@site.com" required />
            </label>
            <label className="input validator">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                  <circle
                    cx="16.5"
                    cy="7.5"
                    r=".5"
                    fill="currentColor"
                  ></circle>
                </g>
              </svg>
              <input
                type="password"
                required
                placeholder="Password"
                minLength={8}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              />
            </label>
            <p className="validator-hint hidden">
              Must be more than 8 characters, including
              <br />
              At least one number <br />
              At least one lowercase letter <br />
              At least one uppercase letter
            </p>
            <div className="validator-hint hidden">
              Enter valid email address
            </div>
          </div>
          {error && (
            <div className="alert alert-error mt-4">
              <span>{error}</span>
            </div>
          )}
          <div className="mt-6">
            <button
              className="btn btn-primary btn-block"
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
