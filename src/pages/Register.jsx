
import { useState } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { UserPlus, User, Mail, Lock } from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

function Register() {
  const { t, i18n } = useTranslation();
  const isEnglish = i18n.language === "en";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (password.length < 8) {
      setMessage(t("passwordTooShort"));
      return;
    }

    if (password !== confirmPassword) {
      setMessage(t("passwordMismatch"));
      return;
    }

    setMessage(t("registerSuccessMessage"));
  }

  return (
    <div
      dir={isEnglish ? "ltr" : "rtl"}
      className="min-h-screen bg-[#FAF9F6]"
    >
      <Header search="" setSearch={() => {}} />

      <main className="flex min-h-[700px] items-center justify-center px-4 py-16">
        <div className="w-full max-w-md rounded-3xl border border-gray-100 bg-white p-8 shadow-sm sm:p-10">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#173D35] text-white">
              <UserPlus size={30} />
            </div>

            <h1 className="text-2xl font-black text-[#173D35]">
              {t("createAccount")}
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              {t("joinNikMarket")}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                {t("fullName")}
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 focus-within:border-[#173D35]">
                <User size={19} className="shrink-0 text-gray-400" />

                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder={t("enterYourName")}
                  required
                  className="w-full bg-transparent py-3 text-sm outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                {t("email")}
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 focus-within:border-[#173D35]">
                <Mail size={19} className="shrink-0 text-gray-400" />

                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="example@gmail.com"
                  required
                  className="w-full bg-transparent py-3 text-sm outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                {t("password")}
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 focus-within:border-[#173D35]">
                <Lock size={19} className="shrink-0 text-gray-400" />

                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder={t("minimumPasswordLength")}
                  required
                  className="w-full bg-transparent py-3 text-sm outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                {t("confirmPassword")}
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 focus-within:border-[#173D35]">
                <Lock size={19} className="shrink-0 text-gray-400" />

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder={t("repeatPassword")}
                  required
                  className="w-full bg-transparent py-3 text-sm outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[#173D35] py-3.5 font-bold text-white transition hover:bg-[#245448]"
            >
              {t("createAccount")}
            </button>
          </form>

          {message && (
            <p className="mt-5 rounded-xl bg-[#F5F3EE] p-3 text-center text-sm text-[#173D35]">
              {message}
            </p>
          )}

          <p className="mt-7 text-center text-sm text-gray-500">
            {t("alreadyRegistered")}
            <Link
              to="/login"
              className="mx-2 font-bold text-[#173D35] hover:underline"
            >
              {t("loginNow")}
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Register;
