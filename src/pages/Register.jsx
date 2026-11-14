
import { useState } from "react";
import { Link } from "react-router";
import { UserPlus, User, Mail, Lock } from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (password.length < 8) {
      setMessage("رمز عبور باید حداقل ۸ کاراکتر داشته باشد.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("رمز عبور و تکرار آن یکسان نیستند.");
      return;
    }

    setMessage("فرم ثبت‌نام آماده است. اتصال به سرور در مرحله بعد انجام می‌شود.");
  }

  return (
    <div dir="rtl" className="min-h-screen bg-[#FAF9F6]">
      <Header search="" setSearch={() => {}} />

      <main className="flex min-h-[700px] items-center justify-center px-4 py-16">
        <div className="w-full max-w-md rounded-3xl border border-gray-100 bg-white p-8 shadow-sm sm:p-10">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#173D35] text-white">
              <UserPlus size={30} />
            </div>

            <h1 className="text-2xl font-black text-[#173D35]">
              ساخت حساب کاربری
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              به خانواده نیک‌مارکت بپیوندید.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                نام و نام خانوادگی
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 focus-within:border-[#173D35]">
                <User size={19} className="text-gray-400" />

                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="نام خود را وارد کنید"
                  required
                  className="w-full bg-transparent py-3 text-sm outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                ایمیل
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 focus-within:border-[#173D35]">
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

              <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 focus-within:border-[#173D35]">
                <Lock size={19} className="text-gray-400" />

                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="حداقل ۸ کاراکتر"
                  required
                  className="w-full bg-transparent py-3 text-sm outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                تکرار رمز عبور
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 focus-within:border-[#173D35]">
                <Lock size={19} className="text-gray-400" />

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="رمز عبور را دوباره وارد کنید"
                  required
                  className="w-full bg-transparent py-3 text-sm outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[#173D35] py-3.5 font-bold text-white transition hover:bg-[#245448]"
            >
              ایجاد حساب کاربری
            </button>
          </form>

          {message && (
            <p className="mt-5 rounded-xl bg-[#F5F3EE] p-3 text-center text-sm text-[#173D35]">
              {message}
            </p>
          )}

          <p className="mt-7 text-center text-sm text-gray-500">
            قبلاً ثبت‌نام کرده‌اید؟
            <Link
              to="/login"
              className="mr-2 font-bold text-[#173D35] hover:underline"
            >
              وارد شوید
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Register;
