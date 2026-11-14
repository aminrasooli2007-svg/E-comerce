
import { useState } from "react";
import { Link } from "react-router";
import { LogIn, Mail, Lock } from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setMessage("فرم ورود آماده است. اتصال به سرور در مرحله بعد انجام می‌شود.");
  }

  return (
    <div dir="rtl" className="min-h-screen bg-[#FAF9F6]">
      <Header search="" setSearch={() => {}} />

      <main className="flex min-h-[650px] items-center justify-center px-4 py-16">
        <div className="w-full max-w-md rounded-3xl border border-gray-100 bg-white p-8 shadow-sm sm:p-10">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#173D35] text-white">
              <LogIn size={30} />
            </div>

            <h1 className="text-2xl font-black text-[#173D35]">
              خوش آمدید!
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              برای ورود به حساب کاربری خود اطلاعاتتان را وارد کنید.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                ایمیل
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 transition focus-within:border-[#173D35]">
                <Mail size={19} className="text-gray-400" />

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
                رمز عبور
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 transition focus-within:border-[#173D35]">
                <Lock size={19} className="text-gray-400" />

                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="رمز عبور خود را وارد کنید"
                  required
                  className="w-full bg-transparent py-3 text-sm outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[#173D35] py-3.5 font-bold text-white transition hover:bg-[#245448]"
            >
              ورود به حساب
            </button>
          </form>

          {message && (
            <p className="mt-5 rounded-xl bg-[#F5F3EE] p-3 text-center text-sm text-[#173D35]">
              {message}
            </p>
          )}

          <p className="mt-7 text-center text-sm text-gray-500">
            هنوز حساب کاربری ندارید؟
            <Link
              to="/register"
              className="mr-2 font-bold text-[#173D35] hover:underline"
            >
              ثبت‌نام کنید
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Login;
